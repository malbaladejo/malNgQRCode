import { AboutComponent } from './about.component';
import { Route } from '@angular/router';

export class AboutRoute {
    private static route = 'about';

    public static getRoute(): Route {
        return { path: AboutRoute.route, component: AboutComponent } as Route;
    }

    public static getUrl(): any[] {
        return [AboutRoute.route];
    }
}
