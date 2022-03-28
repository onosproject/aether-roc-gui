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

import { EnterprisesEnterpriseApplicationEndpoint } from '../models/enterprises-enterprise-application-endpoint';
import { EnterprisesEnterpriseApplicationEndpointList } from '../models/enterprises-enterprise-application-endpoint-list';
import { EnterprisesEnterpriseApplicationEndpointMbr } from '../models/enterprises-enterprise-application-endpoint-mbr';

@Injectable({
  providedIn: 'root',
})
export class EnterprisesEnterpriseApplicationEndpointService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getEnterprisesEnterpriseApplicationEndpointList
   */
  static readonly GetEnterprisesEnterpriseApplicationEndpointListPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/application/{application-id}/endpoint';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/application/{application-id}/endpoint List.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseApplicationEndpointList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseApplicationEndpointList$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {application-id}
     */
    'application-id': any;
  }): Observable<StrictHttpResponse<Array<EnterprisesEnterpriseApplicationEndpointList>>> {

    const rb = new RequestBuilder(this.rootUrl, EnterprisesEnterpriseApplicationEndpointService.GetEnterprisesEnterpriseApplicationEndpointListPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('application-id', params['application-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<EnterprisesEnterpriseApplicationEndpointList>>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/application/{application-id}/endpoint List.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseApplicationEndpointList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseApplicationEndpointList(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {application-id}
     */
    'application-id': any;
  }): Observable<Array<EnterprisesEnterpriseApplicationEndpointList>> {

    return this.getEnterprisesEnterpriseApplicationEndpointList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<EnterprisesEnterpriseApplicationEndpointList>>) => r.body as Array<EnterprisesEnterpriseApplicationEndpointList>)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseApplicationEndpoint
   */
  static readonly GetEnterprisesEnterpriseApplicationEndpointPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/application/{application-id}/endpoint/{endpoint-id}';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/application/{application-id}/endpoint Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseApplicationEndpoint()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseApplicationEndpoint$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {application-id}
     */
    'application-id': any;

    /**
     * key {endpoint-id}
     */
    'endpoint-id': any;
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseApplicationEndpoint>> {

    const rb = new RequestBuilder(this.rootUrl, EnterprisesEnterpriseApplicationEndpointService.GetEnterprisesEnterpriseApplicationEndpointPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('application-id', params['application-id'], {});
      rb.path('endpoint-id', params['endpoint-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterprisesEnterpriseApplicationEndpoint>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/application/{application-id}/endpoint Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseApplicationEndpoint$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseApplicationEndpoint(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {application-id}
     */
    'application-id': any;

    /**
     * key {endpoint-id}
     */
    'endpoint-id': any;
  }): Observable<EnterprisesEnterpriseApplicationEndpoint> {

    return this.getEnterprisesEnterpriseApplicationEndpoint$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseApplicationEndpoint>) => r.body as EnterprisesEnterpriseApplicationEndpoint)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseApplicationEndpointMbr
   */
  static readonly GetEnterprisesEnterpriseApplicationEndpointMbrPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/application/{application-id}/endpoint/{endpoint-id}/mbr';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/application/{application-id}/endpoint/{endpoint-id}/mbr Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseApplicationEndpointMbr()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseApplicationEndpointMbr$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {application-id}
     */
    'application-id': any;

    /**
     * key {endpoint-id}
     */
    'endpoint-id': any;
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseApplicationEndpointMbr>> {

    const rb = new RequestBuilder(this.rootUrl, EnterprisesEnterpriseApplicationEndpointService.GetEnterprisesEnterpriseApplicationEndpointMbrPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('application-id', params['application-id'], {});
      rb.path('endpoint-id', params['endpoint-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterprisesEnterpriseApplicationEndpointMbr>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/application/{application-id}/endpoint/{endpoint-id}/mbr Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseApplicationEndpointMbr$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseApplicationEndpointMbr(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {application-id}
     */
    'application-id': any;

    /**
     * key {endpoint-id}
     */
    'endpoint-id': any;
  }): Observable<EnterprisesEnterpriseApplicationEndpointMbr> {

    return this.getEnterprisesEnterpriseApplicationEndpointMbr$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseApplicationEndpointMbr>) => r.body as EnterprisesEnterpriseApplicationEndpointMbr)
    );
  }

}
