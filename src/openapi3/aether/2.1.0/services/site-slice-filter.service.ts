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

import { SiteSliceFilter } from '../models/site-slice-filter';
import { SiteSliceFilterList } from '../models/site-slice-filter-list';

@Injectable({
  providedIn: 'root',
})
export class SiteSliceFilterService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getSiteSliceFilterList
   */
  static readonly GetSiteSliceFilterListPath = '/aether/v2.1.x/{enterprise-id}/site/{site-id}/slice/{slice-id}/filter';

  /**
   * GET /site/{site-id}/slice/{slice-id}/filter List.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSiteSliceFilterList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSiteSliceFilterList$Response(params: {

    /**
     * enterprise-id (target in onos-config)
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
  }): Observable<StrictHttpResponse<SiteSliceFilterList>> {

    const rb = new RequestBuilder(this.rootUrl, SiteSliceFilterService.GetSiteSliceFilterListPath, 'get');
    if (params) {
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
        return r as StrictHttpResponse<SiteSliceFilterList>;
      })
    );
  }

  /**
   * GET /site/{site-id}/slice/{slice-id}/filter List.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSiteSliceFilterList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSiteSliceFilterList(params: {

    /**
     * enterprise-id (target in onos-config)
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
  }): Observable<SiteSliceFilterList> {

    return this.getSiteSliceFilterList$Response(params).pipe(
      map((r: StrictHttpResponse<SiteSliceFilterList>) => r.body as SiteSliceFilterList)
    );
  }

  /**
   * Path part for operation getSiteSliceFilter
   */
  static readonly GetSiteSliceFilterPath = '/aether/v2.1.x/{enterprise-id}/site/{site-id}/slice/{slice-id}/filter/{application}';

  /**
   * GET /site/{site-id}/slice/{slice-id}/filter Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSiteSliceFilter()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSiteSliceFilter$Response(params: {

    /**
     * enterprise-id (target in onos-config)
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
     * key {application}
     */
    application: any;
  }): Observable<StrictHttpResponse<SiteSliceFilter>> {

    const rb = new RequestBuilder(this.rootUrl, SiteSliceFilterService.GetSiteSliceFilterPath, 'get');
    if (params) {
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.path('slice-id', params['slice-id'], {});
      rb.path('application', params.application, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SiteSliceFilter>;
      })
    );
  }

  /**
   * GET /site/{site-id}/slice/{slice-id}/filter Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSiteSliceFilter$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSiteSliceFilter(params: {

    /**
     * enterprise-id (target in onos-config)
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
     * key {application}
     */
    application: any;
  }): Observable<SiteSliceFilter> {

    return this.getSiteSliceFilter$Response(params).pipe(
      map((r: StrictHttpResponse<SiteSliceFilter>) => r.body as SiteSliceFilter)
    );
  }

}