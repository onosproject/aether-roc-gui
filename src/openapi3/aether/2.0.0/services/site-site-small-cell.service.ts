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
import {EnterpriseEnterpriseSiteMonitoringEdgeDevice} from "../models/enterprise-enterprise-site-monitoring-edge-device";
import {EnterpriseEnterpriseSiteSmallCell} from "../models/enterprise-enterprise-site-small-cell";


@Injectable({
  providedIn: 'root',
})
export class SiteSiteSmallCellService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getSiteSiteSmallCell
   */
  static readonly GetSiteSiteSmallCellPath = '/aether/v4.0.0/{target}/site/site/{id}/small-cell/{small-cell-id}';

  /**
   * GET /site/site/{id}/small-cell.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSiteSiteSmallCell()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSiteSiteSmallCell$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {small-cell-id}
     */
    'small-cell-id': any;
  }): Observable<StrictHttpResponse<EnterpriseEnterpriseSiteSmallCell>> {

    const rb = new RequestBuilder(this.rootUrl, SiteSiteSmallCellService.GetSiteSiteSmallCellPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
      rb.path('small-cell-id', params['small-cell-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterpriseEnterpriseSiteSmallCell>;
      })
    );
  }

  /**
   * GET /site/site/{id}/small-cell.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSiteSiteSmallCell$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSiteSiteSmallCell(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {small-cell-id}
     */
    'small-cell-id': any;
  }): Observable<EnterpriseEnterpriseSiteSmallCell> {

    return this.getSiteSiteSmallCell$Response(params).pipe(
      map((r: StrictHttpResponse<EnterpriseEnterpriseSiteSmallCell>) => r.body as EnterpriseEnterpriseSiteSmallCell)
    );
  }

}
