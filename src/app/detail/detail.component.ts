import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Code } from '../services/data/code';
import { CodeAction } from '../services/data/codeAction';
import { DataService } from '../services/data/data.service';
import { FormatCodeService } from '../services/formatCode/formatCode.service';
import { FormattedCode } from '../services/formatCode/formattedCode';
import { FormattedCodeType } from '../services/formatCode/formattedCodeType';
import { KeyValueCode } from '../services/formatCode/keyValueCode';
import { Subscription } from 'rxjs';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { map } from 'rxjs/operators';

// TODO revoir le layout pour les raw texte trop long.

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  public faTrash = faTrash;
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
    this.idSubscription = this.route.paramMap.pipe(
      map(params => params.get('id'))
    ).subscribe(id => this.loadCodeFromId(id));
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
}
