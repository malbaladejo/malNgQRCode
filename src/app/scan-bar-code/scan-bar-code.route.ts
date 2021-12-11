import { Route } from '@angular/router';
import { ScanBarcodeComponent } from './scan-bar-code.component';

export class ScanBarcodeRoute {
  private static route = 'scan-barcode';

  public static getRoute(): Route {
    return { path: ScanBarcodeRoute.route, component: ScanBarcodeComponent } as Route;
  }

  public static getUrl(): any[] {
    return [ScanBarcodeRoute.route];
  }
}
