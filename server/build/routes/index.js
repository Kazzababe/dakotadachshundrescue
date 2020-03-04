"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const utils_1 = require("./utils");
const serve_static_1 = __importDefault(require("serve-static"));
const path_1 = require("path");
const router = express_1.Router();
// router.use('/api', api);
router.use('/dist', serve_static_1.default(path_1.join(process.cwd(), '..', 'client', 'dist')));
router.use('/static', serve_static_1.default(path_1.join(process.cwd(), '..', 'client', 'public')));
const routes = [
    { path: '/', data: () => ({}) },
    { path: '/auth/login', data: () => ({}) },
    { path: '/auth/register', data: () => ({}) },
];
async function getData(req, route) {
    const data = route.data;
    if (!data) {
        return {
            error: true,
        };
    }
    return await data(req);
}
for (const key in routes) {
    const route = routes[key];
    router.get(route.path, utils_1.wrap(async (req, res) => {
        const data = await getData(req, route);
        const stream = await utils_1.getRenderer().renderToString({
            state: data,
            url: req.url,
        });
        res.status(200).send(stream);
    }));
    router.get('/data' + route.path, utils_1.wrap(async (req, res) => {
        const data = await getData(req, route);
        res.json({
            data: data,
        });
    }));
}
exports.default = router;
