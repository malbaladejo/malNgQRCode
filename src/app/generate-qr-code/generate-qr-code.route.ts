import { GenerateQrCodeComponent } from './generate-qr-code.component';
import { Route } from '@angular/router';

export class GenerateQrCodeRoute {
    public static route = 'generate';

    public static getRoute(): Route {
        return { path: GenerateQrCodeRoute.route, component: GenerateQrCodeComponent } as Route;
    }

    public static getUrl(): any[] {
        return [GenerateQrCodeRoute.route];
    }
}


