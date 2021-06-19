import { ParamMap, Route } from '@angular/router';
import { NavigationToken } from '../routesModule/navigation.token';
import { GenerateQrCodeComponent } from './generate-qr-code.component';
import { GenerateQrCodeToken } from './generate-qr-code.token';
import { GenerateQrCodeParam } from './generate.param';

export class GenerateQrCodeEditToken extends NavigationToken {
    private static param = 'id';

    constructor(public id: string) {
        super();
    }

    static getRoute(): Route {
        return { path: `${GenerateQrCodeToken.route}/:${GenerateQrCodeEditToken.param}`, component: GenerateQrCodeComponent } as Route;
    }

    static getParam(paramMap: ParamMap): GenerateQrCodeParam {
        return {
            id: paramMap.get(GenerateQrCodeEditToken.param)
        };
    }

    getUrl(): any[] {
        return [`${GenerateQrCodeToken.route}/${this.id}`];
    }
}
