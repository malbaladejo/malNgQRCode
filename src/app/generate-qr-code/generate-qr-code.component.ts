import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Code } from '../services/data/code';
import { CodeAction } from '../services/data/codeAction';
import { DataService } from '../services/data/data.service';
import { ComponentBase } from '../shared/ComponentBase';
import { GenerateQrCodeEditToken } from './generate-qr-code-edit.token';

@Component({
  selector: 'app-generate-qr-code',
  templateUrl: './generate-qr-code.component.html',
  styleUrls: ['./generate-qr-code.component.scss']
})
export class GenerateQrCodeComponent extends ComponentBase implements OnInit, OnDestroy {
  public value: string;
  private code: Code;
  private idSubscription: Subscription;

  constructor(private dataService: DataService, private router: Router, route: ActivatedRoute) {
    super();

    this.idSubscription = route.paramMap.pipe(
      map(params => GenerateQrCodeEditToken.getParam(params).id))
      .subscribe(id => this.loadCodeFromId(id));
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.idSubscription.unsubscribe();
  }

  save() {
    this.dataService.saveCode(this.value, CodeAction.Generate);
    this.router.navigate(['']);
  }

  private loadCodeFromId(id: string) {
    this.code = this.dataService.getCode(id);
    this.value = this.code.code;
  }
}
