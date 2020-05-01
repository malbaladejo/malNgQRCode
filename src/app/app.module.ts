import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';
import { QRCodeModule } from 'angularx-qrcode';

import { AppComponent } from './app.component';
import { ScanService } from './services/scan-service/scan.service';
import { ScanComponent } from './scan/scan.component';
import { HomeComponent } from './home/home.component';
import { JsQrService } from './services/scan-service/jsQr.service';
import { DetailComponent } from './detail/detail.component';
import { DataService } from './services/data/data.service';
import { GenerateQrCodeComponent } from './generate-qr-code/generate-qr-code.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ScanComponent,
    HomeComponent,
    DetailComponent,
    GenerateQrCodeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    QRCodeModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule
  ],
  providers: [{
    provide: ScanService, useClass: JsQrService
  },
    DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
