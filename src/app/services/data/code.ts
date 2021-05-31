import { FormattedCodeType } from '../formatCode/formattedCodeType';
import { CodeAction } from './codeAction';

export class Code {
    public id: string;
    public date: Date;
    public code: string;
    public action: CodeAction;
    public type: FormattedCodeType;
}
