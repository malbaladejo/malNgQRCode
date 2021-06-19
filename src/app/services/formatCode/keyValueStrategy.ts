import { FormattedCode } from './formattedCode';
import { FormattedCodeType } from './formattedCodeType';
import { IFormatCodeStrategy } from './formatCodeStrategy.interface';
import { KeyValue } from '@angular/common';
import { KeyValueCode } from './keyValueCode';

export class KeyValueStrategy implements IFormatCodeStrategy {
    private regex = /([^:]+):([^;]+)[;]*/g;

    canFormat(code: string): boolean {
        return code.match(this.regex) != null;
    }

    format(code: string): FormattedCode {
        const keyValueMessages = new Array<KeyValue<string, string>>();

        let matches = this.regex.exec(code);
        while (matches !== null) {
            keyValueMessages.push({
                key: matches[1],
                value: matches[2]
            });

            matches = this.regex.exec(code);
        }

        return new KeyValueCode(keyValueMessages);
    }

    getType(): FormattedCodeType {
        return FormattedCodeType.keyValue;
    }
}
