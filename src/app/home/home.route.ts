import { HomeComponent } from './home.component';
import { Route } from '@angular/router';

export class HomeRoute {
    private static route = '';

    public static getRoute(): Route {
        return { path: HomeRoute.route, component: HomeComponent } as Route;
    }

    public static getUrl(): any[] {
        return [HomeRoute.route];
    }
}
