"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGame = exports.getGame = exports.games = void 0;
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const body_parser_1 = __importDefault(require("body-parser"));
const redis_1 = __importDefault(require("./services/redis"));
const express_session_1 = __importDefault(require("express-session"));
const data_1 = require("./data");
const ws_1 = require("ws");
const http_1 = require("http");
const RedisStore = require('connect-redis')(express_session_1.default);
const gameDebug = require('debug')('Server:Game');
exports.games = [];
function getGame(code) {
    for (let i in exports.games) {
        const game = exports.games[i];
        if (game.code === code) {
            return game;
        }
    }
    return undefined;
}
exports.getGame = getGame;
function createGame(code, host) {
    if (getGame(code)) {
        return;
    }
    exports.games.push({
        code,
        host,
        phase: 0,
        players: [],
        connectedPlayers: [],
    });
}
exports.createGame = createGame;
const app = express_1.default();
app.use(express_session_1.default({
    store: new RedisStore({ client: redis_1.default }),
    secret: 'whattheheckdudeimstillgonnasendit',
    resave: false,
    saveUninitialized: false,
}));
app.use(body_parser_1.default.json({ limit: '5mb' }));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(routes_1.default);
data_1.setupDatabase().then(() => {
    const server = http_1.createServer(app);
    const socketServer = new ws_1.Server({ server });
    const connections = {};
    socketServer.on('connection', (ws) => {
        let username;
        let code;
        let timer;
        let pingTimer;
        function sendData(data) {
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
                        exports.games.splice(exports.games.indexOf(game), 1);
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
        ws.on('message', (message) => {
            const data = JSON.parse(message);
            if (data.page === 'GAME') {
                if (data.message === 'JOIN') {
                    pingTimer = setInterval(ping, 1000 * 10);
                    username = data.username;
                    code = data.game.code;
                    const game = getGame(code);
                    game === null || game === void 0 ? void 0 : game.connectedPlayers.push({
                        name: username,
                    });
                    game === null || game === void 0 ? void 0 : game.players.push({
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
                    });
                }
                else if (data.message === 'pong') {
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
