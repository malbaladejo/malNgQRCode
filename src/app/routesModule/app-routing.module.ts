import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutToken } from '../about/about.token';
import { DetailToken } from '../detail/detail.token';
import { GenerateQrCodeEditToken } from '../generate-qr-code/generate-qr-code-edit.token';
import { GenerateQrCodeToken } from '../generate-qr-code/generate-qr-code.token';
import { HomeToken } from '../home/home.token';
import { ScanToken } from '../scan/scan.token';

const routes: Routes = [
  HomeToken.getRoute(),
  ScanToken.getRoute(),
  GenerateQrCodeToken.getRoute(),
  GenerateQrCodeEditToken.getRoute(),
  DetailToken.getRoute(),
  AboutToken.getRoute()
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
