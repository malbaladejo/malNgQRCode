import { FormattedCode } from './formattedCode';
import { FormattedCodeType } from './formattedCodeType';
import { IFormatCodeStrategy } from './formatCodeStrategy.interface';

export class EmailStrategy implements IFormatCodeStrategy {
    private regex = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/;

    canFormat(code: string): boolean {
        return code.match(this.regex) != null;
    }

    format(code: string): FormattedCode {
        return new FormattedCode(code, FormattedCodeType.email);
    }

    getType(): FormattedCodeType {
        return FormattedCodeType.email;
    }
}
