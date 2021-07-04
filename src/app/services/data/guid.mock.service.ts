import { GuidService } from './guid.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GuidServiceMock extends GuidService {

    private index = 0;

    public newGuid(): string {
        this.index++;
        return `${this.index}`;
    }
}
