"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const utils_1 = require("./utils");
const serve_static_1 = __importDefault(require("serve-static"));
const path_1 = require("path");
const auth_1 = __importDefault(require("./auth"));
const dashboard_1 = require("./dashboard");
const settings_1 = require("./dashboard/settings");
const upload_1 = require("./dashboard/upload");
const browse_1 = require("./browse");
const router = express_1.Router();
router.use('/auth', auth_1.default);
router.use('/dist', serve_static_1.default(path_1.join(process.cwd(), '..', 'client', 'dist')));
router.use('/static', serve_static_1.default(path_1.join(process.cwd(), '..', 'client', 'public')));
function getHomeData(req) {
    return req.session
        ? {
            user: req.session.user,
        }
        : {};
}
const routes = [
    { path: '/', data: getHomeData },
    { path: '/auth/login' },
    { path: '/auth/register' },
    { path: '/browse', data: browse_1.getBrowseData },
    { path: '/dashboard', data: dashboard_1.getDashboardData },
    { path: '/dashboard/settings', data: settings_1.getSettingsData },
    { path: '/dashboard/upload', data: upload_1.getUploadData },
];
async function getData(req, route) {
    const data = route.data;
    if (!data) {
        return {};
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
