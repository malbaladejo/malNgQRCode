import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Code } from './code';
import { CodeAction } from './codeAction';
import { Guid } from './guid';
import { FormatCodeService } from '../formatCode/formatCode.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private codes: Array<Code>;
  private codesKey = "codes-key";
  constructor(private _formatCodeService: FormatCodeService) { }

  public saveCode(value: string, action: CodeAction): Code {
    this.ensuresCodes();
    const code = this.buildCode(value, action);
    this.codes.push(code);
    this.saveCodes();
    return code;
  }

  public getCode(id: string): Code {
    this.ensuresCodes();
    for (let i = 0; i < this.codes.length; i++) {
      if (this.codes[i].id == id)
        return this.codes[i];
    }

    throw ('Unknown id ' + id);
  }

  public getAllCodes(): Array<Code> {
    this.ensuresCodes();
    return this.codes;
  }

  public deleteCode(id: string) {
    this.ensuresCodes();
    _.remove(this.codes, i => i.id === id);
    this.saveCodes();
  }

  private buildCode(value: string, action: CodeAction): Code {
    const code = new Code();
    code.code = value;
    code.date = new Date();
    code.id = Guid.newGuid();
    code.action = CodeAction.Scan;
    code.type = this._formatCodeService.getType(code.code);
    return code;
  }

  private ensuresCodes() {
    if (this.codes)
      return;

    const json = localStorage.getItem(this.codesKey);
    if (json) {
      this.codes = JSON.parse(json);
    }
    else {
      this.codes = new Array<Code>();
    }

    // HACK a supprimer dans la prochiane version
    this.codes.filter(c => c.type == null)
      .forEach(c => c.type = this._formatCodeService.getType(c.code));

    localStorage.setItem(this.codesKey, JSON.stringify(this.codes));
  }

  private saveCodes() {
    this.ensuresCodes();
    localStorage.setItem(this.codesKey, JSON.stringify(this.codes));
  }
}
