import { HomeComponent } from './home.component';
import { NavigationToken } from '../routesModule/navigation.token';
import { Route } from '@angular/router';

export class HomeToken extends NavigationToken {
    private static route = '';

    constructor() {
        super();
    }

    static getRoute(): Route {
        return { path: HomeToken.route, component: HomeComponent } as Route;
    }

    getUrl(): any[] {
        return [HomeToken.route];
    }
}
