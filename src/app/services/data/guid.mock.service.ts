import { Injectable } from "@angular/core";
import { GuidService } from "./guid.service";

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
