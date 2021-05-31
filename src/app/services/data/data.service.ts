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
  private codesKey = 'codes-key';
  constructor(private formatCodeService: FormatCodeService) { }

  public saveCode(value: string, action: CodeAction): Code {
    this.ensuresCodes();
    const code = this.buildCode(value, action);

    this.AddOrUpdateCode(code);

    this.saveCodes();
    return code;
  }

  getCode(id: string): Code {
    this.ensuresCodes();
    for (const value of this.codes) {
      if (value.id === id) {
        return value;
      }
    }
    throw (new Error('Unknown id ' + id));
  }

  getAllCodes(): Array<Code> {
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
    code.type = this.formatCodeService.getType(code.code);
    return code;
  }

  private AddOrUpdateCode(code: Code) {
    if (this.updateCodeIfExist(code)) {
      return;
    }

    this.codes.push(code);
  }

  private updateCodeIfExist(code: Code): boolean {
    const existingCode = this.tryGetCodeByValue(code.code);
    if (!existingCode) {
      return false;
    }
    existingCode.date = new Date();
    return true;
  }

  private tryGetCodeByValue(code: string): Code {
    for (const value of this.codes) {
      if (value.code === code) {
        return value;
      }
    }

    return null;
  }

  private ensuresCodes() {
    if (this.codes) {
      return;
    }

    const json = localStorage.getItem(this.codesKey);
    if (json) {
      this.codes = JSON.parse(json);
    }
    else {
      this.codes = new Array<Code>();
    }

    // HACK a supprimer dans la prochiane version
    this.codes.filter(c => c.type == null)
      .forEach(c => c.type = this.formatCodeService.getType(c.code));

    localStorage.setItem(this.codesKey, JSON.stringify(this.codes));
  }

  private saveCodes() {
    this.ensuresCodes();
    localStorage.setItem(this.codesKey, JSON.stringify(this.codes));
  }
}
