import { Request, Response, Router } from 'express';
import { wrap } from '../utils';
import { OkPacket, RowDataPacket } from 'mysql2';
import { pool } from '../../data';
import bcrypt from 'bcrypt';
import User from '../../interfaces/User';

const router = Router();

router.post(
    '/register',
    wrap(async (req: Request, res: Response) => {
        const errors = {
            username: '',
            email: '',
            password: '',
        };
        if (
            !req.body.username ||
            req.body.username.length < 6 ||
            req.body.username.length > 28
        ) {
            errors.username =
                'Username must be between 6 and 28 characters long';
        }
        if (
            !req.body.password ||
            !req.body.passwordRepeat ||
            req.body.password.length < 8 ||
            req.body.password !== req.body.passwordRepeat
        ) {
            if (req.body.password !== req.body.passwordRepeat) {
                errors.password = 'Passwords must match';
            } else {
                errors.password =
                    'Password must be a minimum of 8 characters long';
            }
        }
        if (
            !req.body.email ||
            !req.body.emailRepeat ||
            !/\S+@\S+\.\S+/.test(req.body.email) ||
            req.body.email !== req.body.emailRepeat
        ) {
            if (req.body.email !== req.body.emailRepeat) {
                errors.email = 'Emails must match';
            } else {
                errors.email = 'Please input a valid email address';
            }
        }
        if (
            errors.username === '' &&
            errors.email === '' &&
            errors.password === ''
        ) {
            bcrypt.hash(req.body.password, 10).then(async hash => {
                try {
                    const [packet] = await pool.execute<OkPacket>(
                        'INSERT INTO `users` (`username`, `password`, `email`) ' +
                            'VALUES (?, ?, ?)',
                        [req.body.username, hash, req.body.email]
                    );
                } catch (err) {
                    res.json({
                        error: true,
                        message:
                            'A user with that email or username already exists',
                    });
                }
                res.json({
                    error: false,
                });
            });
        } else {
            res.json({
                error: true,
                errors,
            });
        }
    })
);

router.post(
    '/login',
    wrap(async (req: Request, res: Response) => {
        const errors = {
            username: '',
            password: '',
        };
        if (
            !req.body.username ||
            req.body.username.length < 6 ||
            req.body.username.length > 28
        ) {
            errors.username =
                'Username must be between 6 and 28 characters long';
        }
        if (!req.body.password || req.body.password.length < 8) {
            errors.password = 'Password must be a minimum of 8 characters long';
        }
        if (errors.username === '' && errors.password === '') {
            const [rows] = await pool.query<RowDataPacket[]>(
                'SELECT `id`, `username`, `password` FROM `users` WHERE `username` = ?',
                [req.body.username]
            );
            if (rows.length) {
                bcrypt
                    .compare(req.body.password, rows[0].password)
                    .then(result => {
                        if (result && req.session) {
                            req.session.user = {
                                id: rows[0].id,
                                username: rows[0].username,
                            } as User;
                            return res.json({
                                error: false,
                                user: req.session.user,
                            });
                        } else {
                            return res.json({
                                error: true,
                                message:
                                    'Incorrect password. Please double-check and try again!',
                            });
                        }
                    });
            } else {
                return res.json({
                    error: true,
                    message:
                        'Incorrect password. Please double-check and try again!',
                });
            }
        } else {
            res.json({
                error: true,
                errors,
            });
        }
    })
);

router.get('/logout', (req: Request, res: Response) => {
    req.session &&
        req.session.destroy(err => {
            err && console.error('Failed to destroy session %O', err);
        });
    res.redirect('/');
});

export default router;
