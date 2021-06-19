import { Directive, HostListener, Input } from '@angular/core';

import { NavigateService } from './navigate.service';
import { NavigationToken } from './navigation.token';

@Directive({
  selector: ':not(a):not(area)[navigate]'
})
export class NavigateDirective {

  private token: NavigationToken | null;
  constructor(private navigateService: NavigateService) { }

  @Input()
  set navigate(token: NavigationToken) {
    this.token = token;
  }

  @HostListener('click')
  onClick(): boolean {
    if (this.token) {
      this.navigateService.navigate(this.token);
      return true;
    }

    return false;
  }
}
