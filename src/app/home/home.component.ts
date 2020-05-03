import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data/data.service';
import { Code } from '../services/data/code';
import { faQrcode, faIndustry, faAt, faGlobe, faList, faAlignJustify, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FormattedCodeType } from '../services/formatCode/formattedCodeType';
import { MatSelectionList } from '@angular/material/list';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public faQrcode = faQrcode;
  public faIndustry = faIndustry;
  public faAt = faAt;
  public faGlobe = faGlobe;
  public faList = faList;
  public faAlignJustify = faAlignJustify;
  public faTrash = faTrash;
  public faTimes = faTimes;

  public email = FormattedCodeType.email;
  public url = FormattedCodeType.url;
  public keyValue = FormattedCodeType.keyValue;
  public raw = FormattedCodeType.raw;

  private selectedItems: Array<Code>;

  public codes: Array<Code>;

  public navigationMode = true;
  constructor(private _dataService: DataService) { }

  ngOnInit(): void {
    this.codes = this._dataService.getAllCodes();
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
    this.selectedItems.forEach(c => this._dataService.deleteCode(c.id));
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
