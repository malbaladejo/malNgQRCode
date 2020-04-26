import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data/data.service';
import { CodeAction } from '../services/data/code';

@Component({
  selector: 'app-generate-qr-code',
  templateUrl: './generate-qr-code.component.html',
  styleUrls: ['./generate-qr-code.component.scss']
})
export class GenerateQrCodeComponent implements OnInit {

  public value: string;
  constructor(private _dataService: DataService) { }

  ngOnInit(): void {
  }

  save() {
    this._dataService.saveCode(this.value, CodeAction.Generate);
  }
}
