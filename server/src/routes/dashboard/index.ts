import { Request } from 'express';

export function getDashboardData(req: Request) {
    return req.session
        ? {
              user: req.session.user,
          }
        : {};
}
