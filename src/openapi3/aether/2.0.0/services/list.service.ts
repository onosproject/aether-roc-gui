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

import { EnterprisesEnterpriseApplicationEndpointList } from '../models/enterprises-enterprise-application-endpoint-list';
import { EnterprisesEnterpriseApplicationList } from '../models/enterprises-enterprise-application-list';
import { EnterprisesEnterpriseList } from '../models/enterprises-enterprise-list';
import { EnterprisesEnterpriseSiteSliceFilterList } from '../models/enterprises-enterprise-site-slice-filter-list';
import { EnterprisesEnterpriseSiteSlicePriorityTrafficRuleList } from '../models/enterprises-enterprise-site-slice-priority-traffic-rule-list';
import { EnterprisesEnterpriseSiteSmallCellList } from '../models/enterprises-enterprise-site-small-cell-list';
import { EnterprisesEnterpriseSiteUpfList } from '../models/enterprises-enterprise-site-upf-list';
import { EnterprisesEnterpriseTemplateList } from '../models/enterprises-enterprise-template-list';
import { EnterprisesEnterpriseTrafficClassList } from '../models/enterprises-enterprise-traffic-class-list';

@Injectable({
  providedIn: 'root',
})
export class ListService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getEnterprisesEnterpriseList
   */
  static readonly GetEnterprisesEnterpriseListPath = '/aether/v2.0.0/{target}/enterprises/enterprise';

  /**
   * GET /enterprises/enterprise.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseList$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseList>> {

    const rb = new RequestBuilder(this.rootUrl, ListService.GetEnterprisesEnterpriseListPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterprisesEnterpriseList>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseList(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<EnterprisesEnterpriseList> {

    return this.getEnterprisesEnterpriseList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseList>) => r.body as EnterprisesEnterpriseList)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseApplicationList
   */
  static readonly GetEnterprisesEnterpriseApplicationListPath = '/aether/v2.0.0/{target}/enterprises/enterprise/{enterprise-id}/application';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/application List.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseApplicationList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseApplicationList$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseApplicationList>> {

    const rb = new RequestBuilder(this.rootUrl, ListService.GetEnterprisesEnterpriseApplicationListPath, 'get');
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
        return r as StrictHttpResponse<EnterprisesEnterpriseApplicationList>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/application List.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseApplicationList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseApplicationList(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;
  }): Observable<EnterprisesEnterpriseApplicationList> {

    return this.getEnterprisesEnterpriseApplicationList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseApplicationList>) => r.body as EnterprisesEnterpriseApplicationList)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseApplicationEndpointList
   */
  static readonly GetEnterprisesEnterpriseApplicationEndpointListPath = '/aether/v2.0.0/{target}/enterprises/enterprise/{enterprise-id}/application/{application-id}/endpoint';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/application/{application-id}/endpoint.
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
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseApplicationEndpointList>> {

    const rb = new RequestBuilder(this.rootUrl, ListService.GetEnterprisesEnterpriseApplicationEndpointListPath, 'get');
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
        return r as StrictHttpResponse<EnterprisesEnterpriseApplicationEndpointList>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/application/{application-id}/endpoint.
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
  }): Observable<EnterprisesEnterpriseApplicationEndpointList> {

    return this.getEnterprisesEnterpriseApplicationEndpointList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseApplicationEndpointList>) => r.body as EnterprisesEnterpriseApplicationEndpointList)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteSliceFilterList
   */
  static readonly GetEnterprisesEnterpriseSiteSliceFilterListPath = '/aether/v2.0.0/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/filter';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/filter.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSiteSliceFilterList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteSliceFilterList$Response(params: {

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
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteSliceFilterList>> {

    const rb = new RequestBuilder(this.rootUrl, ListService.GetEnterprisesEnterpriseSiteSliceFilterListPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.path('slice-id', params['slice-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteSliceFilterList>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/filter.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSiteSliceFilterList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteSliceFilterList(params: {

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
  }): Observable<EnterprisesEnterpriseSiteSliceFilterList> {

    return this.getEnterprisesEnterpriseSiteSliceFilterList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteSliceFilterList>) => r.body as EnterprisesEnterpriseSiteSliceFilterList)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteSlicePriorityTrafficRuleList
   */
  static readonly GetEnterprisesEnterpriseSiteSlicePriorityTrafficRuleListPath = '/aether/v2.0.0/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/priority-traffic-rule';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/priority-traffic-rule.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSiteSlicePriorityTrafficRuleList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteSlicePriorityTrafficRuleList$Response(params: {

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
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteSlicePriorityTrafficRuleList>> {

    const rb = new RequestBuilder(this.rootUrl, ListService.GetEnterprisesEnterpriseSiteSlicePriorityTrafficRuleListPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.path('slice-id', params['slice-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteSlicePriorityTrafficRuleList>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/priority-traffic-rule.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSiteSlicePriorityTrafficRuleList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteSlicePriorityTrafficRuleList(params: {

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
  }): Observable<EnterprisesEnterpriseSiteSlicePriorityTrafficRuleList> {

    return this.getEnterprisesEnterpriseSiteSlicePriorityTrafficRuleList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteSlicePriorityTrafficRuleList>) => r.body as EnterprisesEnterpriseSiteSlicePriorityTrafficRuleList)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteSmallCellList
   */
  static readonly GetEnterprisesEnterpriseSiteSmallCellListPath = '/aether/v2.0.0/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/small-cell';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/small-cell.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSiteSmallCellList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteSmallCellList$Response(params: {

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
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteSmallCellList>> {

    const rb = new RequestBuilder(this.rootUrl, ListService.GetEnterprisesEnterpriseSiteSmallCellListPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteSmallCellList>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/small-cell.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSiteSmallCellList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteSmallCellList(params: {

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
  }): Observable<EnterprisesEnterpriseSiteSmallCellList> {

    return this.getEnterprisesEnterpriseSiteSmallCellList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteSmallCellList>) => r.body as EnterprisesEnterpriseSiteSmallCellList)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteUpfList
   */
  static readonly GetEnterprisesEnterpriseSiteUpfListPath = '/aether/v2.0.0/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/upf';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/upf.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSiteUpfList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteUpfList$Response(params: {

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
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteUpfList>> {

    const rb = new RequestBuilder(this.rootUrl, ListService.GetEnterprisesEnterpriseSiteUpfListPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteUpfList>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/upf.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSiteUpfList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteUpfList(params: {

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
  }): Observable<EnterprisesEnterpriseSiteUpfList> {

    return this.getEnterprisesEnterpriseSiteUpfList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteUpfList>) => r.body as EnterprisesEnterpriseSiteUpfList)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseTemplateList
   */
  static readonly GetEnterprisesEnterpriseTemplateListPath = '/aether/v2.0.0/{target}/enterprises/enterprise/{enterprise-id}/template';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/template.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseTemplateList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseTemplateList$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseTemplateList>> {

    const rb = new RequestBuilder(this.rootUrl, ListService.GetEnterprisesEnterpriseTemplateListPath, 'get');
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
        return r as StrictHttpResponse<EnterprisesEnterpriseTemplateList>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/template.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseTemplateList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseTemplateList(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;
  }): Observable<EnterprisesEnterpriseTemplateList> {

    return this.getEnterprisesEnterpriseTemplateList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseTemplateList>) => r.body as EnterprisesEnterpriseTemplateList)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseTrafficClassList
   */
  static readonly GetEnterprisesEnterpriseTrafficClassListPath = '/aether/v2.0.0/{target}/enterprises/enterprise/{enterprise-id}/traffic-class';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/traffic-class.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseTrafficClassList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseTrafficClassList$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseTrafficClassList>> {

    const rb = new RequestBuilder(this.rootUrl, ListService.GetEnterprisesEnterpriseTrafficClassListPath, 'get');
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
        return r as StrictHttpResponse<EnterprisesEnterpriseTrafficClassList>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/traffic-class.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseTrafficClassList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseTrafficClassList(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;
  }): Observable<EnterprisesEnterpriseTrafficClassList> {

    return this.getEnterprisesEnterpriseTrafficClassList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseTrafficClassList>) => r.body as EnterprisesEnterpriseTrafficClassList)
    );
  }

}
