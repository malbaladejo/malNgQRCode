import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { QRCodeModule } from 'angularx-qrcode';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailComponent } from './detail/detail.component';
import { LongPressDirective } from './directives/long-press.directive';
import { GenerateQrCodeComponent } from './generate-qr-code/generate-qr-code.component';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './material/material.module';
import { ScanComponent } from './scan/scan.component';
import { DataService } from './services/data/data.service';
import { FormatCodeService } from './services/formatCode/formatCode.service';
import { JsQrService } from './services/scan-service/jsQr.service';
import { ScanService } from './services/scan-service/scan.service';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    ScanComponent,
    HomeComponent,
    DetailComponent,
    GenerateQrCodeComponent,
    LongPressDirective,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    QRCodeModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    FontAwesomeModule
  ],
  providers: [
    { provide: ScanService, useClass: JsQrService },
    DataService,
    FormatCodeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
