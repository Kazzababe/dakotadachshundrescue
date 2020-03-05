import { Request, Response, Router} from 'express';
import { wrap } from "../utils";

const router = Router();

router.post(
    '/register',
    wrap(async (req: Request, res: Response) => {

    })
);

export default router;