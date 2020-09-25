import WebSocket from 'ws';
import { ServerGame } from './Game';

export class Player {
    game: ServerGame;
    id: string;
    index: number;
    username: string;
    connection: WebSocket;
    selectedAnswer: string;
    points: number;

    constructor(game: ServerGame, id: string, username: string, index: number, connection: WebSocket) {
        this.game = game;
        this.id = id;
        this.index = index;
        this.username = username;
        this.connection = connection;
        this.selectedAnswer = '';
        this.points = 0;
    }

    selectAnswer(answer: string) {
        this.selectedAnswer = answer;
    }

    reset() {
        this.selectedAnswer = '';
    }
}
export class ClientPlayer {
    id: string;
    username: string;
    index: number;
    selectedAnswer: string;
    points: number;

    constructor(player: Player) {
        this.id = player.id;
        this.username = player.username;
        this.index = player.index;
        this.selectedAnswer = player.selectedAnswer;
        this.points = player.points;
    }
}