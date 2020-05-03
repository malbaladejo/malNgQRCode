import { KeyValue } from '@angular/common';
import { IFormatCodeStrategy } from './formatCodeStrategy.interface';
import { FormattedCode } from './formattedCode';
import { KeyValueCode } from './keyValueCode';
import { FormattedCodeType } from './formattedCodeType';

export class KeyValueStrategy implements IFormatCodeStrategy {
    private regex = /([^:]+):([^;]+)[;]*/g;

    canFormat(code: string): boolean {
        return code.match(this.regex) != null;
    }

    format(code: string): FormattedCode {
        const keyValueMessages = new Array<KeyValue<string, string>>();

        var matches;
        while ((matches = this.regex.exec(code)) !== null) {
            var msg = 'Trouvé ' + matches[0] + '. ';

            keyValueMessages.push({
                "key": matches[1],
                "value": matches[2]
            });
        }

        return new KeyValueCode(keyValueMessages);
    }

    getType(): FormattedCodeType {
        return FormattedCodeType.keyValue;
    }
}