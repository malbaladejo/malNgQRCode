import { NavigationToken } from '../routesModule/navigation.token';
import { Route } from '@angular/router';
import { ScanComponent } from './scan.component';

export class ScanToken extends NavigationToken {
    private static route = 'scan';

    constructor() {
        super();
    }

    static getRoute(): Route {
        return { path: ScanToken.route, component: ScanComponent } as Route;
    }

    getUrl(): any[] {
        return [ScanToken.route];
    }
}
