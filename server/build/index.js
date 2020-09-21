"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const body_parser_1 = __importDefault(require("body-parser"));
const redis_1 = __importDefault(require("./services/redis"));
const express_session_1 = __importDefault(require("express-session"));
const data_1 = require("./data");
const ws_1 = require("ws");
const http_1 = require("http");
const game_1 = require("./services/game");
const Game_1 = require("./interfaces/Game");
const RedisStore = require('connect-redis')(express_session_1.default);
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
data_1.setupDatabase()
    .then(() => {
    const server = http_1.createServer(app);
    const socketServer = new ws_1.Server({ server });
    socketServer.on('connection', (ws) => {
        let username;
        let game;
        let timer;
        let pingTimer;
        function onClose() {
            clearInterval(pingTimer);
            game.disconnectPlayer(username);
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
                    game = game_1.getGame(data.game.code);
                    game.connectPlayer(username, ws);
                }
                else if (data.message === 'pong') {
                    clearTimeout(timer);
                }
                else if (data.message === 'SELECT_CATEGORY') {
                    console.log("select category");
                    game.selectCategory(data.index);
                }
            }
            else if (data.page === 'CREATE') {
                if (data.message === 'new') {
                    pingTimer = setInterval(ping, 1000 * 10);
                    const newGame = game_1.createGame(data.code);
                    if (newGame) {
                        game = newGame;
                        game.host = ws;
                        ws.send(JSON.stringify({
                            page: 'CREATE',
                            message: 'data',
                            game: new Game_1.ClientGame(game),
                        }));
                    }
                    else {
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
