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

import { EnterprisesEnterpriseSiteUpf } from '../models/enterprises-enterprise-site-upf';
import { EnterprisesEnterpriseSiteUpfList } from '../models/enterprises-enterprise-site-upf-list';

@Injectable({
  providedIn: 'root',
})
export class EnterprisesEnterpriseSiteUpfService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteUpfList
   */
  static readonly GetEnterprisesEnterpriseSiteUpfListPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/upf';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/upf List.
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
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteUpfList>> {

    const rb = new RequestBuilder(this.rootUrl, EnterprisesEnterpriseSiteUpfService.GetEnterprisesEnterpriseSiteUpfListPath, 'get');
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
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/upf List.
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
  }): Observable<EnterprisesEnterpriseSiteUpfList> {

    return this.getEnterprisesEnterpriseSiteUpfList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteUpfList>) => r.body as EnterprisesEnterpriseSiteUpfList)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteUpf
   */
  static readonly GetEnterprisesEnterpriseSiteUpfPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/upf/{upf-id}';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/upf Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSiteUpf()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteUpf$Response(params: {

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
     * key {upf-id}
     */
    'upf-id': any;
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteUpf>> {

    const rb = new RequestBuilder(this.rootUrl, EnterprisesEnterpriseSiteUpfService.GetEnterprisesEnterpriseSiteUpfPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.path('upf-id', params['upf-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteUpf>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/upf Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSiteUpf$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteUpf(params: {

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
     * key {upf-id}
     */
    'upf-id': any;
  }): Observable<EnterprisesEnterpriseSiteUpf> {

    return this.getEnterprisesEnterpriseSiteUpf$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteUpf>) => r.body as EnterprisesEnterpriseSiteUpf)
    );
  }

}
