import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class ScanService {

  constructor() { }

  public abstract start(): Observable<string>;

  public abstract stop();

}
