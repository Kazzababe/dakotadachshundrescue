import { Request, Response } from 'express';
import { NextFunction, RequestHandler } from 'express-serve-static-core';
import { join, relative } from 'path';
import { existsSync, readFileSync } from 'fs';
import { BundleRenderer, createBundleRenderer } from 'vue-server-renderer';

type NextHandler = (
    req: Request,
    res: Response,
    next: () => any
) => Promise<any>;
const ssrBundle = join(
    process.cwd(),
    '..',
    'client',
    'dist',
    'vue-ssr-server-bundle.json'
);
const ssrManifest = join(
    process.cwd(),
    '..',
    'client',
    'dist',
    'vue-ssr-client-manifest.json'
);
const template = join(process.cwd(), '..', 'client', 'index.html');

let renderer: BundleRenderer;
export const getRenderer = () => {
    if (!renderer || true) {
        renderer = createBundleRenderer(ssrBundle, {
            runInNewContext: true,
            template: readFileSync(template, 'utf8'),
            clientManifest: JSON.parse(readFileSync(ssrManifest, 'utf8')),
        });
    }
    return renderer;
};

export async function renderVue(req: Request, res: Response, state: any) {
    (
        await getRenderer().renderToStream({
            url: req.url,
            state: state || {},
        })
    ).pipe(res.status(200));
}

export function wrap(handler: NextHandler): RequestHandler {
    return (req: Request, res: Response, next: NextFunction): any => {
        Promise.resolve(handler(req, res, next)).catch((err): any => {
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
