import { createPool, Pool, RowDataPacket } from 'mysql2/promise';
import config from '../config';
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

const debug = require('debug')('Server:Database');

export const pool: Pool = createPool(config.mysql);

export async function setupDatabase() {
    const dir = join(process.cwd(), 'tables');
    const tables = readdirSync(dir);
    const created = [];
    for (const table of tables) {
        const contents = readFileSync(join(dir, table), 'utf8');
        const [res] = await pool.query(contents);
        if ((<any>res).warningStatus === 0) {
            created.push(contents.split('`')[1]);
        }
    }
    if (created.length) {
        console.log('Created tables %o', created);
    } else {
        console.log('All tables already created.');
    }
}
