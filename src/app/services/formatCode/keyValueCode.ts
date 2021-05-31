import { FormattedCode } from './formattedCode';
import { FormattedCodeType } from './formattedCodeType';
import { KeyValue } from '@angular/common';

export class KeyValueCode extends FormattedCode {
    constructor(public keyValues: Array<KeyValue<string, string>>) {
        super(null, FormattedCodeType.keyValue);
    }
}
