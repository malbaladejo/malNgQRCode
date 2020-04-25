
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ScanService } from '../services/scan-service/scan.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data/data.service';

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
    private _scanService: ScanService,
    private _router: Router,
    private _dataService: DataService) {

  }
  ngOnDestroy(): void {
    this._scanService.stop()
  }

  ngOnInit() {
    console.log('Barcode: initialization');
    this._scanService.start().subscribe(reference => this.onReferenceDetected(reference));
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

    let code = this._dataService.saveCode(reference);
    this._router.navigate(['detail/' + code.id]);
  }
}
