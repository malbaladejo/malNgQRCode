import { ActivatedRoute, ParamMap, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DetailComponent } from './detail.component';
import { DetailParam } from './detail.param';

export class DetailRoute {
    private static route = 'detail';
    private static param = 'id';

    public static getRoute(): Route {
        return { path: `${DetailRoute.route}/:${DetailRoute.param}`, component: DetailComponent } as Route;
    }

    public static getParam(route: ActivatedRoute): Observable<DetailParam> {
        return route.paramMap.pipe(
            map(params => DetailRoute.extractParam(params)));
    }

    private static extractParam(paramMap: ParamMap): DetailParam {
        return {
            id: paramMap.get(DetailRoute.param)
        };
    }

    public static getUrl(id: string): any[] {
        return [`${DetailRoute.route}/${id}`];
    }
}
