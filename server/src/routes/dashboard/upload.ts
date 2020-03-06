import { Request } from 'express';

export function getUploadData(req: Request) {
    return req.session
        ? {
              user: req.session.user,
          }
        : {};
}
