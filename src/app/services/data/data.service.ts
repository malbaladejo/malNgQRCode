import { Code } from './code';
import { CodeAction } from './codeAction';
import { DataBaseService } from './dataBase.service';
import { FormatCodeService } from '../formatCode/formatCode.service';
import { GuidService } from './guid.service';
import { Injectable } from '@angular/core';
import { remove } from 'lodash-es';
import { BarCodeType } from './bar-code-type';
import { UpgradeDataService } from './upgrade-data.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private codes: Array<Code>;
  constructor(
    private dataBaseService: DataBaseService,
    private formatCodeService: FormatCodeService,
    private guidService: GuidService,
    private upgradeDataService: UpgradeDataService) { }

  public saveCode(code: Code): Code {
    this.ensuresCodes();
    this.buildCode(code);

    this.AddOrUpdateCode(code);

    this.saveCodes();
    return code;
  }

  public getCode(id: string): Code {
    this.ensuresCodes();
    for (const value of this.codes) {
      if (value.id === id) {
        return value;
      }
    }
    throw (new Error('Unknown id ' + id));
  }

  public getAllCodes(): Array<Code> {
    this.ensuresCodes();
    return this.codes.filter(c => !c.isDeleted);
  }

  public getDeletedCodes(): Array<Code> {
    this.ensuresCodes();
    return this.codes.filter(c => c.isDeleted);
  }

  public deleteCode(id: string) {
    this.ensuresCodes();
    const code = this.getCode(id);
    if (code) {
      code.isDeleted = true;
      code.deleteDate = new Date();
    }
    this.saveCodes();
  }

  private buildCode(code: Code): Code {
    code.date = new Date();
    code.type = this.formatCodeService.getType(code.code);

    if (!code.id) {
      code.id = this.guidService.newGuid();
    }

    return code;
  }

  private AddOrUpdateCode(code: Code) {
    if (this.tryGetCodeById(code.id) != null) {
      return;
    }

    this.codes.push(code);
  }

  private tryGetCodeById(id: string): Code {
    for (const value of this.codes) {
      if (value.id === id) {
        return value;
      }
    }

    return null;
  }

  private ensuresCodes() {
    if (this.codes) {
      return;
    }

    this.codes = this.dataBaseService.getCodes();
    this.upgradeDataService.upgradeData(this.codes);
  }

  private saveCodes() {
    this.ensuresCodes();
    this.dataBaseService.saveCodes(this.codes);
  }
}
