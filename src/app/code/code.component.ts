import { Component, Input, OnInit } from '@angular/core';

import { Code } from '../services/data/code';
import { FormattedCodeType } from '../services/formatCode/formattedCodeType';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss']
})
export class CodeComponent implements OnInit {

  public email = FormattedCodeType.email;
  public url = FormattedCodeType.url;
  public keyValue = FormattedCodeType.keyValue;
  public raw = FormattedCodeType.raw;

  private currentCode: Code;

  constructor() { }

  public ngOnInit(): void {
  }

  public get code(): Code {
    return this.currentCode;
  }

  @Input()
  public set code(code: Code) {
    this.currentCode = code;
    this.label = this.buildLabel();
  }

  public label: string;

  private buildLabel(): string {
    if (!this.code) {
      return '--';
    }

    if (!!this.code.label) {
      return this.code.label;
    }
    const maxLabelLength = 47;
    if (this.code.code.length <= maxLabelLength) {
      return this.code.code;
    }
    const label = this.code.code.substring(0, maxLabelLength);
    return label + '...';
  }
}
