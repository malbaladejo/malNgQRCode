import { ActivatedRoute, ParamMap, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GenerateQrCodeComponent } from './generate-qr-code.component';
import { GenerateQrCodeRoute } from './generate-qr-code.route';
import { GenerateQrCodeParam } from './generate.param';

export class GenerateQrCodeEditTokenRoute {
    private static param = 'id';

    public static getRoute(): Route {
        return { path: `${GenerateQrCodeRoute.route}/:${GenerateQrCodeEditTokenRoute.param}`, component: GenerateQrCodeComponent } as Route;
    }

    public static getParam(route: ActivatedRoute): Observable<GenerateQrCodeParam> {
        return route.paramMap.pipe(
            map(params => GenerateQrCodeEditTokenRoute.extractParam(params)));
    }

    private static extractParam(paramMap: ParamMap): GenerateQrCodeParam {
        return {
            id: paramMap.get(GenerateQrCodeEditTokenRoute.param)
        };
    }

    public static getUrl(id: string): any[] {
        return [`/${GenerateQrCodeRoute.route}/${id}`];
    }
}
