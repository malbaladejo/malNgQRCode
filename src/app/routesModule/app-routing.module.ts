import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutRoute } from '../about/about.route';
import { DetailRoute } from '../detail/detail.route';
import { GenerateQrCodeEditTokenRoute } from '../generate-qr-code/generate-qr-code-edit.route';
import { GenerateQrCodeRoute } from '../generate-qr-code/generate-qr-code.route';
import { HomeRoute } from '../home/home.route';
import { ScanRoute } from '../scan/scan.route';

const routes: Routes = [
  HomeRoute.getRoute(),
  ScanRoute.getRoute(),
  GenerateQrCodeRoute.getRoute(),
  GenerateQrCodeEditTokenRoute.getRoute(),
  DetailRoute.getRoute(),
  AboutRoute.getRoute()
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
