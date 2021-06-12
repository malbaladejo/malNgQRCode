import { Component, OnInit } from '@angular/core';

import { CodeAction } from '../services/data/codeAction';
import { DataService } from '../services/data/data.service';
import { Router } from '@angular/router';
import { faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-generate-qr-code',
  templateUrl: './generate-qr-code.component.html',
  styleUrls: ['./generate-qr-code.component.scss']
})
export class GenerateQrCodeComponent implements OnInit {
  public faSave = faSave;
  public value: string;
  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
  }

  save() {
    this.dataService.saveCode(this.value, CodeAction.Generate);
    this.router.navigate(['']);
  }
}
