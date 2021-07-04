import { ActivatedRoute, NavigationExtras, ParamMap, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Code } from '../services/data/code';
import { CodeAction } from '../services/data/codeAction';
import { ComponentBase } from '../shared/ComponentBase';
import { DataService } from '../services/data/data.service';
import { FormatCodeService } from '../services/formatCode/formatCode.service';
import { FormattedCode } from '../services/formatCode/formattedCode';
import { FormattedCodeType } from '../services/formatCode/formattedCodeType';
import { KeyValueCode } from '../services/formatCode/keyValueCode';
import { Subscription } from 'rxjs';
import { DetailRoute } from './detail.route';
import { GenerateQrCodeEditTokenRoute } from '../generate-qr-code/generate-qr-code-edit.route';

// TODO revoir le layout pour les raw texte trop long.
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent extends ComponentBase implements OnInit, OnDestroy {
  public code: Code;
  public errorMessage;
  public formattedCode: FormattedCode;
  public url = FormattedCodeType.url;
  public email = FormattedCodeType.email;
  public raw = FormattedCodeType.raw;
  public keyValue = FormattedCodeType.keyValue;

  public displayedColumns: string[] = ['key', 'value'];
  private idSubscription: Subscription;

  constructor(
    private dataService: DataService,
    private formatCodeService: FormatCodeService,
    route: ActivatedRoute,
    private router: Router) {
    super();
    this.idSubscription = DetailRoute.getParam(route)
      .subscribe(param => this.loadCodeFromId(param.id));
  }

  public ngOnInit(): void {
    this.errorMessage = '';

  }

  public ngOnDestroy(): void {
    this.idSubscription.unsubscribe();
  }

  private loadCodeFromId(id: string) {
    try {
      this.code = this.dataService.getCode(id);
      this.extractDataFromCode();
    }
    catch (e) {
      this.errorMessage = e;
    }
  }

  public get keyValueCode(): KeyValueCode {
    return this.formattedCode as KeyValueCode;
  }

  private extractDataFromCode() {
    this.formattedCode = this.formatCodeService.format(this.code.code);
  }

  public isScanned(): boolean {
    if (!this.code) {
      return false;
    }
    return this.code.action === CodeAction.Scan;
  }

  public isGenerated(): boolean {
    if (!this.code) {
      return false;
    }
    return this.code.action === CodeAction.Generate;
  }

  public delete() {
    this.dataService.deleteCode(this.code.id);
    this.router.navigate(['']);
  }

  public editToken(): any[] {
    return GenerateQrCodeEditTokenRoute.getUrl(this.code.id);
  }
}
