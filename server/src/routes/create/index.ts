import { Request } from 'express';

const CODE_CHARACTERS: String = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function generateCode() {
    let text = "";
    for (let i = 0; i < 4; i++) {
        text += CODE_CHARACTERS.charAt(~~(Math.random() * CODE_CHARACTERS.length));
    }
    return text;
}

export function getCreateData(req: Request) {
    return {
        code: generateCode(),
    };
}