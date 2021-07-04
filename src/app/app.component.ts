import { AboutRoute } from './about/about.route';
import { Component } from '@angular/core';
import { ComponentBase } from './shared/ComponentBase';
import { GenerateQrCodeRoute } from './generate-qr-code/generate-qr-code.route';
import { HomeRoute } from './home/home.route';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends ComponentBase {
  isSideNavOpened = false;

  constructor() {
    super();
  }

  toggleSideNav() {
    this.isSideNavOpened = !this.isSideNavOpened;
  }

  navigateTo() {
    this.isSideNavOpened = false;
  }

  generateUrl(): any[] {
    return GenerateQrCodeRoute.getUrl();
  }

  aboutUrl(): any[] {
    return AboutRoute.getUrl();
  }

  homeUrl(): any[] {
    return HomeRoute.getUrl();
  }
}
