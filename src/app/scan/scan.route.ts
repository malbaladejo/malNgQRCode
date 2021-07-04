import { Route } from '@angular/router';
import { ScanComponent } from './scan.component';

export class ScanRoute {
    private static route = 'scan';

    public static getRoute(): Route {
        return { path: ScanRoute.route, component: ScanComponent } as Route;
    }

    public static getUrl(): any[] {
        return [ScanRoute.route];
    }
}
