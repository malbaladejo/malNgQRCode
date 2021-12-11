import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScannerLivestreamComponent } from 'ngx-barcode-scanner';
import { GenerateQrCodeEditTokenRoute } from '../generate-qr-code/generate-qr-code-edit.route';
import { BarCodeSubType, BarCodeType } from '../services/data/bar-code-type';
import { Code } from '../services/data/code';
import { CodeAction } from '../services/data/codeAction';
import { DataService } from '../services/data/data.service';
import { ComponentBase } from '../shared/ComponentBase';

@Component({
  selector: 'app-scan-bar-code',
  templateUrl: './scan-bar-code.component.html',
  styleUrls: ['./scan-bar-code.component.scss']
})
export class ScanBarcodeComponent extends ComponentBase implements AfterViewInit {
  @ViewChild(BarcodeScannerLivestreamComponent)
  private barcodeScanner: BarcodeScannerLivestreamComponent;
  public constructor(private router: Router, private dataService: DataService) {
    super();
  }

  public ngAfterViewInit() {
    this.barcodeScanner.start();
  }

  public onValueChanges(result) {
    this.saveCode(result.codeResult.code, result.codeResult.format);
  }

  public onStarted(started) {
  }

  private saveCode(reference: string, format: string) {

    let code = new Code();
    code.action = CodeAction.Scan;
    code.barCodeType = BarCodeType.BarCode;
    code.barCodeSubType = this.convertFormatToBarCodeSubType(format);
    code.code = reference;
    code = this.dataService.saveCode(code);
    this.router.navigate(GenerateQrCodeEditTokenRoute.getUrl(code.id));
  }

  private convertFormatToBarCodeSubType(type: string): BarCodeSubType {
    switch (type) {
      case 'ean13':
        return BarCodeSubType.EAN13;
      case 'ean2':
        return BarCodeSubType.EAN2;
      case 'ean5':
        return BarCodeSubType.EAN5;
      case 'ean8':
        return BarCodeSubType.EAN8;

      default:
        return BarCodeSubType.EAN13;
    }
  }
}