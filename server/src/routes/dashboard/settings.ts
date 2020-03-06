import { Request } from 'express';

export function getSettingsData(req: Request) {
    return req.session
        ? {
              user: req.session.user,
          }
        : {};
}
