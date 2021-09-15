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

import { ServiceGroupServiceGroupServicePolicies } from '../models/service-group-service-group-service-policies';

@Injectable({
  providedIn: 'root',
})
export class ServiceGroupServiceGroupServicePoliciesService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getServiceGroupServiceGroupServicePolicies
   */
  static readonly GetServiceGroupServiceGroupServicePoliciesPath = '/aether/v2.1.0/{target}/service-group/service-group/{id}/service-policies/{service-policy}';

  /**
   * GET /service-group/service-group/{id}/service-policies Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getServiceGroupServiceGroupServicePolicies()` instead.
   *
   * This method doesn't expect any request body.
   */
  getServiceGroupServiceGroupServicePolicies$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {service-policy}
     */
    'service-policy': any;
  }): Observable<StrictHttpResponse<ServiceGroupServiceGroupServicePolicies>> {

    const rb = new RequestBuilder(this.rootUrl, ServiceGroupServiceGroupServicePoliciesService.GetServiceGroupServiceGroupServicePoliciesPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
      rb.path('service-policy', params['service-policy'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ServiceGroupServiceGroupServicePolicies>;
      })
    );
  }

  /**
   * GET /service-group/service-group/{id}/service-policies Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getServiceGroupServiceGroupServicePolicies$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getServiceGroupServiceGroupServicePolicies(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {service-policy}
     */
    'service-policy': any;
  }): Observable<ServiceGroupServiceGroupServicePolicies> {

    return this.getServiceGroupServiceGroupServicePolicies$Response(params).pipe(
      map((r: StrictHttpResponse<ServiceGroupServiceGroupServicePolicies>) => r.body as ServiceGroupServiceGroupServicePolicies)
    );
  }

}
