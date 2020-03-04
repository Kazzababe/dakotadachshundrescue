import express, { Express } from 'express';
import routes from './routes';
import bodyParser from 'body-parser';
import redis from './services/redis';
import session from 'express-session';
import { setupDatabase } from "./data";
const RedisStore = require('connect-redis')(session);

const app: Express = express();

app.use(
    session({
        store: new RedisStore({ client: redis }),
        secret: 'whattheheckdudeimstillgonnasendit',
        resave: false,
        saveUninitialized: false,
    })
);

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(routes);

setupDatabase().then(() => {
    app.listen(3000, () => {
        console.log('listening on port 3000');
    });
});
