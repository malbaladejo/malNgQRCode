import { GuidService } from './guid.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GuidServiceMock extends GuidService {

    private index = 0;

    newGuid(): string {
        this.index++;
        return `${this.index}`;
    }
}
