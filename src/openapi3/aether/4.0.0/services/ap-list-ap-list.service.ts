// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { ApListApList } from '../models/ap-list-ap-list';

@Injectable({
  providedIn: 'root',
})
export class ApListApListService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getApListApList
   */
  static readonly GetApListApListPath = '/aether/v4.0.0/{target}/ap-list/ap-list/{id}';

  /**
   * GET /ap-list/ap-list.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getApListApList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApListApList$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<ApListApList>> {

    const rb = new RequestBuilder(this.rootUrl, ApListApListService.GetApListApListPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ApListApList>;
      })
    );
  }

  /**
   * GET /ap-list/ap-list.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getApListApList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApListApList(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<ApListApList> {

    return this.getApListApList$Response(params).pipe(
      map((r: StrictHttpResponse<ApListApList>) => r.body as ApListApList)
    );
  }

}
