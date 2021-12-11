import { Code } from './code';
import { CodeAction } from './codeAction';
import { DataBaseService } from './dataBase.service';
import { FormattedCodeType } from '../formatCode/formattedCodeType';
import { GuidService } from './guid.service';
import { Injectable } from '@angular/core';
import { BarCodeSubType, BarCodeType } from './bar-code-type';
import { BarCodeComponent } from 'src/app/bar-code/bar-code.component';
import { Folder } from './folder';

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

    public getCodes(): Code[] {
        const items = [{
            id: this.guidService.newGuid(),
            action: CodeAction.Scan,
            code: '2099405829147',
            label: 'Migros',
            date: new Date(),
            type: FormattedCodeType.raw,
            barCodeType: BarCodeType.BarCode,
            barCodeSubType: BarCodeSubType.EAN13,
            isDeleted: false
        }, {
            id: this.guidService.newGuid(),
            action: CodeAction.Scan,
            code: 'code1:value1;code2:value2;code3:value3',
            date: new Date(),
            type: FormattedCodeType.keyValue,
            barCodeType: BarCodeType.QrCode,
            isDeleted: false
        }, {
            id: this.guidService.newGuid(),
            action: CodeAction.Scan,
            code: 'https://angular.io/',
            date: new Date(),
            type: FormattedCodeType.url,
            barCodeType: BarCodeType.QrCode,
            isDeleted: false
        }, {
            id: this.guidService.newGuid(),
            action: CodeAction.Scan,
            code: 'test@free.fr',
            date: new Date(),
            type: FormattedCodeType.email,
            barCodeType: BarCodeType.QrCode,
            isDeleted: false
        },
        {
            id: this.guidService.newGuid(),
            action: CodeAction.Generate,
            code: 'mon texte libre',
            date: new Date(),
            type: FormattedCodeType.keyValue,
            barCodeType: BarCodeType.QrCode,
            isDeleted: false
        },
        {
            id: this.guidService.newGuid(),
            action: CodeAction.Generate,
            code: 'https://github.com/malbaladejo/malNgQRCode',
            date: new Date(),
            type: FormattedCodeType.url,
            barCodeType: BarCodeType.QrCode,
            isDeleted: false
        }];

        for (let i = 0; i < 20; i++) {
            items.push({
                id: this.guidService.newGuid(),
                action: CodeAction.Generate,
                code: `texte ${i}`,
                date: new Date(),
                type: FormattedCodeType.raw,
                barCodeType: BarCodeType.QrCode,
                isDeleted: false
            });
        }
        return items;
    }

    public saveFolders(codes: Array<Folder>): void {
        // nothing to do
    }

    public getFolders(): Folder[] {
        return [
            {
                id: this.guidService.newGuid(),
                label: 'Cartes de fidélité',
                codeIds: ['1', '2', '3']
            },
            {
                id: this.guidService.newGuid(),
                label: 'Autres',
                codeIds: ['4', '5']
            },
        ];
    }
}
