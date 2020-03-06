import { Router } from 'express';
import { getRenderer, wrap } from './utils';
import { Request, Response } from 'express';
import serveStatic from 'serve-static';
import { join } from 'path';
import auth from './auth';

const router = Router();

router.use('/auth', auth);

router.use('/dist', serveStatic(join(process.cwd(), '..', 'client', 'dist')));
router.use(
    '/static',
    serveStatic(join(process.cwd(), '..', 'client', 'public'))
);

function getHomeData(req: Request) {
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
];

async function getData(req: Request, route: any) {
    const data = route.data;

    if (!data) {
        return {};
    }
    return await data(req);
}

for (const key in routes) {
    const route = routes[key];

    router.get(
        route.path,
        wrap(
            async (req: Request, res: Response): Promise<void> => {
                const data = await getData(req, route);

                const stream = await getRenderer().renderToString({
                    state: data,
                    url: req.url,
                });
                res.status(200).send(stream);
            }
        )
    );

    router.get(
        '/data' + route.path,
        wrap(
            async (req: Request, res: Response): Promise<void> => {
                const data = await getData(req, route);

                res.json({
                    data: data,
                });
            }
        )
    );
}

export default router;
