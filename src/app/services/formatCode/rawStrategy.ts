import { IFormatCodeStrategy } from './formatCodeStrategy.interface';
import { FormattedCode } from './formattedCode';
import { FormattedCodeType } from './formattedCodeType';

export class RawStrategy implements IFormatCodeStrategy {
    canFormat(code: string): boolean {
        return true;
    }

    format(code: string): FormattedCode {
        return new FormattedCode(code);
    }

    getType(): FormattedCodeType {
        return FormattedCodeType.raw;
    }
}
