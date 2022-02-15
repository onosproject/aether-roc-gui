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

import { EnterprisesEnterpriseSiteSlice } from '../models/enterprises-enterprise-site-slice';
import { EnterprisesEnterpriseSiteSliceMbr } from '../models/enterprises-enterprise-site-slice-mbr';

@Injectable({
  providedIn: 'root',
})
export class EnterprisesEnterpriseSiteSliceService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteSlice
   */
  static readonly GetEnterprisesEnterpriseSiteSlicePath = '/aether/v2.0.0/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/slice.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSiteSlice()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteSlice$Response(params: {

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
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteSlice>> {

    const rb = new RequestBuilder(this.rootUrl, EnterprisesEnterpriseSiteSliceService.GetEnterprisesEnterpriseSiteSlicePath, 'get');
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
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteSlice>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/slice.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSiteSlice$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteSlice(params: {

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
  }): Observable<EnterprisesEnterpriseSiteSlice> {

    return this.getEnterprisesEnterpriseSiteSlice$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteSlice>) => r.body as EnterprisesEnterpriseSiteSlice)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteSliceMbr
   */
  static readonly GetEnterprisesEnterpriseSiteSliceMbrPath = '/aether/v2.0.0/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/mbr';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/mbr.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSiteSliceMbr()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteSliceMbr$Response(params: {

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
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteSliceMbr>> {

    const rb = new RequestBuilder(this.rootUrl, EnterprisesEnterpriseSiteSliceService.GetEnterprisesEnterpriseSiteSliceMbrPath, 'get');
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
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteSliceMbr>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/mbr.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSiteSliceMbr$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteSliceMbr(params: {

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
  }): Observable<EnterprisesEnterpriseSiteSliceMbr> {

    return this.getEnterprisesEnterpriseSiteSliceMbr$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteSliceMbr>) => r.body as EnterprisesEnterpriseSiteSliceMbr)
    );
  }

}
