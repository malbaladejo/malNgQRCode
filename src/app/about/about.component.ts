import { Component, OnInit } from '@angular/core';

import { ComponentBase } from '../shared/ComponentBase';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent extends ComponentBase implements OnInit {

  public appVersion = environment.appVersion;

  constructor() { super(); }

  ngOnInit(): void {
  }

}
