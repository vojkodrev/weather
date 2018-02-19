import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { of } from 'rxjs/observable/of';
import { List } from 'linqts';
import { HttpCacheService, HttpCacheItem } from '../../services/http-cache/http-cache.service';

@Injectable()
export class HttpCachingInterceptor implements HttpInterceptor {

  constructor(private httpCacheService: HttpCacheService) {
    // setInterval(() => {
    //   console.log("cache", httpCacheService);
    // }, 5000);

    if (!localStorage.cacheInvalidationTime)
      localStorage.cacheInvalidationTime = 600000;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(1);
    let keys = new List(Object.keys(this.httpCacheService.cache));
    if (keys.Count() > 20) {
      keys.Take(keys.Count() - 20).ForEach(i => delete this.httpCacheService.cache[i]);
    }

    console.log(2);

    if (req.method != "GET")
      return next.handle(req);

    console.log(3);

    // console.log('intercepted request:', req);

    let cached = this.httpCacheService.cache[req.urlWithParams];

    console.log(4);

    let currentTime = (new Date).getTime();
    let cachedTime = cached.time;
    let cacheInvalidationTime = parseInt(localStorage.cacheInvalidationTime);

    console.log("cached", cached, "current time", currentTime, "cached time", cachedTime, "cache invalidation time", cacheInvalidationTime);

    if (cached && (currentTime - cachedTime) < cacheInvalidationTime) {
      // console.log("returning response from cache");
      return of(cached.response);
    } else {
      return next.handle(req).do(evt => {
        if (evt instanceof HttpResponse) {
          // console.log('intercepted response:', evt);
          this.httpCacheService.cache[req.urlWithParams] = new HttpCacheItem((new Date).getTime(), evt);
        }
      });
    }
  }
}