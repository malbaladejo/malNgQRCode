import { GenerateQrCodeComponent } from './generate-qr-code.component';
import { NavigationToken } from '../routesModule/navigation.token';
import { Route } from '@angular/router';

export class GenerateQrCodeToken extends NavigationToken {
    public static route = 'generate';

    constructor() {
        super();
    }

    static getRoute(): Route {
        return { path: GenerateQrCodeToken.route, component: GenerateQrCodeComponent } as Route;
    }

    getUrl(): any[] {
        return [GenerateQrCodeToken.route];
    }
}


