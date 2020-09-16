import { wrap } from '../utils';
import { Router, Request, Response } from 'express';
import { createGame } from "../../index";

const router = Router();
const CODE_CHARACTERS: String = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function generateCode() {
    let text = "";
    for (let i = 0; i < 4; i++) {
        text += CODE_CHARACTERS.charAt(~~(Math.random() * CODE_CHARACTERS.length));
    }
    return text;
}

export function getCreateData(req: Request) {
    return { };
}

router.post(
    '/create',
    wrap(async (req: Request, res: Response) => {
        const { name } = req.body;

        if (!name || name.length < 1 || name.length > 16) {
            return res.json({
                code: 103,
                message: 'Invalid username.',
            });
        }
        const gameCode = generateCode();
        if (req && req.session) {
            req.session.user = {
                name
            };
            createGame(gameCode, name);
            return res.json({
                code: 100,
                gameCode,
                url: `/game/${gameCode}`
            });
        } else {
            return res.json({
                code: 104,
                message: 'Error creating user session.',
            });
        }
    })
);

export default router;