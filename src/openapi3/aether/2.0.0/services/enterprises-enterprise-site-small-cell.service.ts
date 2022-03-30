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

import { EnterprisesEnterpriseSiteSmallCell } from '../models/enterprises-enterprise-site-small-cell';
import { EnterprisesEnterpriseSiteSmallCellList } from '../models/enterprises-enterprise-site-small-cell-list';

@Injectable({
  providedIn: 'root',
})
export class EnterprisesEnterpriseSiteSmallCellService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteSmallCellList
   */
  static readonly GetEnterprisesEnterpriseSiteSmallCellListPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/small-cell';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/small-cell List.
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
<<<<<<< HEAD
  }): Observable<StrictHttpResponse<Array<EnterprisesEnterpriseSiteSmallCellList>>> {
=======
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteSmallCellList>> {
>>>>>>> e357b5d... Aether-3394 handle null values in responses

    const rb = new RequestBuilder(this.rootUrl, EnterprisesEnterpriseSiteSmallCellService.GetEnterprisesEnterpriseSiteSmallCellListPath, 'get');
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
<<<<<<< HEAD
        return r as StrictHttpResponse<Array<EnterprisesEnterpriseSiteSmallCellList>>;
=======
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteSmallCellList>;
>>>>>>> e357b5d... Aether-3394 handle null values in responses
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/small-cell List.
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
<<<<<<< HEAD
  }): Observable<Array<EnterprisesEnterpriseSiteSmallCellList>> {

    return this.getEnterprisesEnterpriseSiteSmallCellList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<EnterprisesEnterpriseSiteSmallCellList>>) => r.body as Array<EnterprisesEnterpriseSiteSmallCellList>)
=======
  }): Observable<EnterprisesEnterpriseSiteSmallCellList> {

    return this.getEnterprisesEnterpriseSiteSmallCellList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteSmallCellList>) => r.body as EnterprisesEnterpriseSiteSmallCellList)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteSmallCell
   */
  static readonly GetEnterprisesEnterpriseSiteSmallCellPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/small-cell/{small-cell-id}';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/small-cell Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSiteSmallCell()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteSmallCell$Response(params: {

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
     * key {small-cell-id}
     */
    'small-cell-id': any;
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteSmallCell>> {

    const rb = new RequestBuilder(this.rootUrl, EnterprisesEnterpriseSiteSmallCellService.GetEnterprisesEnterpriseSiteSmallCellPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.path('small-cell-id', params['small-cell-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteSmallCell>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/small-cell Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSiteSmallCell$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteSmallCell(params: {

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
     * key {small-cell-id}
     */
    'small-cell-id': any;
  }): Observable<EnterprisesEnterpriseSiteSmallCell> {

    return this.getEnterprisesEnterpriseSiteSmallCell$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteSmallCell>) => r.body as EnterprisesEnterpriseSiteSmallCell)
    );
  }

}
