import Player from './Player';
import WebSocket from 'ws';
import Questions from '../data/questions';

const debug = require('debug')('ServerGame');

export class ServerGame {
    code: string;
    phase: Phase;
    host: WebSocket | undefined;

    round: number;
    roundPhase: RoundPhase;
    selectingCategory: string;
    selectedCategory: number;
    categorySelection: number[];

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

        this.round = 0;
        this.roundPhase = RoundPhase.CATEGORY;
        this.selectingCategory = '';
        this.selectedCategory = -1;
        this.categorySelection = [];
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
        this.round = 0;
        this.roundPhase = RoundPhase.CATEGORY;
        this.selectCategoryPicker();

        this.updateConnections();
    }

    nextRound() {
        this.round++;
        this.roundPhase = RoundPhase.CATEGORY;
        this.selectCategoryPicker();

        this.updateConnections();
    }

    selectCategory(index: number) {
        this.selectedCategory = index;
        this.roundPhase = RoundPhase.PLAYING;
        this.updateConnections();

        debug(`${this.selectingCategory} has selected category index #${index}.`);
    }

    selectCategoryPicker() {
        const keys = Object.keys(this.players);
        this.selectingCategory = this.players[keys[keys.length * Math.random() << 0]].username;
        this.categorySelection = [0, 1, 2];
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
    roundPhase: RoundPhase;
    selectingCategory: string;
    selectedCategory: number;
    questions: any;
    categorySelection: number[];

    constructor(game: ServerGame) {
        this.code = game.code;
        this.phase = game.phase;
        this.players = game.players;
        this.questions = Questions;
        this.roundPhase = game.roundPhase;
        this.selectingCategory = game.selectingCategory;
        this.selectedCategory = game.selectedCategory;
        this.categorySelection = game.categorySelection;
    }
}

export enum Phase {
    JOINING,
    PLAYING
}
export enum RoundPhase {
    CATEGORY,
    PLAYING
}