import { Phase, ServerGame } from '../interfaces/Game';

const games: { [key: string]: ServerGame } = {};

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