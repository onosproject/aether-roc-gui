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

import { EnterpriseEnterpriseConnectivityService } from '../models/enterprise-enterprise-connectivity-service';

@Injectable({
  providedIn: 'root',
})
export class EnterpriseEnterpriseConnectivityServiceService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getEnterpriseEnterpriseConnectivityService
   */
  static readonly GetEnterpriseEnterpriseConnectivityServicePath = '/aether/v4.0.0/{target}/enterprise/enterprise/{id}/connectivity-service/{connectivity-service}';

  /**
   * GET /enterprise/enterprise/{id}/connectivity-service.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterpriseEnterpriseConnectivityService()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterpriseEnterpriseConnectivityService$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {connectivity-service}
     */
    'connectivity-service': any;
  }): Observable<StrictHttpResponse<EnterpriseEnterpriseConnectivityService>> {

    const rb = new RequestBuilder(this.rootUrl, EnterpriseEnterpriseConnectivityServiceService.GetEnterpriseEnterpriseConnectivityServicePath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
      rb.path('connectivity-service', params['connectivity-service'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterpriseEnterpriseConnectivityService>;
      })
    );
  }

  /**
   * GET /enterprise/enterprise/{id}/connectivity-service.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterpriseEnterpriseConnectivityService$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterpriseEnterpriseConnectivityService(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {connectivity-service}
     */
    'connectivity-service': any;
  }): Observable<EnterpriseEnterpriseConnectivityService> {

    return this.getEnterpriseEnterpriseConnectivityService$Response(params).pipe(
      map((r: StrictHttpResponse<EnterpriseEnterpriseConnectivityService>) => r.body as EnterpriseEnterpriseConnectivityService)
    );
  }

}
