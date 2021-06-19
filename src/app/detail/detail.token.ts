import { ParamMap, Route } from '@angular/router';
import { NavigationToken } from '../routesModule/navigation.token';
import { DetailComponent } from './detail.component';
import { DetailParam } from './detail.param';

export class DetailToken extends NavigationToken {
    private static route = 'detail';
    private static param = 'id';

    constructor(public id: string) {
        super();
    }

    static getRoute(): Route {
        return { path: `${DetailToken.route}/:${DetailToken.param}`, component: DetailComponent } as Route;
    }

    static getParam(paramMap: ParamMap): DetailParam {
        return {
            id: paramMap.get(DetailToken.param)
        };
    }

    getUrl(): any[] {
        return [`${DetailToken.route}/${this.id}`];
    }
}
