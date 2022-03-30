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
import { EnterprisesEnterpriseConnectivityServiceList } from '../models/enterprises-enterprise-connectivity-service-list';

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
   * Path part for operation getEnterprisesEnterpriseConnectivityServiceList
   */
  static readonly GetEnterprisesEnterpriseConnectivityServiceListPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/connectivity-service';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/connectivity-service List.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseConnectivityServiceList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseConnectivityServiceList$Response(params: {

    /**
<<<<<<< HEAD
     * target (device in onos-config)
=======
     * target (target in onos-config)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;
<<<<<<< HEAD
  }): Observable<StrictHttpResponse<Array<EnterprisesEnterpriseConnectivityServiceList>>> {
=======
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseConnectivityServiceList>> {
>>>>>>> e357b5d... Aether-3394 handle null values in responses

    const rb = new RequestBuilder(this.rootUrl, EnterprisesEnterpriseConnectivityServiceService.GetEnterprisesEnterpriseConnectivityServiceListPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
<<<<<<< HEAD
        return r as StrictHttpResponse<Array<EnterprisesEnterpriseConnectivityServiceList>>;
=======
        return r as StrictHttpResponse<EnterprisesEnterpriseConnectivityServiceList>;
>>>>>>> e357b5d... Aether-3394 handle null values in responses
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/connectivity-service List.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseConnectivityServiceList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseConnectivityServiceList(params: {

    /**
<<<<<<< HEAD
     * target (device in onos-config)
=======
     * target (target in onos-config)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;
<<<<<<< HEAD
  }): Observable<Array<EnterprisesEnterpriseConnectivityServiceList>> {

    return this.getEnterprisesEnterpriseConnectivityServiceList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<EnterprisesEnterpriseConnectivityServiceList>>) => r.body as Array<EnterprisesEnterpriseConnectivityServiceList>)
=======
  }): Observable<EnterprisesEnterpriseConnectivityServiceList> {

    return this.getEnterprisesEnterpriseConnectivityServiceList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseConnectivityServiceList>) => r.body as EnterprisesEnterpriseConnectivityServiceList)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseConnectivityService
   */
  static readonly GetEnterprisesEnterpriseConnectivityServicePath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/connectivity-service/{connectivity-service}';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/connectivity-service Container.
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
     * target (target in onos-config)
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
   * GET /enterprises/enterprise/{enterprise-id}/connectivity-service Container.
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
     * target (target in onos-config)
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
