import { Router, Response, Request } from "express";
import { wrap } from "../utils";
import { generateUserId, getGame } from '../../services/game';

const router = Router();

router.post(
    '/join',
    wrap(async (req: Request, res: Response) => {
        const { code, name } = req.body;

        if (!code) {
            return res.json({
                code: 101,
                message: 'Game code not included in request.',
            });
        }
        const game = getGame(code);
        if (!game) {
            return res.json({
                code: 102,
                message: 'Game could not be found.'
            });
        }
        if (!name || name.length < 1 || name.length > 12) {
            return res.json({
                code: 103,
                message: 'Invalid username.',
            });
        }
        if (req && req.session) {
            req.session.user = {
                id: generateUserId(),
                username: name,
            };
            return res.json({
                code: 100,
                url: `/game/${code}`
            });
        }
        return res.json({
            code: 104,
            message: 'Error creating user session.',
        });
    })
);

export function getJoinData(req: Request) {
    return { };
}

export default router;