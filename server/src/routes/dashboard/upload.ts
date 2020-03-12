import { Request, Router, Response } from 'express';
import { wrap } from '../utils';
import categories from '../../data/categories';

const router = Router();

export function getUploadData(req: Request) {
    return req.session
        ? {
              user: req.session.user,
          }
        : {};
}

router.post(
    '/upload',
    wrap(async (req: Request, res: Response) => {
        const errors = {
            title: '',
            description: '',
            category: '',
            images: '',
        };
        if (!req.body.title || req.body.title.length < 8 || req.body.title.length > 64) {
            errors.title = 'Mod title must be between 8 and 64 characters long';
        }
        if (!req.body.description || req.body.title.length > 0) {
            errors.description = 'Must include a description';
        }
        if (!req.body.category || isNaN(req.body.category) || req.body.category < 0 || req.body.category >= categories.length) {
            errors.category = 'No category was supplied or an invalid category was supplied';
        }
        if (!req.body.images || req.body.images.length <= 0) {
            errors.images = 'You must upload at least one image';
        }
    })
);

router.post(
    '/upload-image',
    wrap(async (req: Request, res: Response) => {

    })
);

export default router;
