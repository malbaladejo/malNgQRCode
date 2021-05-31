export class Guid {
    static newGuid(): string {
        return `{Date.now()}-{Guid.nextBlock()-{Guid.nextBlock()}`;
    }

    private static characters = '0123456789ABCDEFGHIJKLMNPQRSTUVWXYZ';

    private static nextBlock(): string {
        let value = '';
        for (let i = 0; i < 4; i++) {
            value += Guid.nextChar();
        }
        return value;
    }

    private static nextChar(): string {
        const index = Math.random() * Guid.characters.length;
        return Guid.characters.substr(index, 1);
    }
}
