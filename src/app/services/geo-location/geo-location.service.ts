import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GeoLocationService {

  constructor() { }

  getLocation(): Observable<Position> {
    return new Observable(o => {
      window.navigator.geolocation.getCurrentPosition(position => {
        o.next(position);
        o.complete();
      }, (error) => {
        o.error(error);
      });
    })
  }
}

