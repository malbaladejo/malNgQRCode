import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GuidService {
    newGuid(): string {
        return `${Date.now()}-${this.nextBlock()}-${this.nextBlock()}`;
    }

    private nextBlock(): string {
        let value = '';
        for (let i = 0; i < 4; i++) {
            value += this.nextChar();
        }
        return value;
    }

    private nextChar(): string {
        const characters = '0123456789ABCDEFGHIJKLMNPQRSTUVWXYZ';
        const index = Math.random() * characters.length;
        return characters.substr(index, 1);
    }
}
