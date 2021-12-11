
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ScanService } from '../services/scan-service/scan.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data/data.service';
import { CodeAction } from '../services/data/codeAction';
import { Code } from '../services/data/code';
import { BarCodeType } from '../services/data/bar-code-type';
import { GenerateQrCodeEditTokenRoute } from '../generate-qr-code/generate-qr-code-edit.route';
import { ComponentBase } from '../shared/ComponentBase';

@Component({
  selector: 'app-scan-qrcode',
  templateUrl: './scan-qrcode.component.html',
  styleUrls: ['./scan-qrcode.component.scss']
})
export class ScanQrCodeComponent extends ComponentBase implements OnInit, OnDestroy {

  constructor(
    private scanService: ScanService,
    private router: Router,
    private dataService: DataService) {
    super();
  }
  public ngOnDestroy(): void {
    this.scanService.stop();
  }

  public ngOnInit() {
    console.log('Barcode: initialization');
    this.scanService.start().subscribe(reference => this.onReferenceDetected(reference));
  }

  private onReferenceDetected(reference: string): void {
    this.saveCode(reference);
  }

  private saveCode(reference: string) {
    let code = new Code();
    code.action = CodeAction.Scan;
    code.barCodeType = BarCodeType.QrCode;
    code.code = reference;
    code = this.dataService.saveCode(code);

    this.router.navigate(GenerateQrCodeEditTokenRoute.getUrl(code.id));
  }
}
