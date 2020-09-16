import { Router, Request, Response } from 'express';
import { getGame } from '../../index';

const router = Router();

export function getGameData(req: Request) {
    if (req && req.session && req.session.user) {
        const game = getGame(req.params.code);
        if (game) {
            return {
                game,
                username: req.session.user.name
            }
        }
    }
    return undefined;
}

export default router;