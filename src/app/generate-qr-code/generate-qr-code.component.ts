import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { BarCodeSubType, BarCodeType } from '../services/data/bar-code-type';
import { Code } from '../services/data/code';
import { CodeAction } from '../services/data/codeAction';
import { DataService } from '../services/data/data.service';
import { ComponentBase } from '../shared/ComponentBase';
import { GenerateQrCodeEditTokenRoute } from './generate-qr-code-edit.route';

@Component({
  selector: 'app-generate-qr-code',
  templateUrl: './generate-qr-code.component.html',
  styleUrls: ['./generate-qr-code.component.scss']
})
export class GenerateQrCodeComponent extends ComponentBase implements OnInit, OnDestroy {
  public code: Code;
  private idSubscription: Subscription;
  public QrCode = BarCodeType.QrCode;
  public BarCode = BarCodeType.BarCode;

  public barCodeSubTypes = [
    BarCodeSubType.EAN13,
    BarCodeSubType.EAN2,
    BarCodeSubType.EAN5,
    BarCodeSubType.EAN8,
    BarCodeSubType.UPC];

  constructor(private dataService: DataService, private router: Router, route: ActivatedRoute) {
    super();

    this.idSubscription = GenerateQrCodeEditTokenRoute.getParam(route)
      .subscribe(param => this.loadCodeFromId(param.id));
  }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this.idSubscription.unsubscribe();
  }

  public save() {
    this.dataService.saveCode(this.code);
    this.router.navigate(['']);
  }

  private loadCodeFromId(id: string) {
    if (id) {
      this.code = this.dataService.getCode(id);
    }
    else {
      this.code = new Code();
      this.code.action = CodeAction.Generate;
      this.code.barCodeType = BarCodeType.QrCode;
    }
  }
}
