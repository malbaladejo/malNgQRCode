import { Code } from './code';
import { CodeAction } from './codeAction';
import { DataBaseService } from './dataBase.service';
import { FormatCodeService } from '../formatCode/formatCode.service';
import { GuidService } from './guid.service';
import { Injectable } from '@angular/core';
import { remove } from 'lodash-es';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private codes: Array<Code>;
  constructor(
    private dataBaseService: DataBaseService,
    private formatCodeService: FormatCodeService,
    private guidService: GuidService) { }

  saveCode(value: string, action: CodeAction): Code {
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

  deleteCode(id: string) {
    this.ensuresCodes();
    remove(this.codes, i => i.id === id);
    this.saveCodes();
  }

  private buildCode(value: string, action: CodeAction): Code {
    const code = new Code();
    code.code = value;
    code.date = new Date();
    code.id = this.guidService.newGuid();
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

    this.codes = this.dataBaseService.getAllCodes();

    // HACK a supprimer dans la prochiane version
    this.codes.filter(c => c.type == null)
      .forEach(c => c.type = this.formatCodeService.getType(c.code));
  }

  private saveCodes() {
    this.ensuresCodes();
    this.dataBaseService.saveCodes(this.codes);
  }
}
