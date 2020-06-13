import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faIndustry, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public faIndustry = faIndustry;
  public faQuestionCircle = faQuestionCircle;
  isSideNavOpened = false;

  constructor(private router: Router) {
  }

  toggleSideNav() {
    this.isSideNavOpened = !this.isSideNavOpened;
  }

  navigateTo() {
    this.isSideNavOpened = false;
  }
}
