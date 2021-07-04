import { Component, OnInit } from '@angular/core';

import { Code } from '../services/data/code';
import { ComponentBase } from '../shared/ComponentBase';
import { DataService } from '../services/data/data.service';
import { MatSelectionList } from '@angular/material/list';
import { DetailRoute } from '../detail/detail.route';
import { ScanRoute } from '../scan/scan.route';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends ComponentBase implements OnInit {

  private selectedItems: Array<Code>;

  public codes: Array<Code>;

  public navigationMode = true;
  constructor(private dataService: DataService) {
    super();
  }

  ngOnInit(): void {
    this.codes = this.dataService.getAllCodes().sort((c1, c2) => c1.date > c2.date ? -1 : 1);
  }

  public detailToken(code: Code): any[] {
    return DetailRoute.getUrl(code.id);
  }

  scanToken(): any[] {
    return ScanRoute.getUrl();
  }

  onSelectedItemsChanged(items: MatSelectionList): void {
    this.selectedItems = items.selectedOptions.selected.map(i => i.value);
  }

  activeEditMode(): void {
    this.navigationMode = false;
    this.selectedItems = new Array<Code>();
  }

  public deleteSelectedItems(): void {
    this.selectedItems.forEach(c => this.dataService.deleteCode(c.id));
    this.activeNavigationMode();
  }

  activeNavigationMode(): void {
    this.navigationMode = true;
    this.selectedItems = null;
  }

  isSelected(code: Code): boolean {
    return this.selectedItems.find(c => c.id === code.id) != null;
  }
}
