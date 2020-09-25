import { Phase, ServerGame } from '../interfaces/Game';

const USER_CHARACTERS: String = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export const games: { [key: string]: ServerGame } = {};
export const userIds: string[] = [];

function generateId() {
    let text = "";
    for (let i = 0; i < 12; i++) {
        text += USER_CHARACTERS.charAt(~~(Math.random() * USER_CHARACTERS.length));
    }
    return text;
}

export function generateUserId(): string {
    let id = generateId();
    while (userIds.indexOf(id) !== -1) {
        id = generateId();
    }
    userIds.push(id);
    return id;
}

export function getGame(code: string): ServerGame {
    return games[code];
}

export function createGame(code: string): ServerGame | undefined {
    if (getGame(code)) {
        return undefined;
    }
    games[code] = new ServerGame(code, Phase.JOINING);

    return games[code];
}