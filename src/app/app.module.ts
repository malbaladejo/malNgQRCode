import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './routesModule/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CodeComponent } from './code/code.component';
import { CodeIconComponent } from './code-icon/code-icon.component';
import { CodeTypeLabelPipe } from './code-type-label.pipe';
import { DataBaseService } from './services/data/dataBase.service';
import { DataService } from './services/data/data.service';
import { DetailComponent } from './detail/detail.component';
import { FormatCodeService } from './services/formatCode/formatCode.service';
import { FormsModule } from '@angular/forms';
import { GenerateQrCodeComponent } from './generate-qr-code/generate-qr-code.component';
import { GuidService } from './services/data/guid.service';
import { HomeComponent } from './home/home.component';
import { JsQrService } from './services/scan-service/jsQr.service';
import { MaterialModule } from './material/material.module';
import { NgModule } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';
import { ScanQrCodeComponent } from './scan-qr-code/scan-qrcode.component';
import { ScanService } from './services/scan-service/scan.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { dataBaseServiceFactory } from './services/data/dataBase.factory';
import { environment } from '../environments/environment';
import { guidServiceFactory } from './services/data/guid.factory';
import { IconFontModule } from './shared/font-awesome.module';
import { NgxBarcode6Module } from 'ngx-barcode6';
import { BarCodeComponent } from './bar-code/bar-code.component';
import { ScanBarcodeComponent } from './scan-bar-code/scan-bar-code.component';
import { BarcodeScannerLivestreamModule } from "ngx-barcode-scanner";

@NgModule({
  declarations: [
    AppComponent,
    ScanQrCodeComponent,
    HomeComponent,
    DetailComponent,
    GenerateQrCodeComponent,
    AboutComponent,
    CodeComponent,
    CodeIconComponent,
    CodeTypeLabelPipe,
    BarCodeComponent,
    ScanBarcodeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    QRCodeModule,
    NgxBarcode6Module,
    BarcodeScannerLivestreamModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    IconFontModule
  ],
  providers: [
    { provide: ScanService, useClass: JsQrService },
    { provide: GuidService, useFactory: guidServiceFactory },
    {
      provide: DataBaseService,
      useFactory: dataBaseServiceFactory.instance,
      deps: dataBaseServiceFactory.dependencies
    },
    DataService,
    FormatCodeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
