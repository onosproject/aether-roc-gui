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

import { EnterprisesEnterpriseConnectivityService } from '../models/enterprises-enterprise-connectivity-service';

@Injectable({
  providedIn: 'root',
})
export class EnterprisesEnterpriseConnectivityServiceService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getEnterprisesEnterpriseConnectivityService
   */
  static readonly GetEnterprisesEnterpriseConnectivityServicePath = '/aether/v2.0.0/{target}/enterprises/enterprise/{enterprise-id}/connectivity-service/{connectivity-service}';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/connectivity-service.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseConnectivityService()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseConnectivityService$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {connectivity-service}
     */
    'connectivity-service': any;
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseConnectivityService>> {

    const rb = new RequestBuilder(this.rootUrl, EnterprisesEnterpriseConnectivityServiceService.GetEnterprisesEnterpriseConnectivityServicePath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('connectivity-service', params['connectivity-service'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterprisesEnterpriseConnectivityService>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/connectivity-service.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseConnectivityService$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseConnectivityService(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {connectivity-service}
     */
    'connectivity-service': any;
  }): Observable<EnterprisesEnterpriseConnectivityService> {

    return this.getEnterprisesEnterpriseConnectivityService$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseConnectivityService>) => r.body as EnterprisesEnterpriseConnectivityService)
    );
  }

}
