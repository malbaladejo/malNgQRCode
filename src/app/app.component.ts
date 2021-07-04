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
  public isSideNavOpened = false;

  constructor() {
    super();
  }

  public toggleSideNav() {
    this.isSideNavOpened = !this.isSideNavOpened;
  }

  public navigateTo() {
    this.isSideNavOpened = false;
  }

  public generateUrl(): any[] {
    return GenerateQrCodeRoute.getUrl();
  }

  public aboutUrl(): any[] {
    return AboutRoute.getUrl();
  }

  public homeUrl(): any[] {
    return HomeRoute.getUrl();
  }
}
