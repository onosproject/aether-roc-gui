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

import { EnterprisesEnterpriseSiteSlicePriorityTrafficRule } from '../models/enterprises-enterprise-site-slice-priority-traffic-rule';

@Injectable({
  providedIn: 'root',
})
export class EnterprisesEnterpriseSiteSlicePriorityTrafficRuleService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteSlicePriorityTrafficRule
   */
  static readonly GetEnterprisesEnterpriseSiteSlicePriorityTrafficRulePath = '/aether/v2.0.0/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/priority-traffic-rule/{priority-traffic-rule-id}';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/priority-traffic-rule.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSiteSlicePriorityTrafficRule()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteSlicePriorityTrafficRule$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {slice-id}
     */
    'slice-id': any;

    /**
     * key {priority-traffic-rule-id}
     */
    'priority-traffic-rule-id': any;
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteSlicePriorityTrafficRule>> {

    const rb = new RequestBuilder(this.rootUrl, EnterprisesEnterpriseSiteSlicePriorityTrafficRuleService.GetEnterprisesEnterpriseSiteSlicePriorityTrafficRulePath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.path('slice-id', params['slice-id'], {});
      rb.path('priority-traffic-rule-id', params['priority-traffic-rule-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteSlicePriorityTrafficRule>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/priority-traffic-rule.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSiteSlicePriorityTrafficRule$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteSlicePriorityTrafficRule(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {slice-id}
     */
    'slice-id': any;

    /**
     * key {priority-traffic-rule-id}
     */
    'priority-traffic-rule-id': any;
  }): Observable<EnterprisesEnterpriseSiteSlicePriorityTrafficRule> {

    return this.getEnterprisesEnterpriseSiteSlicePriorityTrafficRule$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteSlicePriorityTrafficRule>) => r.body as EnterprisesEnterpriseSiteSlicePriorityTrafficRule)
    );
  }

}
