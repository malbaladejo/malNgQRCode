import { ActivatedRoute, Router } from '@angular/router';

import { Injectable } from '@angular/core';
import { NavigationToken } from './navigation.token';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NavigateService {

  constructor(private router: Router) { }

  navigate(token: NavigationToken): void {
    if (token.getExtras() != null) {
      this.router.navigate(token.getUrl(), token.getExtras());
    }
    else {

      this.router.navigate(token.getUrl());
    }
  }
}
