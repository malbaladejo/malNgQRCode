import { ActivatedRoute, NavigationExtras, ParamMap, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Code } from '../services/data/code';
import { CodeAction } from '../services/data/codeAction';
import { ComponentBase } from '../shared/ComponentBase';
import { DataService } from '../services/data/data.service';
import { DetailToken } from './detail.token';
import { FormatCodeService } from '../services/formatCode/formatCode.service';
import { FormattedCode } from '../services/formatCode/formattedCode';
import { FormattedCodeType } from '../services/formatCode/formattedCodeType';
import { GenerateQrCodeEditToken } from '../generate-qr-code/generate-qr-code-edit.token';
import { KeyValueCode } from '../services/formatCode/keyValueCode';
import { NavigationToken } from '../routesModule/navigation.token';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

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

  displayedColumns: string[] = ['key', 'value'];
  private idSubscription: Subscription;

  constructor(
    private dataService: DataService,
    private formatCodeService: FormatCodeService,
    private route: ActivatedRoute,
    private router: Router) {
    super();
    this.idSubscription = this.route.paramMap.pipe(
      map(params => DetailToken.getParam(params).id))
      .subscribe(id => this.loadCodeFromId(id));
  }

  ngOnInit(): void {
    this.errorMessage = '';

  }

  ngOnDestroy(): void {
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

  get keyValueCode(): KeyValueCode {
    return this.formattedCode as KeyValueCode;
  }

  private extractDataFromCode() {
    this.formattedCode = this.formatCodeService.format(this.code.code);
  }

  isScanned(): boolean {
    if (!this.code) {
      return false;
    }
    return this.code.action === CodeAction.Scan;
  }

  isGenerated(): boolean {
    if (!this.code) {
      return false;
    }
    return this.code.action === CodeAction.Generate;
  }

  delete() {
    this.dataService.deleteCode(this.code.id);
    this.router.navigate(['']);
  }

  editToken(): NavigationToken {
    return new GenerateQrCodeEditToken(this.code.id);
  }
}
