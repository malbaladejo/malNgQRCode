import { Injectable } from '@angular/core';
import { Code } from './code';

@Injectable({
    providedIn: 'root'
})
export class DataBaseService {
    private codesKey = 'codes-key';

    saveCodes(codes: Array<Code>): void {
        localStorage.setItem(this.codesKey, JSON.stringify(codes));
    }

    getAllCodes(): Code[] {
        const json = localStorage.getItem(this.codesKey);
        if (json) {
            return JSON.parse(json);
        }
        else {
            return new Array<Code>();
        }
    }
}


