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
data_1.setupDatabase().then(() => {
    app.listen(3000, () => {
        console.log('listening on port 3000');
    });
});
