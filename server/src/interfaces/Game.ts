import Player from './Player';
import WebSocket from 'ws';

const debug = require('debug')('ServerGame');

export class ServerGame {
    code: string;
    phase: Phase;
    host: WebSocket | undefined;

    players: {
        [key: string]: {
            username: string,
        }
    }
    connectedPlayers: { [key: string]: Player };

    constructor(code: string, phase: Phase) {
        this.code = code;
        this.phase = phase;
        this.players = { };
        this.connectedPlayers = {};
    }

    updateConnections() {
        for (let key in this.connectedPlayers) {
            this.connectedPlayers[key].connection.send(JSON.stringify({
                page: 'GAME',
                message: 'UPDATE',
                game: new ClientGame(this),
                isHost: false,
            }));
        }
        this.host && this.host.send(JSON.stringify({
            page: 'CREATE',
            message: 'UPDATE',
            game: new ClientGame(this),
            isHost: true,
        }));
    }

    connectPlayer(username: string, connection: WebSocket) {
        this.players[username] = { username };
        this.connectedPlayers[username] = new Player(username, connection);
        this.updateConnections();
    }

    disconnectPlayer(username: string) {
        delete this.connectedPlayers[username];
        if (this.phase === Phase.JOINING) {
            delete this.players[username];
        }
        this.updateConnections();
    }

    start() {
        this.phase = Phase.PLAYING;
        this.updateConnections();
    }

    // When the host leaves, disconnect all players and end the game.
    forceEnd() {

    }
}

export class ClientGame {
    code: string;
    phase: Phase;
    players: {
        [key: string]: {
            username: string,
        }
    }

    constructor(game: ServerGame) {
        this.code = game.code;
        this.phase = game.phase;
        this.players = game.players;
    }
}

export enum Phase {
    JOINING,
    PLAYING
}