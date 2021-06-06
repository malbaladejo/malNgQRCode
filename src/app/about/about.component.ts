import { Component, OnInit } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faUser, faArchive } from '@fortawesome/free-solid-svg-icons';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  public faGithub = faGithub;
  public faUser = faUser;
  public faArchive = faArchive;

  public appVersion = environment.appVersion;

  constructor() { }

  ngOnInit(): void {
  }

}
