import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CodeComponent } from './code/code.component';
import { CodeIconComponent } from './code-icon/code-icon.component';
import { DataBaseService } from './services/data/dataBase.service';
import { DataService } from './services/data/data.service';
import { DetailComponent } from './detail/detail.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormatCodeService } from './services/formatCode/formatCode.service';
import { FormsModule } from '@angular/forms';
import { GenerateQrCodeComponent } from './generate-qr-code/generate-qr-code.component';
import { GuidService } from './services/data/guid.service';
import { HomeComponent } from './home/home.component';
import { JsQrService } from './services/scan-service/jsQr.service';
import { LongPressDirective } from './directives/long-press.directive';
import { MaterialModule } from './material/material.module';
import { NgModule } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';
import { ScanComponent } from './scan/scan.component';
import { ScanService } from './services/scan-service/scan.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { dataBaseServiceFactory } from './services/data/dataBase.factory';
import { environment } from '../environments/environment';
import { guidServiceFactory } from './services/data/guid.factory';
import { CodeTypeLabelPipe } from './code-type-label.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ScanComponent,
    HomeComponent,
    DetailComponent,
    GenerateQrCodeComponent,
    LongPressDirective,
    AboutComponent,
    CodeComponent,
    CodeIconComponent,
    CodeTypeLabelPipe
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
