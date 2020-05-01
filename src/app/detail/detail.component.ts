import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Code, CodeAction } from '../services/data/code';

class KeyValue<TKey, TValue>{
  public key: TKey;
  public value: TValue;
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  public code: Code;
  public errorMessage;
  public keyValueMessages = new Array<KeyValue<string, string>>();

  constructor(
    private _dataService: DataService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit(): void {
    this.errorMessage = '';
    let id = this._route.snapshot.paramMap.get('id');
    try {
      this.code = this._dataService.getCode(id);
      this.extractDataFromCode();
    }
    catch (e) {
      this.errorMessage = e;
    }
  }

  private extractDataFromCode() {
    const regex = /([^:]+):([^;]+)[;]*/g;
    this.keyValueMessages = new Array<KeyValue<string, string>>();
    if (!this.code.code.match(regex))
      return;

    const matches = <RegExpMatchArray>regex.exec(this.code.code);

    var monTableau;
    while ((monTableau = regex.exec(this.code.code)) !== null) {
      var msg = 'Trouvé ' + monTableau[0] + '. ';

      this.keyValueMessages.push({
        "key": monTableau[1],
        "value": monTableau[2]
      });
      console.log(msg);
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
