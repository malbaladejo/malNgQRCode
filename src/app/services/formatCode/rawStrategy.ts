import { IFormatCodeStrategy } from './formatCodeStrategy.interface';
import { FormattedCode } from './formattedCode';
import { FormattedCodeType } from './formattedCodeType';

export class RawStrategy implements IFormatCodeStrategy {
    public canFormat(code: string): boolean {
        return true;
    }

    public format(code: string): FormattedCode {
        return new FormattedCode(code);
    }

    public getType(): FormattedCodeType {
        return FormattedCodeType.raw;
    }
}
