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

import { ServicePolicyServicePolicy } from '../models/service-policy-service-policy';
import { ServicePolicyServicePolicyAmbr } from '../models/service-policy-service-policy-ambr';

@Injectable({
  providedIn: 'root',
})
export class ServicePolicyServicePolicyService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getServicePolicyServicePolicy
   */
  static readonly GetServicePolicyServicePolicyPath = '/aether/v2.1.0/{target}/service-policy/service-policy/{id}';

  /**
   * GET /service-policy/service-policy Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getServicePolicyServicePolicy()` instead.
   *
   * This method doesn't expect any request body.
   */
  getServicePolicyServicePolicy$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<ServicePolicyServicePolicy>> {

    const rb = new RequestBuilder(this.rootUrl, ServicePolicyServicePolicyService.GetServicePolicyServicePolicyPath, 'get');
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
        return r as StrictHttpResponse<ServicePolicyServicePolicy>;
      })
    );
  }

  /**
   * GET /service-policy/service-policy Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getServicePolicyServicePolicy$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getServicePolicyServicePolicy(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<ServicePolicyServicePolicy> {

    return this.getServicePolicyServicePolicy$Response(params).pipe(
      map((r: StrictHttpResponse<ServicePolicyServicePolicy>) => r.body as ServicePolicyServicePolicy)
    );
  }

  /**
   * Path part for operation getServicePolicyServicePolicyAmbr
   */
  static readonly GetServicePolicyServicePolicyAmbrPath = '/aether/v2.1.0/{target}/service-policy/service-policy/{id}/ambr';

  /**
   * GET /service-policy/service-policy/{id}/ambr Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getServicePolicyServicePolicyAmbr()` instead.
   *
   * This method doesn't expect any request body.
   */
  getServicePolicyServicePolicyAmbr$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<ServicePolicyServicePolicyAmbr>> {

    const rb = new RequestBuilder(this.rootUrl, ServicePolicyServicePolicyService.GetServicePolicyServicePolicyAmbrPath, 'get');
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
        return r as StrictHttpResponse<ServicePolicyServicePolicyAmbr>;
      })
    );
  }

  /**
   * GET /service-policy/service-policy/{id}/ambr Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getServicePolicyServicePolicyAmbr$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getServicePolicyServicePolicyAmbr(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<ServicePolicyServicePolicyAmbr> {

    return this.getServicePolicyServicePolicyAmbr$Response(params).pipe(
      map((r: StrictHttpResponse<ServicePolicyServicePolicyAmbr>) => r.body as ServicePolicyServicePolicyAmbr)
    );
  }

}
