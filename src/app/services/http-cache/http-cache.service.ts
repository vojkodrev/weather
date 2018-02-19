import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

export class HttpCacheItem {
  constructor(public  time: number, public response: HttpResponse<any>) {}
}

@Injectable()
export class HttpCacheService {

  public cache: {[url: string]: HttpCacheItem} = {}

  constructor() { }
}
