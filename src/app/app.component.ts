import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isSideNavOpened = false;

  constructor(private router: Router) {
  }

  toggleSideNav() {
    this.isSideNavOpened = !this.isSideNavOpened;
  }

  navigateToMenuItem(menuItem) {
    this.isSideNavOpened = false;
    this.router.navigate([menuItem.url]);
  }
}
