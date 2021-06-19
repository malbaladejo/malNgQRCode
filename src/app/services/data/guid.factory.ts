import { GuidService } from './guid.service';
import { GuidServiceMock } from './guid.mock.service';
import { environment } from 'src/environments/environment';

export const guidServiceFactory = () => {
    return environment.production ?
        new GuidService() :
        new GuidServiceMock();
};
