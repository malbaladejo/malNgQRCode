import { Component, Input, OnInit } from '@angular/core';
import { BarCodeType } from '../services/data/bar-code-type';
import { Code } from '../services/data/code';

@Component({
  selector: 'app-bar-code',
  templateUrl: './bar-code.component.html',
  styleUrls: ['./bar-code.component.scss']
})
export class BarCodeComponent implements OnInit {
  public QrCode = BarCodeType.QrCode;
  public BarCode = BarCodeType.BarCode;

  constructor() { }

  public ngOnInit(): void {
  }

  @Input()
  public code: Code;

}
