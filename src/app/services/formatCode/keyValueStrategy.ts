import { FormattedCode } from './formattedCode';
import { FormattedCodeType } from './formattedCodeType';
import { IFormatCodeStrategy } from './formatCodeStrategy.interface';
import { KeyValue } from '@angular/common';
import { KeyValueCode } from './keyValueCode';

export class KeyValueStrategy implements IFormatCodeStrategy {
    private regex = /([^:]+):([^;]+)[;]*/g;

    public canFormat(code: string): boolean {
        return code.match(this.regex) != null;
    }

    public format(code: string): FormattedCode {
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

    public getType(): FormattedCodeType {
        return FormattedCodeType.keyValue;
    }
}
