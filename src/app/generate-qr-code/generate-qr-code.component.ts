import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
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
  public value: string;
  private code: Code;
  private idSubscription: Subscription;

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
    this.dataService.saveCode(this.value, CodeAction.Generate);
    this.router.navigate(['']);
  }

  private loadCodeFromId(id: string) {
    this.code = this.dataService.getCode(id);
    this.value = this.code.code;
  }
}
