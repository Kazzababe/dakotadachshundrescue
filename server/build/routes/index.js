"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const utils_1 = require("./utils");
const serve_static_1 = __importDefault(require("serve-static"));
const path_1 = require("path");
const home_1 = require("./home");
const create_1 = require("./create");
const join_1 = __importStar(require("./join"));
const game_1 = __importStar(require("./game"));
const router = express_1.Router();
router.use(join_1.default);
router.use(game_1.default);
router.use('/dist', serve_static_1.default(path_1.join(process.cwd(), '..', 'client', 'dist')));
router.use('/static', serve_static_1.default(path_1.join(process.cwd(), '..', 'client', 'public')));
const routes = [
    { path: '/', data: home_1.getHomeData },
    { path: '/create', data: create_1.getCreateData },
    { path: '/join', data: join_1.getJoinData },
    { path: '/game/:code', data: game_1.getGameData },
];
async function getData(req, route) {
    const data = route.data;
    if (!data) {
        return undefined;
    }
    return await data(req);
}
for (const key in routes) {
    const route = routes[key];
    router.get(route.path, utils_1.wrap(async (req, res) => {
        const data = await getData(req, route);
        if (!data) {
            return res.redirect('/');
        }
        const stream = await utils_1.getRenderer().renderToString({
            state: data,
            url: req.url,
        });
        res.status(200).send(stream);
    }));
    router.get('/data-' + route.path, utils_1.wrap(async (req, res) => {
        const data = await getData(req, route);
        res.json({
            data: data,
        });
    }));
}
exports.default = router;
