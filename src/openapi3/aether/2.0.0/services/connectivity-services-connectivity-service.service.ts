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

import { ConnectivityServicesConnectivityService } from '../models/connectivity-services-connectivity-service';

@Injectable({
  providedIn: 'root',
})
export class ConnectivityServicesConnectivityServiceService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getConnectivityServicesConnectivityService
   */
  static readonly GetConnectivityServicesConnectivityServicePath = '/aether/v2.0.0/{target}/connectivity-services/connectivity-service/{connectivity-service-id}';

  /**
   * GET /connectivity-services/connectivity-service.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getConnectivityServicesConnectivityService()` instead.
   *
   * This method doesn't expect any request body.
   */
  getConnectivityServicesConnectivityService$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {connectivity-service-id}
     */
    'connectivity-service-id': any;
  }): Observable<StrictHttpResponse<ConnectivityServicesConnectivityService>> {

    const rb = new RequestBuilder(this.rootUrl, ConnectivityServicesConnectivityServiceService.GetConnectivityServicesConnectivityServicePath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('connectivity-service-id', params['connectivity-service-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ConnectivityServicesConnectivityService>;
      })
    );
  }

  /**
   * GET /connectivity-services/connectivity-service.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getConnectivityServicesConnectivityService$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getConnectivityServicesConnectivityService(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {connectivity-service-id}
     */
    'connectivity-service-id': any;
  }): Observable<ConnectivityServicesConnectivityService> {

    return this.getConnectivityServicesConnectivityService$Response(params).pipe(
      map((r: StrictHttpResponse<ConnectivityServicesConnectivityService>) => r.body as ConnectivityServicesConnectivityService)
    );
  }

}
