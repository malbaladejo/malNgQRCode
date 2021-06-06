import { Component, Input, OnInit } from '@angular/core';
import { faQrcode, faIndustry, faAt, faGlobe, faList, faAlignJustify, faTrash, faTimes, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Code } from '../services/data/code';
import { FormattedCodeType } from '../services/formatCode/formattedCodeType';

@Component({
  selector: 'app-code-icon',
  templateUrl: './code-icon.component.html',
  styleUrls: ['./code-icon.component.scss']
})
export class CodeIconComponent implements OnInit {

  private codeTypeToIconMappings = {
    [FormattedCodeType.email]: faAt,
    [FormattedCodeType.url]: faGlobe,
    [FormattedCodeType.keyValue]: faList,
    [FormattedCodeType.raw]: faAlignJustify
  };

  private currentCode: Code;

  constructor() { }

  ngOnInit(): void {
  }

  get code(): Code {
    return this.currentCode;
  }

  @Input()
  set code(code: Code) {
    this.currentCode = code;
  }

  get icon(): IconDefinition {
    return this.codeTypeToIconMappings[this.code.type];
  }

}
