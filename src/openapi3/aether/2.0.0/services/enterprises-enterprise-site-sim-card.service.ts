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

import { EnterprisesEnterpriseSiteSimCard } from '../models/enterprises-enterprise-site-sim-card';
import { EnterprisesEnterpriseSiteSimCardList } from '../models/enterprises-enterprise-site-sim-card-list';

@Injectable({
  providedIn: 'root',
})
export class EnterprisesEnterpriseSiteSimCardService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteSimCardList
   */
  static readonly GetEnterprisesEnterpriseSiteSimCardListPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/sim-card';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/sim-card List.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSiteSimCardList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteSimCardList$Response(params: {

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
  }): Observable<StrictHttpResponse<Array<EnterprisesEnterpriseSiteSimCardList>>> {

    const rb = new RequestBuilder(this.rootUrl, EnterprisesEnterpriseSiteSimCardService.GetEnterprisesEnterpriseSiteSimCardListPath, 'get');
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
        return r as StrictHttpResponse<Array<EnterprisesEnterpriseSiteSimCardList>>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/sim-card List.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSiteSimCardList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteSimCardList(params: {

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
  }): Observable<Array<EnterprisesEnterpriseSiteSimCardList>> {

    return this.getEnterprisesEnterpriseSiteSimCardList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<EnterprisesEnterpriseSiteSimCardList>>) => r.body as Array<EnterprisesEnterpriseSiteSimCardList>)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteSimCard
   */
  static readonly GetEnterprisesEnterpriseSiteSimCardPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/sim-card/{sim-id}';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/sim-card Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSiteSimCard()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteSimCard$Response(params: {

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
     * key {sim-id}
     */
    'sim-id': any;
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteSimCard>> {

    const rb = new RequestBuilder(this.rootUrl, EnterprisesEnterpriseSiteSimCardService.GetEnterprisesEnterpriseSiteSimCardPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.path('sim-id', params['sim-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteSimCard>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/sim-card Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSiteSimCard$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteSimCard(params: {

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
     * key {sim-id}
     */
    'sim-id': any;
  }): Observable<EnterprisesEnterpriseSiteSimCard> {

    return this.getEnterprisesEnterpriseSiteSimCard$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteSimCard>) => r.body as EnterprisesEnterpriseSiteSimCard)
    );
  }

}
