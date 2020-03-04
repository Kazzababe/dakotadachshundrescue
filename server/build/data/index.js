"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = require("mysql2/promise");
const config_1 = __importDefault(require("../config"));
const fs_1 = require("fs");
const path_1 = require("path");
const debug = require('debug')('Server:Database');
exports.pool = promise_1.createPool(config_1.default.mysql);
async function setupDatabase() {
    const dir = path_1.join(process.cwd(), 'tables');
    const tables = fs_1.readdirSync(dir);
    const created = [];
    for (const table of tables) {
        const contents = fs_1.readFileSync(path_1.join(dir, table), 'utf8');
        const [res] = await exports.pool.query(contents);
        if (res.warningStatus === 0) {
            created.push(contents.split('`')[1]);
        }
    }
    if (created.length) {
        console.log('Created tables %o', created);
    }
    else {
        console.log('All tables already created.');
    }
}
exports.setupDatabase = setupDatabase;
