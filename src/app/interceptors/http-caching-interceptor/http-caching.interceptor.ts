import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { of } from 'rxjs/observable/of';
import { List } from 'linqts';

export class CacheItem {
  constructor(public  time: number, public response: HttpResponse<any>) {}
}

@Injectable()
export class HttpCachingInterceptor implements HttpInterceptor {
  
  cache: {[url: string]: CacheItem} = {};
  timeLimit: number = 60000;

  // constructor() {
  //   setInterval(() => {
  //     console.log("cache", this.cache);
  //   }, 5000);
  // }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let keys = new List(Object.keys(this.cache));
    if (keys.Count() > 20) {
      keys.Take(keys.Count() - 20).ForEach(i => delete this.cache[i]);
    }

    if (req.method != "GET")
      return next.handle(req);

    console.log('intercepted request:', req);

    let cached = this.cache[req.urlWithParams];

    if (cached && (new Date).getTime() - cached.time < this.timeLimit) {
      console.log("returning response from cache");
      return of(cached.response);
    } else {
      return next.handle(req).do(evt => {
        if (evt instanceof HttpResponse) {
          console.log('intercepted response:', evt);
          this.cache[req.urlWithParams] = new CacheItem((new Date).getTime(), evt);
        }
      });
    }
  }
}