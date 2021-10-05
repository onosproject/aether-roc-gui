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

import { ApListApListAccessPoints } from '../models/ap-list-ap-list-access-points';

@Injectable({
  providedIn: 'root',
})
export class ApListApListAccessPointsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getApListApListAccessPoints
   */
  static readonly GetApListApListAccessPointsPath = '/aether/v4.0.0/{target}/ap-list/ap-list/{id}/access-points/{address}';

  /**
   * GET /ap-list/ap-list/{id}/access-points.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getApListApListAccessPoints()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApListApListAccessPoints$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {address}
     */
    address: any;
  }): Observable<StrictHttpResponse<ApListApListAccessPoints>> {

    const rb = new RequestBuilder(this.rootUrl, ApListApListAccessPointsService.GetApListApListAccessPointsPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
      rb.path('address', params.address, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ApListApListAccessPoints>;
      })
    );
  }

  /**
   * GET /ap-list/ap-list/{id}/access-points.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getApListApListAccessPoints$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApListApListAccessPoints(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {address}
     */
    address: any;
  }): Observable<ApListApListAccessPoints> {

    return this.getApListApListAccessPoints$Response(params).pipe(
      map((r: StrictHttpResponse<ApListApListAccessPoints>) => r.body as ApListApListAccessPoints)
    );
  }

}
