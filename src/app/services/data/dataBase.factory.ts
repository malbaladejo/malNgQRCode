import { DataBaseService } from './dataBase.service';
import { DataBaseServiceMock } from './dataBase.mock.service';
import { GuidService } from './guid.service';
import { environment } from "src/environments/environment";

export const dataBaseServiceFactory = {
    instance: (guidService: GuidService) => {
        return environment.production ?
            new DataBaseService() :
            new DataBaseServiceMock(guidService);
    },

    dependencies: [GuidService]
};
