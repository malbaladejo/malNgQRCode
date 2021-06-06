import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class GuidService {
    newGuid(): string {
        return `${Date.now()}-${this.nextBlock()}-${this.nextBlock()}`;
    }

    private characters = '0123456789ABCDEFGHIJKLMNPQRSTUVWXYZ';

    private nextBlock(): string {
        let value = '';
        for (let i = 0; i < 4; i++) {
            value += this.nextChar();
        }
        return value;
    }

    private nextChar(): string {
        const index = Math.random() * this.characters.length;
        return this.characters.substr(index, 1);
    }
}
