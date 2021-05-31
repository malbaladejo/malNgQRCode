import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Code } from '../services/data/code';
import { CodeAction } from '../services/data/codeAction';
import { DataService } from '../services/data/data.service';
import { FormatCodeService } from '../services/formatCode/formatCode.service';
import { FormattedCode } from '../services/formatCode/formattedCode';
import { FormattedCodeType } from '../services/formatCode/formattedCodeType';
import { KeyValueCode } from '../services/formatCode/keyValueCode';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  public code: Code;
  public errorMessage;
  public formattedCode: FormattedCode;
  public url = FormattedCodeType.url;
  public email = FormattedCodeType.email;
  public keyValue = FormattedCodeType.keyValue;

  displayedColumns: string[] = ['key', 'value'];

  constructor(
    private dataService: DataService,
    private formatCodeService: FormatCodeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.errorMessage = '';
    // TOOD use observable
    const id = this.route.snapshot.paramMap.get('id');
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
