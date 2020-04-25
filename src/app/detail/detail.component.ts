import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data/data.service';
import { ActivatedRoute } from '@angular/router';
import { Code } from '../services/data/code';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  public code: Code;

  constructor(private _dataService: DataService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this._route.snapshot.paramMap.get('id');
    this.code = this._dataService.getCode(id);
  }

}
