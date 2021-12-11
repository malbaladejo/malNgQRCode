import { Route } from '@angular/router';
import { ScanQrCodeComponent } from './scan-qrcode.component';

export class ScanQrCodeRoute {
    private static route = 'scan-qr-code';

    public static getRoute(): Route {
        return { path: ScanQrCodeRoute.route, component: ScanQrCodeComponent } as Route;
    }

    public static getUrl(): any[] {
        return [ScanQrCodeRoute.route];
    }
}
