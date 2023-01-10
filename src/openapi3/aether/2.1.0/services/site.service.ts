// Code generated by openapi-gen. DO NOT EDIT.
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

import { Site } from '../models/site';
import { SiteConnectivityService } from '../models/site-connectivity-service';
import { SiteImsiDefinition } from '../models/site-imsi-definition';
import { SiteList } from '../models/site-list';
import { SiteMonitoring } from '../models/site-monitoring';

@Injectable({
  providedIn: 'root',
})
export class SiteService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getSiteList
   */
  static readonly GetSiteListPath = '/aether/v2.1.x/{enterprise-id}/site';

  /**
   * GET /site List.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSiteList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSiteList$Response(params: {

    /**
     * enterprise-id (target in onos-config)
     */
    'enterprise-id': any;
  }): Observable<StrictHttpResponse<SiteList>> {

    const rb = new RequestBuilder(this.rootUrl, SiteService.GetSiteListPath, 'get');
    if (params) {
      rb.path('enterprise-id', params['enterprise-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SiteList>;
      })
    );
  }

  /**
   * GET /site List.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSiteList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSiteList(params: {

    /**
     * enterprise-id (target in onos-config)
     */
    'enterprise-id': any;
  }): Observable<SiteList> {

    return this.getSiteList$Response(params).pipe(
      map((r: StrictHttpResponse<SiteList>) => r.body as SiteList)
    );
  }

  /**
   * Path part for operation getSite
   */
  static readonly GetSitePath = '/aether/v2.1.x/{enterprise-id}/site/{site-id}';

  /**
   * GET /site Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSite()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSite$Response(params: {

    /**
     * enterprise-id (target in onos-config)
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;
  }): Observable<StrictHttpResponse<Site>> {

    const rb = new RequestBuilder(this.rootUrl, SiteService.GetSitePath, 'get');
    if (params) {
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Site>;
      })
    );
  }

  /**
   * GET /site Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSite$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSite(params: {

    /**
     * enterprise-id (target in onos-config)
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;
  }): Observable<Site> {

    return this.getSite$Response(params).pipe(
      map((r: StrictHttpResponse<Site>) => r.body as Site)
    );
  }

  /**
   * Path part for operation postSite
   */
  static readonly PostSitePath = '/aether/v2.1.x/{enterprise-id}/site/{site-id}';

  /**
   * POST /site.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postSite()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postSite$Response(params: {

    /**
     * enterprise-id (target in onos-config)
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;
    body?: Site
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, SiteService.PostSitePath, 'post');
    if (params) {
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * POST /site.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postSite$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postSite(params: {

    /**
     * enterprise-id (target in onos-config)
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;
    body?: Site
  }): Observable<void> {

    return this.postSite$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteSite
   */
  static readonly DeleteSitePath = '/aether/v2.1.x/{enterprise-id}/site/{site-id}';

  /**
   * DELETE /site.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteSite()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSite$Response(params: {

    /**
     * enterprise-id (target in onos-config)
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, SiteService.DeleteSitePath, 'delete');
    if (params) {
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * DELETE /site.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteSite$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSite(params: {

    /**
     * enterprise-id (target in onos-config)
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;
  }): Observable<void> {

    return this.deleteSite$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getSiteConnectivityService
   */
  static readonly GetSiteConnectivityServicePath = '/aether/v2.1.x/{enterprise-id}/site/{site-id}/connectivity-service';

  /**
   * GET /site/{site-id}/connectivity-service Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSiteConnectivityService()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSiteConnectivityService$Response(params: {

    /**
     * enterprise-id (target in onos-config)
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;
  }): Observable<StrictHttpResponse<SiteConnectivityService>> {

    const rb = new RequestBuilder(this.rootUrl, SiteService.GetSiteConnectivityServicePath, 'get');
    if (params) {
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SiteConnectivityService>;
      })
    );
  }

  /**
   * GET /site/{site-id}/connectivity-service Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSiteConnectivityService$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSiteConnectivityService(params: {

    /**
     * enterprise-id (target in onos-config)
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;
  }): Observable<SiteConnectivityService> {

    return this.getSiteConnectivityService$Response(params).pipe(
      map((r: StrictHttpResponse<SiteConnectivityService>) => r.body as SiteConnectivityService)
    );
  }

  /**
   * Path part for operation postSiteConnectivityService
   */
  static readonly PostSiteConnectivityServicePath = '/aether/v2.1.x/{enterprise-id}/site/{site-id}/connectivity-service';

  /**
   * POST /site/{site-id}/connectivity-service.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postSiteConnectivityService()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postSiteConnectivityService$Response(params: {

    /**
     * enterprise-id (target in onos-config)
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;
    body?: SiteConnectivityService
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, SiteService.PostSiteConnectivityServicePath, 'post');
    if (params) {
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * POST /site/{site-id}/connectivity-service.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postSiteConnectivityService$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postSiteConnectivityService(params: {

    /**
     * enterprise-id (target in onos-config)
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;
    body?: SiteConnectivityService
  }): Observable<void> {

    return this.postSiteConnectivityService$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteSiteConnectivityService
   */
  static readonly DeleteSiteConnectivityServicePath = '/aether/v2.1.x/{enterprise-id}/site/{site-id}/connectivity-service';

  /**
   * DELETE /site/{site-id}/connectivity-service.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteSiteConnectivityService()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSiteConnectivityService$Response(params: {

    /**
     * enterprise-id (target in onos-config)
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, SiteService.DeleteSiteConnectivityServicePath, 'delete');
    if (params) {
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * DELETE /site/{site-id}/connectivity-service.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteSiteConnectivityService$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSiteConnectivityService(params: {

    /**
     * enterprise-id (target in onos-config)
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;
  }): Observable<void> {

    return this.deleteSiteConnectivityService$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getSiteImsiDefinition
   */
  static readonly GetSiteImsiDefinitionPath = '/aether/v2.1.x/{enterprise-id}/site/{site-id}/imsi-definition';

  /**
   * GET /site/{site-id}/imsi-definition Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSiteImsiDefinition()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSiteImsiDefinition$Response(params: {

    /**
     * enterprise-id (target in onos-config)
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;
  }): Observable<StrictHttpResponse<SiteImsiDefinition>> {

    const rb = new RequestBuilder(this.rootUrl, SiteService.GetSiteImsiDefinitionPath, 'get');
    if (params) {
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SiteImsiDefinition>;
      })
    );
  }

  /**
   * GET /site/{site-id}/imsi-definition Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSiteImsiDefinition$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSiteImsiDefinition(params: {

    /**
     * enterprise-id (target in onos-config)
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;
  }): Observable<SiteImsiDefinition> {

    return this.getSiteImsiDefinition$Response(params).pipe(
      map((r: StrictHttpResponse<SiteImsiDefinition>) => r.body as SiteImsiDefinition)
    );
  }

  /**
   * Path part for operation postSiteImsiDefinition
   */
  static readonly PostSiteImsiDefinitionPath = '/aether/v2.1.x/{enterprise-id}/site/{site-id}/imsi-definition';

  /**
   * POST /site/{site-id}/imsi-definition.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postSiteImsiDefinition()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postSiteImsiDefinition$Response(params: {

    /**
     * enterprise-id (target in onos-config)
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;
    body?: SiteImsiDefinition
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, SiteService.PostSiteImsiDefinitionPath, 'post');
    if (params) {
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * POST /site/{site-id}/imsi-definition.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postSiteImsiDefinition$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postSiteImsiDefinition(params: {

    /**
     * enterprise-id (target in onos-config)
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;
    body?: SiteImsiDefinition
  }): Observable<void> {

    return this.postSiteImsiDefinition$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteSiteImsiDefinition
   */
  static readonly DeleteSiteImsiDefinitionPath = '/aether/v2.1.x/{enterprise-id}/site/{site-id}/imsi-definition';

  /**
   * DELETE /site/{site-id}/imsi-definition.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteSiteImsiDefinition()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSiteImsiDefinition$Response(params: {

    /**
     * enterprise-id (target in onos-config)
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, SiteService.DeleteSiteImsiDefinitionPath, 'delete');
    if (params) {
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * DELETE /site/{site-id}/imsi-definition.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteSiteImsiDefinition$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSiteImsiDefinition(params: {

    /**
     * enterprise-id (target in onos-config)
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;
  }): Observable<void> {

    return this.deleteSiteImsiDefinition$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getSiteMonitoring
   */
  static readonly GetSiteMonitoringPath = '/aether/v2.1.x/{enterprise-id}/site/{site-id}/monitoring';

  /**
   * GET /site/{site-id}/monitoring Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSiteMonitoring()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSiteMonitoring$Response(params: {

    /**
     * enterprise-id (target in onos-config)
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;
  }): Observable<StrictHttpResponse<SiteMonitoring>> {

    const rb = new RequestBuilder(this.rootUrl, SiteService.GetSiteMonitoringPath, 'get');
    if (params) {
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SiteMonitoring>;
      })
    );
  }

  /**
   * GET /site/{site-id}/monitoring Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSiteMonitoring$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSiteMonitoring(params: {

    /**
     * enterprise-id (target in onos-config)
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;
  }): Observable<SiteMonitoring> {

    return this.getSiteMonitoring$Response(params).pipe(
      map((r: StrictHttpResponse<SiteMonitoring>) => r.body as SiteMonitoring)
    );
  }

  /**
   * Path part for operation postSiteMonitoring
   */
  static readonly PostSiteMonitoringPath = '/aether/v2.1.x/{enterprise-id}/site/{site-id}/monitoring';

  /**
   * POST /site/{site-id}/monitoring.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postSiteMonitoring()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postSiteMonitoring$Response(params: {

    /**
     * enterprise-id (target in onos-config)
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;
    body?: SiteMonitoring
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, SiteService.PostSiteMonitoringPath, 'post');
    if (params) {
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * POST /site/{site-id}/monitoring.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postSiteMonitoring$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postSiteMonitoring(params: {

    /**
     * enterprise-id (target in onos-config)
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;
    body?: SiteMonitoring
  }): Observable<void> {

    return this.postSiteMonitoring$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteSiteMonitoring
   */
  static readonly DeleteSiteMonitoringPath = '/aether/v2.1.x/{enterprise-id}/site/{site-id}/monitoring';

  /**
   * DELETE /site/{site-id}/monitoring.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteSiteMonitoring()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSiteMonitoring$Response(params: {

    /**
     * enterprise-id (target in onos-config)
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, SiteService.DeleteSiteMonitoringPath, 'delete');
    if (params) {
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * DELETE /site/{site-id}/monitoring.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteSiteMonitoring$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSiteMonitoring(params: {

    /**
     * enterprise-id (target in onos-config)
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;
  }): Observable<void> {

    return this.deleteSiteMonitoring$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
