import { Player, ClientPlayer } from './Player';
import WebSocket from 'ws';
import Questions from '../data/questions';
import { games } from '../services/game';

const debug = require('debug')('Server:Game');

export class ServerGame {
    code: string;
    phase: Phase;
    host: WebSocket | undefined;

    round: number;
    roundPhase: RoundPhase;
    selectingCategory: string;
    selectedCategory: number;
    selectedQuestion: number;
    categorySelection: number[];
    timeRemaining: number;
    totalTime: number;
    timer: ReturnType<typeof setInterval> | undefined;

    players: {
        [key: string]: {
            username: string;
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
        this.selectedQuestion = -1;
        this.categorySelection = [];
        this.timeRemaining = 0;
        this.totalTime = 0;
    }

    private setTimeRemaining(time: number) {
        this.totalTime = this.timeRemaining = time;
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

    connectPlayer(id: string, username: string, connection: WebSocket) {
        this.connectedPlayers[id] = new Player(this, id, username, Object.keys(this.players).length, connection);
        this.players[id] = new ClientPlayer(this.connectedPlayers[id]);
        this.updateConnections();

        debug(`${username}[${id}] has connected to game ${this.code}.`);
    }

    disconnectPlayer(id: string) {
        delete this.connectedPlayers[id];
        if (this.phase === Phase.JOINING) {
            delete this.players[id];
        }
        this.updateConnections();
    }

    start() {
        this.phase = Phase.PLAYING;
        this.round = -1;
        this.nextRound();
    }

    nextRound() {
        if (this.round == 2) {
            this.phase = Phase.DETERMINE_WINNER;
        }
        this.round++;
        this.roundPhase = RoundPhase.CATEGORY;
        this.setTimeRemaining(100000000);
        this.selectCategoryPicker();

        this.selectedCategory = -1;
        this.selectedQuestion = -1;
        for (let id in this.connectedPlayers) {
            this.connectedPlayers[id].reset();
        }

        this.timer = setInterval(() => {
            this.timeRemaining--;
            this.updateConnections();

            if (this.timeRemaining === 0 && this.timer) {
                this.selectCategory(~~(Math.random() * Questions.length));
            }
        }, 1000);

        this.updateConnections();
    }

    selectCategory(index: number) {
        this.selectedCategory = index;
        this.roundPhase = RoundPhase.PLAYING;
        this.selectedQuestion = ~~(Math.random() * Questions[this.selectedCategory].questions.length);
        this.updateConnections();
        this.setTimeRemaining(30000000);

        this.timer && clearInterval(this.timer);
        this.timer = setInterval(() => {
            this.timeRemaining--;
            this.updateConnections();

            if (this.timeRemaining === 0 && this.timer) {
                this.roundOver();
            }
        }, 1000);

        debug(`${this.players[this.selectingCategory].username}[${this.selectingCategory}] has selected category index #${index}.`);
    }

    selectCategoryPicker() {
        const keys = Object.keys(this.players);
        this.selectingCategory = keys[keys.length * Math.random() << 0];

        this.categorySelection = [];
        while (this.categorySelection.length < 3) {
            let categoryIndex = ~~(Math.random() * Questions.length);
            while (this.categorySelection.indexOf(categoryIndex) !== -1) {
                categoryIndex = ~~(Math.random() * Questions.length);
            }
            this.categorySelection.push(categoryIndex);
        }
    }

    roundOver() {
        this.roundPhase = RoundPhase.ANSWERS;

        this.timer && clearInterval(this.timer);
        setTimeout(() => {
            this.nextRound();
        }, 1000 * 15);

        this.updateConnections();
    }

    // When the host leaves, disconnect all players and end the game.
    forceEnd() {
        delete games[this.code];

        for (let key in this.connectedPlayers) {
            this.connectedPlayers[key].connection.send(JSON.stringify({
                page: 'GAME',
                message: 'EXIT',
            }));
        }
    }

    selectAnswer(userId: string, answer: string) {
        this.connectedPlayers[userId].selectAnswer(answer);
        this.updateConnections();

        for (let id in this.connectedPlayers) {
            const player = this.connectedPlayers[id];
            if (!player.selectedAnswer) {
                return;
            }
        }
        this.roundOver();
    }
}

export class ClientGame {
    code: string;
    phase: Phase;
    players: {
        [key: string]: ClientPlayer
    }
    round: number;
    roundPhase: RoundPhase;
    selectingCategory: string;
    selectedCategory: number;
    selectedQuestion: number;
    questions: any;
    categorySelection: number[];
    timeRemaining: number;
    totalTime: number;

    constructor(game: ServerGame) {
        this.code = game.code;
        this.phase = game.phase;
        this.questions = Questions;
        this.round = game.round;
        this.roundPhase = game.roundPhase;
        this.selectingCategory = game.selectingCategory;
        this.selectedCategory = game.selectedCategory;
        this.selectedQuestion = game.selectedQuestion;
        this.categorySelection = game.categorySelection;
        this.timeRemaining = game.timeRemaining;
        this.totalTime = game.totalTime;

        this.players = {};
        for (let id in game.connectedPlayers) {
            this.players[id] = new ClientPlayer(game.connectedPlayers[id]);
        }
    }
}

export enum Phase {
    JOINING,
    PLAYING,
    DETERMINE_WINNER
}
export enum RoundPhase {
    CATEGORY,
    PLAYING,
    ANSWERS
}