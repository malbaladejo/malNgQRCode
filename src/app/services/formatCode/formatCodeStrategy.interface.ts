import { FormattedCode } from './formattedCode';
import { FormattedCodeType } from './formattedCodeType';

export interface IFormatCodeStrategy {
    canFormat(code: string): boolean;

    format(code: string): FormattedCode;

    getType(): FormattedCodeType;
}
