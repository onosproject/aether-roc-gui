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

import { ServiceRuleServiceRule } from '../models/service-rule-service-rule';
import { ServiceRuleServiceRuleFlow } from '../models/service-rule-service-rule-flow';
import { ServiceRuleServiceRuleQos } from '../models/service-rule-service-rule-qos';

@Injectable({
  providedIn: 'root',
})
export class ServiceRuleServiceRuleService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getServiceRuleServiceRule
   */
  static readonly GetServiceRuleServiceRulePath = '/aether/v2.1.0/{target}/service-rule/service-rule/{id}';

  /**
   * GET /service-rule/service-rule Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getServiceRuleServiceRule()` instead.
   *
   * This method doesn't expect any request body.
   */
  getServiceRuleServiceRule$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<ServiceRuleServiceRule>> {

    const rb = new RequestBuilder(this.rootUrl, ServiceRuleServiceRuleService.GetServiceRuleServiceRulePath, 'get');
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
        return r as StrictHttpResponse<ServiceRuleServiceRule>;
      })
    );
  }

  /**
   * GET /service-rule/service-rule Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getServiceRuleServiceRule$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getServiceRuleServiceRule(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<ServiceRuleServiceRule> {

    return this.getServiceRuleServiceRule$Response(params).pipe(
      map((r: StrictHttpResponse<ServiceRuleServiceRule>) => r.body as ServiceRuleServiceRule)
    );
  }

  /**
   * Path part for operation getServiceRuleServiceRuleFlow
   */
  static readonly GetServiceRuleServiceRuleFlowPath = '/aether/v2.1.0/{target}/service-rule/service-rule/{id}/flow';

  /**
   * GET /service-rule/service-rule/{id}/flow Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getServiceRuleServiceRuleFlow()` instead.
   *
   * This method doesn't expect any request body.
   */
  getServiceRuleServiceRuleFlow$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<ServiceRuleServiceRuleFlow>> {

    const rb = new RequestBuilder(this.rootUrl, ServiceRuleServiceRuleService.GetServiceRuleServiceRuleFlowPath, 'get');
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
        return r as StrictHttpResponse<ServiceRuleServiceRuleFlow>;
      })
    );
  }

  /**
   * GET /service-rule/service-rule/{id}/flow Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getServiceRuleServiceRuleFlow$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getServiceRuleServiceRuleFlow(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<ServiceRuleServiceRuleFlow> {

    return this.getServiceRuleServiceRuleFlow$Response(params).pipe(
      map((r: StrictHttpResponse<ServiceRuleServiceRuleFlow>) => r.body as ServiceRuleServiceRuleFlow)
    );
  }

  /**
   * Path part for operation getServiceRuleServiceRuleQos
   */
  static readonly GetServiceRuleServiceRuleQosPath = '/aether/v2.1.0/{target}/service-rule/service-rule/{id}/qos';

  /**
   * GET /service-rule/service-rule/{id}/qos Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getServiceRuleServiceRuleQos()` instead.
   *
   * This method doesn't expect any request body.
   */
  getServiceRuleServiceRuleQos$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<ServiceRuleServiceRuleQos>> {

    const rb = new RequestBuilder(this.rootUrl, ServiceRuleServiceRuleService.GetServiceRuleServiceRuleQosPath, 'get');
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
        return r as StrictHttpResponse<ServiceRuleServiceRuleQos>;
      })
    );
  }

  /**
   * GET /service-rule/service-rule/{id}/qos Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getServiceRuleServiceRuleQos$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getServiceRuleServiceRuleQos(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<ServiceRuleServiceRuleQos> {

    return this.getServiceRuleServiceRuleQos$Response(params).pipe(
      map((r: StrictHttpResponse<ServiceRuleServiceRuleQos>) => r.body as ServiceRuleServiceRuleQos)
    );
  }

}
