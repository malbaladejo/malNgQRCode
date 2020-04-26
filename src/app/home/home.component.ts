import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data/data.service';
import { Code } from '../services/data/code';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public codes: Array<Code>;
  constructor(private _dataService: DataService) { }

  ngOnInit(): void {
    this.codes = this._dataService.getAllCodes();
  }

}
