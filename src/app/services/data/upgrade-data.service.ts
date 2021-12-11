import { Injectable } from '@angular/core';
import { FormatCodeService } from '../formatCode/formatCode.service';
import { BarCodeType } from './bar-code-type';
import { Code } from './code';

@Injectable({
  providedIn: 'root'
})
export class UpgradeDataService {

  constructor(private formatCodeService: FormatCodeService) { }

  public upgradeData(codes: Code[]) {
    codes.forEach(code => {

      this.upgradeType(code);
      this.upgradeBarCodeType(code);
      this.upgradeIsDeleted(code);
    });
  }

  private upgradeType(code: Code) {
    if (code.type == null) {
      code.type = this.formatCodeService.getType(code.code);
    }
  }

  private upgradeBarCodeType(code: Code) {
    if (code.barCodeType == null) {
      code.barCodeType = BarCodeType.QrCode;
    }
  }

  private upgradeIsDeleted(code: Code) {
    if (code.isDeleted == null) {
      code.isDeleted = false;
    }
  }
}
