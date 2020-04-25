import { Injectable } from '@angular/core';
import { Code, CodeAction } from './code';
import { Guid } from './guid';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private codes = new Array<Code>();

  constructor() { }

  public saveCode(value: string): Code {
    let code = new Code();
    code.code = value;
    code.scanDate = new Date();
    code.id = Guid.NewGuid();
    code.action = CodeAction.Scan;
    this.codes.push(code);
    localStorage.setItem(code.id, JSON.stringify(code));
    return code;
  }

  public getCode(id: string): Code {
    for (let i = 0; i < this.codes.length; i++) {
      if (this.codes[i].id == id)
        return this.codes[i];
    }

    const json = localStorage.getItem(id);

    if (json) {
      const code = JSON.parse(json);
      this.codes.push(code);
      return code;
    }

    throw ('Unknown id ' + id);
  }
}
