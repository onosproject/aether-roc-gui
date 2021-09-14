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

import { ServicePolicyServicePolicyRules } from '../models/service-policy-service-policy-rules';

@Injectable({
  providedIn: 'root',
})
export class ServicePolicyServicePolicyRulesService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getServicePolicyServicePolicyRules
   */
  static readonly GetServicePolicyServicePolicyRulesPath = '/aether/v2.1.0/{target}/service-policy/service-policy/{id}/rules/{rule}';

  /**
   * GET /service-policy/service-policy/{id}/rules Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getServicePolicyServicePolicyRules()` instead.
   *
   * This method doesn't expect any request body.
   */
  getServicePolicyServicePolicyRules$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {rule}
     */
    rule: any;
  }): Observable<StrictHttpResponse<ServicePolicyServicePolicyRules>> {

    const rb = new RequestBuilder(this.rootUrl, ServicePolicyServicePolicyRulesService.GetServicePolicyServicePolicyRulesPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
      rb.path('rule', params.rule, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ServicePolicyServicePolicyRules>;
      })
    );
  }

  /**
   * GET /service-policy/service-policy/{id}/rules Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getServicePolicyServicePolicyRules$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getServicePolicyServicePolicyRules(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {rule}
     */
    rule: any;
  }): Observable<ServicePolicyServicePolicyRules> {

    return this.getServicePolicyServicePolicyRules$Response(params).pipe(
      map((r: StrictHttpResponse<ServicePolicyServicePolicyRules>) => r.body as ServicePolicyServicePolicyRules)
    );
  }

}
