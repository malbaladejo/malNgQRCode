
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ScanService } from '../services/scan-service/scan.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data/data.service';
import { CodeAction } from '../services/data/codeAction';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss']
})
export class ScanComponent implements OnInit, OnDestroy {

  public code: string;
  public isNotificationVisible = false;
  public isBusy = false;

  private detectedReferences = new Array<string>();

  constructor(
    private scanService: ScanService,
    private router: Router,
    private dataService: DataService) {

  }
  public ngOnDestroy(): void {
    this.scanService.stop();
  }

  public ngOnInit() {
    console.log('Barcode: initialization');
    this.scanService.start().subscribe(reference => this.onReferenceDetected(reference));
  }

  private onReferenceDetected(reference: string): void {
    if (this.isBusy) {
      return;
    }

    if (this.detectedReferences.find(r => r === reference)) {
      return;
    }

    this.code = reference;
    this.detectedReferences.push(reference);
    this.isBusy = true;
    this.isNotificationVisible = true;

    const code = this.dataService.saveCode(reference, CodeAction.Scan);
    this.router.navigate(['detail/' + code.id]);
  }

}
