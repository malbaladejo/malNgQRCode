import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data/data.service';
import { Code } from '../services/data/code';
import { faQrcode, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';
import { MatSelectionList } from '@angular/material/list';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public faQrcode = faQrcode;
  public faTrash = faTrash;
  public faTimes = faTimes;

  private selectedItems: Array<Code>;

  public codes: Array<Code>;

  public navigationMode = true;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.codes = this.dataService.getAllCodes().sort((c1, c2) => c1.date > c2.date ? -1 : 1);
  }

  public onSelectedItemsChanged(items: MatSelectionList) {
    this.selectedItems = items.selectedOptions.selected.map(i => i.value);
  }

  public activeEditMode(code: Code) {
    this.navigationMode = false;
    this.selectedItems = new Array<Code>();
    this.selectedItems.push(code);
  }

  public deleteSelectedItems() {
    this.selectedItems.forEach(c => this.dataService.deleteCode(c.id));
    this.activeNavigationMode();
  }

  public activeNavigationMode() {
    this.navigationMode = true;
    this.selectedItems = null;
  }

  public isSelected(code: Code): boolean {
    return this.selectedItems.find(c => c.id === code.id) != null;
  }
}
