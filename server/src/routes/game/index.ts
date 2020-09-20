import { Router, Request, Response } from 'express';
import { getGame, updateConnections } from '../../index';
import {wrap} from "../utils";

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

router.post(
    '/game/start',
    wrap(async (req: Request, res: Response) => {
        const { code, name } = req.body;

        if (!name) {
            return res.json({
                code: 105,
                message: 'No name specified in the request.',
            });
        }
        if (!code || code.length !== 4) {
            return res.json({
                code: 106,
                message: 'Invalid game code provided.',
            });
        }
        const game = getGame(code);
        if (game) {
            if (game.phase !== 0) {
                return res.json({
                    code: 107,
                    message: 'Game has already started.',
                });
            }
            if (game.players.length < 3 || game.players.length > 8) {
                return res.json({
                    code: 108,
                    message: 'Invalid amount of players. Each game requires 3-8 players.',
                });
            }
            if (name !== game.host) {
                return res.json({
                    code: 109,
                    message: 'Only the host of the game can start the game.',
                });
            }
            game.phase = 1;
            updateConnections(game);

            return res.json({
                code: 100,
                game: game,
            });
        }
        return res.json({
            code: 102,
            message: 'Game could not be found.'
        });
    })
);

export default router;