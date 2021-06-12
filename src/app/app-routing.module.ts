import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { DetailComponent } from './detail/detail.component';
import { GenerateQrCodeComponent } from './generate-qr-code/generate-qr-code.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { ScanComponent } from './scan/scan.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'scan', component: ScanComponent },
  { path: 'generate', component: GenerateQrCodeComponent },
  { path: 'detail/:id', component: DetailComponent },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
