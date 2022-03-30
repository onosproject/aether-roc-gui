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

import { EnterprisesEnterpriseSiteSliceFilter } from '../models/enterprises-enterprise-site-slice-filter';
import { EnterprisesEnterpriseSiteSliceFilterList } from '../models/enterprises-enterprise-site-slice-filter-list';

@Injectable({
  providedIn: 'root',
})
export class EnterprisesEnterpriseSiteSliceFilterService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteSliceFilterList
   */
  static readonly GetEnterprisesEnterpriseSiteSliceFilterListPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/filter';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/filter List.
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
<<<<<<< HEAD
     * target (device in onos-config)
=======
     * target (target in onos-config)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
  }): Observable<StrictHttpResponse<Array<EnterprisesEnterpriseSiteSliceFilterList>>> {
=======
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteSliceFilterList>> {
>>>>>>> e357b5d... Aether-3394 handle null values in responses

    const rb = new RequestBuilder(this.rootUrl, EnterprisesEnterpriseSiteSliceFilterService.GetEnterprisesEnterpriseSiteSliceFilterListPath, 'get');
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
<<<<<<< HEAD
        return r as StrictHttpResponse<Array<EnterprisesEnterpriseSiteSliceFilterList>>;
=======
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteSliceFilterList>;
>>>>>>> e357b5d... Aether-3394 handle null values in responses
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/filter List.
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
<<<<<<< HEAD
     * target (device in onos-config)
=======
     * target (target in onos-config)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
  }): Observable<Array<EnterprisesEnterpriseSiteSliceFilterList>> {

    return this.getEnterprisesEnterpriseSiteSliceFilterList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<EnterprisesEnterpriseSiteSliceFilterList>>) => r.body as Array<EnterprisesEnterpriseSiteSliceFilterList>)
=======
  }): Observable<EnterprisesEnterpriseSiteSliceFilterList> {

    return this.getEnterprisesEnterpriseSiteSliceFilterList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteSliceFilterList>) => r.body as EnterprisesEnterpriseSiteSliceFilterList)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteSliceFilter
   */
  static readonly GetEnterprisesEnterpriseSiteSliceFilterPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/filter/{application}';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/filter Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSiteSliceFilter()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteSliceFilter$Response(params: {

    /**
     * target (target in onos-config)
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
     * key {application}
     */
    application: any;
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteSliceFilter>> {

    const rb = new RequestBuilder(this.rootUrl, EnterprisesEnterpriseSiteSliceFilterService.GetEnterprisesEnterpriseSiteSliceFilterPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
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
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteSliceFilter>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/filter Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSiteSliceFilter$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteSliceFilter(params: {

    /**
     * target (target in onos-config)
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
     * key {application}
     */
    application: any;
  }): Observable<EnterprisesEnterpriseSiteSliceFilter> {

    return this.getEnterprisesEnterpriseSiteSliceFilter$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteSliceFilter>) => r.body as EnterprisesEnterpriseSiteSliceFilter)
    );
  }

}
