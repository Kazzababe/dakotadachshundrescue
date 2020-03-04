"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
const vue_server_renderer_1 = require("vue-server-renderer");
const ssrBundle = path_1.join(process.cwd(), '..', 'client', 'dist', 'vue-ssr-server-bundle.json');
const ssrManifest = path_1.join(process.cwd(), '..', 'client', 'dist', 'vue-ssr-client-manifest.json');
const template = path_1.join(process.cwd(), '..', 'client', 'index.html');
let renderer;
exports.getRenderer = () => {
    if (!renderer || true) {
        renderer = vue_server_renderer_1.createBundleRenderer(ssrBundle, {
            runInNewContext: true,
            template: fs_1.readFileSync(template, 'utf8'),
            clientManifest: JSON.parse(fs_1.readFileSync(ssrManifest, 'utf8')),
        });
    }
    return renderer;
};
async function renderVue(req, res, state) {
    (await exports.getRenderer().renderToStream({
        url: req.url,
        state: state || {},
    })).pipe(res.status(200));
}
exports.renderVue = renderVue;
function wrap(handler) {
    return (req, res, next) => {
        Promise.resolve(handler(req, res, next)).catch((err) => {
            const type = req.header('Content-Type');
            if ('application/json' === String(type).toLowerCase()) {
                return res.json({
                    error: true,
                    message: err.message,
                });
            }
            next(err);
        });
    };
}
exports.wrap = wrap;
