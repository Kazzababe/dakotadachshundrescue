import express, { Express } from 'express';
import routes from './routes';
import bodyParser from 'body-parser';
import redis from './services/redis';
import session from 'express-session';
import { setupDatabase } from './data';
import WebSocket, { Server } from 'ws';
import { createServer } from 'http';
import { getGame, createGame } from './services/game';
import { ClientGame, ServerGame } from './interfaces/Game';
const RedisStore = require('connect-redis')(session);

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

setupDatabase()
    .then(() => {
        const server = createServer(app);
        const socketServer = new Server({ server });

        socketServer.on('connection', (ws: WebSocket) => {
            let username: string;
            let game: ServerGame;
            let timer: ReturnType<typeof setTimeout>;
            let pingTimer: ReturnType<typeof setInterval>;

            function onClose() {
                clearInterval(pingTimer);

                game.disconnectPlayer(username);
            }
            function ping() {
                ws.send(
                    JSON.stringify({
                        page: 'GAME',
                        message: 'ping',
                    })
                );
                timer = setTimeout(onClose, 5000);
            }
            ws.on('message', (message: string) => {
                const data = JSON.parse(message);
                if (data.page === 'GAME') {
                    if (data.message === 'JOIN') {
                        pingTimer = setInterval(ping, 1000 * 10);

                        username = data.username;
                        game = getGame(data.game.code);
                        game.connectPlayer(username, ws);
                    } else if (data.message === 'pong') {
                        clearTimeout(timer);
                    } else if (data.message === 'SELECT_CATEGORY') {
                        console.log("select category");
                        game.selectCategory(data.index);
                    }
                } else if (data.page === 'CREATE') {
                    if (data.message === 'new') {
                        pingTimer = setInterval(ping, 1000 * 10);

                        const newGame = createGame(data.code);
                        if (newGame) {
                            game = newGame;
                            game.host = ws;

                            ws.send(JSON.stringify({
                                page: 'CREATE',
                                message: 'data',
                                game: new ClientGame(game),
                            }));
                        } else {
                            ws.send(JSON.stringify({
                                page: 'CREATE',
                                message: 'error',
                                error: 'A game with that code already exists.'
                            }));
                        }
                    }
                }
            });
            ws.on('close', onClose);
        });
        server.listen(3000, () => {
            console.log('Server started on port 3000.');
        });
    })
    .catch(error => {
        console.log(error);
    });
