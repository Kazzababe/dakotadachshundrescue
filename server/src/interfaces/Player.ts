import WebSocket from 'ws';

export default class Player {
    username: string;
    connection: WebSocket;

    constructor(username: string, connection: WebSocket) {
        this.username = username;
        this.connection = connection;
    }
}