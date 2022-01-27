// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { ConnectivityServiceConnectivityService } from '../models/connectivity-service-connectivity-service';

@Injectable({
  providedIn: 'root',
})
export class ConnectivityServiceConnectivityServiceService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getConnectivityServiceConnectivityService
   */
  static readonly GetConnectivityServiceConnectivityServicePath = '/aether/v2.0.0/{target}/connectivity-services/connectivity-service/{id}';

  /**
   * GET /connectivity-service/connectivity-service.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getConnectivityServiceConnectivityService()` instead.
   *
   * This method doesn't expect any request body.
   */
  getConnectivityServiceConnectivityService$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<ConnectivityServiceConnectivityService>> {

    const rb = new RequestBuilder(this.rootUrl, ConnectivityServiceConnectivityServiceService.GetConnectivityServiceConnectivityServicePath, 'get');
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
        return r as StrictHttpResponse<ConnectivityServiceConnectivityService>;
      })
    );
  }

  /**
   * GET /connectivity-service/connectivity-service.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getConnectivityServiceConnectivityService$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getConnectivityServiceConnectivityService(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<ConnectivityServiceConnectivityService> {

    return this.getConnectivityServiceConnectivityService$Response(params).pipe(
      map((r: StrictHttpResponse<ConnectivityServiceConnectivityService>) => r.body as ConnectivityServiceConnectivityService)
    );
  }

}
