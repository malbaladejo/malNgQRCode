import { NavigationExtras, ParamMap } from '@angular/router';

export abstract class NavigationToken {
    getUrl(): any[] {
        return [];
    }

    getExtras(): NavigationExtras {
        return null;
    }
}
