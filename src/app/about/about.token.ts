import { AboutComponent } from './about.component';
import { NavigationToken } from '../routesModule/navigation.token';
import { Route } from '@angular/router';

export class AboutToken extends NavigationToken {
    private static route = 'about';

    constructor() {
        super();
    }

    static getRoute(): Route {
        return { path: AboutToken.route, component: AboutComponent } as Route;
    }

    getUrl(): any[] {
        return [AboutToken.route];
    }
}
