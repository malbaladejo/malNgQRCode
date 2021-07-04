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
            id: this.guidService.newGuid(),
            action: CodeAction.Scan,
            code: 'code1:value1;code2:value2;code3:value3',
            date: new Date(),
            type: FormattedCodeType.keyValue
        }, {
            id: this.guidService.newGuid(),
            action: CodeAction.Scan,
            code: 'https://angular.io/',
            date: new Date(),
            type: FormattedCodeType.url
        }, {
            id: this.guidService.newGuid(),
            action: CodeAction.Scan,
            code: 'test@free.fr',
            date: new Date(),
            type: FormattedCodeType.email
        },
        {
            id: this.guidService.newGuid(),
            action: CodeAction.Generate,
            code: 'mon texte libre',
            date: new Date(),
            type: FormattedCodeType.keyValue
        },
        {
            id: this.guidService.newGuid(),
            action: CodeAction.Generate,
            code: 'https://github.com/malbaladejo/malNgQRCode',
            date: new Date(),
            type: FormattedCodeType.url
        }];

        for (let i = 0; i < 20; i++) {
            items.push({
                id: this.guidService.newGuid(),
                action: CodeAction.Generate,
                code: `texte ${i}`,
                date: new Date(),
                type: FormattedCodeType.raw
            });
        }
        return items;
    }
}
