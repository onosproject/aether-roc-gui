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

import { EnterprisesEnterpriseSite } from '../models/enterprises-enterprise-site';
import { EnterprisesEnterpriseSiteImsiDefinition } from '../models/enterprises-enterprise-site-imsi-definition';
import { EnterprisesEnterpriseSiteList } from '../models/enterprises-enterprise-site-list';
import { EnterprisesEnterpriseSiteMonitoring } from '../models/enterprises-enterprise-site-monitoring';

@Injectable({
  providedIn: 'root',
})
export class EnterprisesEnterpriseSiteService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteList
   */
  static readonly GetEnterprisesEnterpriseSiteListPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site List.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSiteList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteList$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;
  }): Observable<StrictHttpResponse<Array<EnterprisesEnterpriseSiteList>>> {

    const rb = new RequestBuilder(this.rootUrl, EnterprisesEnterpriseSiteService.GetEnterprisesEnterpriseSiteListPath, 'get');
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
        return r as StrictHttpResponse<Array<EnterprisesEnterpriseSiteList>>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site List.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSiteList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteList(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;
  }): Observable<Array<EnterprisesEnterpriseSiteList>> {

    return this.getEnterprisesEnterpriseSiteList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<EnterprisesEnterpriseSiteList>>) => r.body as Array<EnterprisesEnterpriseSiteList>)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSite
   */
  static readonly GetEnterprisesEnterpriseSitePath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSite()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSite$Response(params: {

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
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSite>> {

    const rb = new RequestBuilder(this.rootUrl, EnterprisesEnterpriseSiteService.GetEnterprisesEnterpriseSitePath, 'get');
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
        return r as StrictHttpResponse<EnterprisesEnterpriseSite>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSite$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSite(params: {

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
  }): Observable<EnterprisesEnterpriseSite> {

    return this.getEnterprisesEnterpriseSite$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSite>) => r.body as EnterprisesEnterpriseSite)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteImsiDefinition
   */
  static readonly GetEnterprisesEnterpriseSiteImsiDefinitionPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/imsi-definition';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/imsi-definition Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSiteImsiDefinition()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteImsiDefinition$Response(params: {

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
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteImsiDefinition>> {

    const rb = new RequestBuilder(this.rootUrl, EnterprisesEnterpriseSiteService.GetEnterprisesEnterpriseSiteImsiDefinitionPath, 'get');
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
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteImsiDefinition>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/imsi-definition Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSiteImsiDefinition$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteImsiDefinition(params: {

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
  }): Observable<EnterprisesEnterpriseSiteImsiDefinition> {

    return this.getEnterprisesEnterpriseSiteImsiDefinition$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteImsiDefinition>) => r.body as EnterprisesEnterpriseSiteImsiDefinition)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteMonitoring
   */
  static readonly GetEnterprisesEnterpriseSiteMonitoringPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/monitoring';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/monitoring Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSiteMonitoring()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteMonitoring$Response(params: {

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
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteMonitoring>> {

    const rb = new RequestBuilder(this.rootUrl, EnterprisesEnterpriseSiteService.GetEnterprisesEnterpriseSiteMonitoringPath, 'get');
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
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteMonitoring>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/monitoring Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSiteMonitoring$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteMonitoring(params: {

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
  }): Observable<EnterprisesEnterpriseSiteMonitoring> {

    return this.getEnterprisesEnterpriseSiteMonitoring$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteMonitoring>) => r.body as EnterprisesEnterpriseSiteMonitoring)
    );
  }

}
