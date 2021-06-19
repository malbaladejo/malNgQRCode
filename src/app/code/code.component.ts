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

  ngOnInit(): void {
  }

  get code(): Code {
    return this.currentCode;
  }

  @Input()
  set code(code: Code) {
    this.currentCode = code;
  }
}
