import { Code } from './code';
import { CodeAction } from './codeAction';
import { DataBaseService } from './dataBase.service';
import { FormattedCodeType } from '../formatCode/formattedCodeType';
import { GuidService } from './guid.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DataBaseServiceMock extends DataBaseService {

    constructor(private guidService: GuidService) {
        super();
    }

    public saveCodes(codes: Array<Code>): void {
        // nothing to do
    }

    public getAllCodes(): Code[] {
        const items = [{
            name: 'Code value',
            id: this.guidService.newGuid(),
            action: CodeAction.Scan,
            code: 'code1:value1;code2:value2;code3:value3',
            date: this.getDate(),
            type: FormattedCodeType.keyValue
        }, {
            name: 'Angular',
            id: this.guidService.newGuid(),
            action: CodeAction.Scan,
            code: 'https://angular.io/',
            date: this.getDate(),
            type: FormattedCodeType.url
        }, {
            name: 'test email',
            id: this.guidService.newGuid(),
            action: CodeAction.Scan,
            code: 'test@free.fr',
            date: this.getDate(),
            type: FormattedCodeType.email
        },
        {
            name: 'free text',
            id: this.guidService.newGuid(),
            action: CodeAction.Generate,
            code: 'mon texte libre',
            date: this.getDate(),
            type: FormattedCodeType.keyValue
        },
        {
            name: 'github',
            id: this.guidService.newGuid(),
            action: CodeAction.Generate,
            code: 'https://github.com/malbaladejo/malNgQRCode',
            date: this.getDate(),
            type: FormattedCodeType.url
        }];

        for (let i = 0; i < 20; i++) {
            items.push({
                name: `random ${i}`,
                id: this.guidService.newGuid(),
                action: CodeAction.Generate,
                code: `texte ${i}`,
                date: this.getDate(),
                type: FormattedCodeType.raw
            });
        }
        return items;
    }

    private getDate(): Date {
        const numberOfDay = Math.random() * 365;
        const date = new Date();

        date.setDate(-numberOfDay);
        return date;
    }
}
