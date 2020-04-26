import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Code, CodeAction } from '../services/data/code';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  public code: Code;
  public errorMessage;

  constructor(
    private _dataService: DataService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit(): void {
    this.errorMessage = '';
    let id = this._route.snapshot.paramMap.get('id');
    try {
      this.code = this._dataService.getCode(id);
    }
    catch (e) {
      this.errorMessage = e;
    }
  }

  public isScanned(): boolean {
    if (!this.code) {
      return false;
    }
    return this.code.action == CodeAction.Scan;
  }

  public isGenerated(): boolean {
    if (!this.code) {
      return false;
    }
    return this.code.action == CodeAction.Generate;
  }

  public delete() {
    this._dataService.deleteCode(this.code.id);
    this._router.navigate(['']);
  }
}
