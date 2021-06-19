import { AboutToken } from './about/about.token';
import { Component } from '@angular/core';
import { ComponentBase } from './shared/ComponentBase';
import { GenerateQrCodeToken } from './generate-qr-code/generate-qr-code.token';
import { HomeToken } from './home/home.token';
import { NavigationToken } from './routesModule/navigation.token';

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

  generateToken(): NavigationToken {
    return new GenerateQrCodeToken();
  }

  aboutToken(): NavigationToken {
    return new AboutToken();
  }

  homeToken(): NavigationToken {
    return new HomeToken();
  }
}
