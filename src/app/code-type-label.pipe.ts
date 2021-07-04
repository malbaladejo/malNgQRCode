import { Pipe, PipeTransform } from '@angular/core';

import { FormattedCodeType } from './services/formatCode/formattedCodeType';

@Pipe({
  name: 'codeTypeLabel'
})
export class CodeTypeLabelPipe implements PipeTransform {

  public transform(value: FormattedCodeType, ...args: unknown[]): unknown {
    switch (value) {
      case FormattedCodeType.email:
        return 'E-mail';
      case FormattedCodeType.keyValue:
        return 'Clés / valeurs';
      case FormattedCodeType.raw:
        return 'Texte';
      case FormattedCodeType.url:
        return 'Lien internet';
      default:
        return value;
    }
  }

}
