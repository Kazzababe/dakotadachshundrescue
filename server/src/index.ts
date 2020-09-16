import express, { Express } from 'express';
import routes from './routes';
import bodyParser from 'body-parser';
import redis from './services/redis';
import session from 'express-session';
import { setupDatabase } from './data';
import { Server } from 'ws';
import { createServer } from 'http';
const RedisStore = require('connect-redis')(session);
const gameDebug = require('debug')('Server:Game');

export const games: {
    code: string,
    host: string,
    phase: 0,
    players: {
        name: string,
    }[],
    connectedPlayers: {
        name: string,
    }[]
}[] = [];
export function getGame(code: string) {
    for (let i in games) {
        const game = games[i];
        if (game.code === code) {
            return game;
        }
    }
    return undefined;
}
export function createGame(code: string, host: string) {
    if (getGame(code)) {
        return;
    }
    games.push({
        code,
        host,
        phase: 0,
        players: [],
        connectedPlayers: [],
    });
}

const app: Express = express();

app.use(
    session({
        store: new RedisStore({ client: redis }),
        secret: 'whattheheckdudeimstillgonnasendit',
        resave: false,
        saveUninitialized: false,
    })
);

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(routes);

setupDatabase().then(() => {
    const server = createServer(app);
    const socketServer = new Server({ server });
    const connections: { [key: string]: any } = {};

    socketServer.on('connection', (ws) => {
        let username: string;
        let code: string;
        let timer: ReturnType<typeof setTimeout>;
        let pingTimer: ReturnType<typeof setInterval>;

        function sendData(data: {}) {
            if (code) {
                const game = getGame(code);
                if (game) {
                    for (let i in connections) {
                        const connection = connections[i];
                        if (connection.game.code === code) {
                            connection.client.send(JSON.stringify(data));
                        }
                    }
                }
            }
        }
        function onClose() {
            clearInterval(pingTimer);
            delete connections[username];

            gameDebug(`Player ${username} has disconnected from game ${code}.`);

            if (code) {
                const game = getGame(code);
                if (game) {
                    for (let i = 0; i < game.connectedPlayers.length; i++) {
                        if (game.connectedPlayers[i].name === username) {
                            game.connectedPlayers.splice(i, 1);
                            break;
                        }
                    }
                    if (game.connectedPlayers.length === 0) {
                        games.splice(games.indexOf(game), 1);
                        gameDebug(`Game ${code} has 0 connected players. Ending game.`);
                        return;
                    }
                    if (game.phase === 0) {
                        gameDebug(`Player ${username} has disconnected and been removed from game ${code}.`);
                        for (let i = 0; i < game.players.length; i++) {
                            if (game.players[i].name === username) {
                                game.players.splice(i, 1);
                                break;
                            }
                        }
                        if (game.host === username) {
                            game.host = game.players[0].name;
                        }
                        sendData({
                            page: 'GAME',
                            message: 'UPDATE',
                            game,
                        });
                    }
                }
            }
        }
        function ping() {
            ws.send(JSON.stringify({
                page: 'GAME',
                message: 'ping',
            }));
            timer = setTimeout(onClose, 5000);
        }
        ws.on('message', (message: string) => {
            const data = JSON.parse(message);
            if (data.page === 'GAME') {
                if (data.message === 'JOIN') {
                    pingTimer = setInterval(ping, 1000 * 10);

                    username = data.username;
                    code = data.game.code;

                    const game = getGame(code);
                    game?.connectedPlayers.push({
                        name: username,
                    });
                    game?.players.push({
                        name: username,
                    });
                    gameDebug(`Player ${username} has joined game ${code}.`);

                    connections[data.username] = {
                        client: ws,
                        game,
                    };
                    sendData({
                        page: 'GAME',
                        message: 'UPDATE',
                        game,
                    })
                } else if (data.message === 'pong') {
                    clearTimeout(timer);
                }
            }
        });
        ws.on('close', onClose);
    });
    server.listen(3000, () => {
        console.log('Server started on port 3000.');
    });
}).catch(error => {
    console.log(error);
});
