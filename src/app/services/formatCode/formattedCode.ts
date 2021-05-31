import { FormattedCodeType } from './formattedCodeType';

export class FormattedCode {

    constructor(
        public code: string,
        public type: FormattedCodeType = FormattedCodeType.raw) {

    }
}
