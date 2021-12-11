import { FormattedCodeType } from '../formatCode/formattedCodeType';
import { BarCodeSubType, BarCodeType } from './bar-code-type';
import { CodeAction } from './codeAction';

export class Code {
    public id: string;
    public date: Date;
    public code: string;
    public label?: string;
    public icon?: string;
    public action: CodeAction;
    public type: FormattedCodeType;
    public barCodeType: BarCodeType;
    public barCodeSubType?: BarCodeSubType;
    public isDeleted: boolean;
    public deleteDate?: Date;
}
