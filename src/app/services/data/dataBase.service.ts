import { Injectable } from '@angular/core';
import { Code } from './code';
import { Folder } from './folder';

@Injectable({
    providedIn: 'root'
})
export class DataBaseService {
    private codesKey = 'codes-key';
    private foldersKey = 'folders-key';

    public saveCodes(codes: Array<Code>): void {
        this.saveData(codes, this.codesKey)
    }

    public getCodes(): Code[] {
        return this.getData<Code>(this.codesKey);
    }

    public saveFolders(codes: Array<Folder>): void {
        this.saveData(codes, this.foldersKey)
    }

    public getFolders(): Folder[] {
        return this.getData<Folder>(this.foldersKey);
    }

    private saveData<T>(data: T[], key: string): void {

        localStorage.setItem(key, JSON.stringify(data));
    }

    private getData<T>(key: string): T[] {
        const json = localStorage.getItem(key);
        if (json) {
            return JSON.parse(json);
        }
        else {
            return new Array<T>();
        }
    }
}


