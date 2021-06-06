import { Component, Input, OnInit } from '@angular/core';
import { faQrcode, faIndustry, faAt, faGlobe, faList, faAlignJustify, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Code } from '../services/data/code';
import { FormattedCodeType } from '../services/formatCode/formattedCodeType';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss']
})
export class CodeComponent implements OnInit {

  public faQrcode = faQrcode;
  public faIndustry = faIndustry;
  public faAt = faAt;
  public faGlobe = faGlobe;
  public faList = faList;
  public faAlignJustify = faAlignJustify;
  public faTrash = faTrash;
  public faTimes = faTimes;

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
