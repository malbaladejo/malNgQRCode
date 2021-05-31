import { IFormatCodeStrategy } from './formatCodeStrategy.interface';
import { FormattedCode } from './formattedCode';
import { FormattedCodeType } from './formattedCodeType';

export class UrlStrategy implements IFormatCodeStrategy {
    private regex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g;

    canFormat(code: string): boolean {
        return code.match(this.regex) != null;
    }

    format(code: string): FormattedCode {
        return new FormattedCode(code, FormattedCodeType.url);
    }

    getType(): FormattedCodeType {
        return FormattedCodeType.url;
    }
}
