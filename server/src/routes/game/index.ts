import { Router, Request, Response } from 'express';
import { getGame } from '../../services/game';
import { wrap } from "../utils";
import { ClientGame, Phase } from '../../interfaces/Game';

const router = Router();

export function getGameData(req: Request) {
    if (req && req.session && req.session.user) {
        const game = getGame(req.params.code);
        if (game) {
            return {
                game: new ClientGame(game),
                id: req.session.user.id,
                username: req.session.user.username,
            }
        }
    }
    return undefined;
}

// TODO: Make it so only host can start the game
router.post(
    '/game/start',
    wrap(async (req: Request, res: Response) => {
        const { code, isHost } = req.body;

        if (!code || code.length !== 4) {
            return res.json({
                code: 106,
                message: 'Invalid game code provided.',
            });
        }
        const game = getGame(code);
        if (game) {
            if (game.phase !== Phase.JOINING) {
                return res.json({
                    code: 107,
                    message: 'Game has already started.',
                });
            }
            const players = Object.keys(game.players).length;
            if (players < 1 || players > 8) {
                return res.json({
                    code: 108,
                    message: 'Invalid amount of players. Each game requires 1-8 players.',
                });
            }
            game.start();

            return res.json({
                code: 100,
                game: new ClientGame(game),
            });
        }
        return res.json({
            code: 102,
            message: 'Game could not be found.'
        });
    })
);

export default router;