import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScanComponent } from './scan/scan.component';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { GenerateQrCodeComponent } from './generate-qr-code/generate-qr-code.component';
import { AboutComponent } from './about/about.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'scan', component: ScanComponent },
  { path: 'generate', component: GenerateQrCodeComponent },
  { path: 'detail/:id', component: DetailComponent },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
