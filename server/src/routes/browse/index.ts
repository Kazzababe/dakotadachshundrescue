import { Request } from 'express';

export function getBrowseData(req: Request) {
    return req.session
        ? {
              user: req.session.user,
          }
        : {};
}
