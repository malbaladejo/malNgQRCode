import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScanService } from './services/scan-service/scan.service';
import { ScanComponent } from './scan/scan.component';
import { HomeComponent } from './home/home.component';
import { JsQrService } from './services/scan-service/jsQr.service';

@NgModule({
  declarations: [
    AppComponent,
    ScanComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [{
    provide: ScanService, useClass: JsQrService
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
