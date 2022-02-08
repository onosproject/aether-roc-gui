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
import {EnterpriseEnterpriseSite} from "../models/enterprise-enterprise-site";
import {EnterpriseEnterpriseSiteImsiDefinition} from "../models/enterprise-enterprise-site-imsi-definition";
import {EnterpriseEnterpriseSiteMonitoring} from "../models/enterprise-enterprise-site-monitoring";

@Injectable({
  providedIn: 'root',
})
export class SiteSiteService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getSiteSite
   */
  static readonly GetSiteSitePath = '/aether/v2.0.0/{target}/enterprises/enterprise/{ent_id}/site/{id}';

  /**
   * GET /site/site.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSiteSite()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSiteSite$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

      /**
       * key {enterprise-id}
       */
      ent_id: any;
  }): Observable<StrictHttpResponse<EnterpriseEnterpriseSite>> {

    const rb = new RequestBuilder(this.rootUrl, SiteSiteService.GetSiteSitePath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
        rb.path('ent_id', params['ent_id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterpriseEnterpriseSite>;
      })
    );
  }

  /**
   * GET /site/site.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSiteSite$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSiteSite(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

      /**
       * key {enterprise-id}
       */
      ent_id: any;
  }): Observable<EnterpriseEnterpriseSite> {

    return this.getSiteSite$Response(params).pipe(
      map((r: StrictHttpResponse<EnterpriseEnterpriseSite>) => r.body as EnterpriseEnterpriseSite)
    );
  }

  /**
   * Path part for operation getSiteSiteImsiDefinition
   */
  static readonly GetSiteSiteImsiDefinitionPath = '/aether/v4.0.0/{target}/site/site/{id}/imsi-definition';

  /**
   * GET /site/site/{id}/imsi-definition.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSiteSiteImsiDefinition()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSiteSiteImsiDefinition$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<EnterpriseEnterpriseSiteImsiDefinition>> {

    const rb = new RequestBuilder(this.rootUrl, SiteSiteService.GetSiteSiteImsiDefinitionPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterpriseEnterpriseSiteImsiDefinition>;
      })
    );
  }

  /**
   * GET /site/site/{id}/imsi-definition.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSiteSiteImsiDefinition$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSiteSiteImsiDefinition(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<EnterpriseEnterpriseSiteImsiDefinition> {

    return this.getSiteSiteImsiDefinition$Response(params).pipe(
      map((r: StrictHttpResponse<EnterpriseEnterpriseSiteImsiDefinition>) => r.body as EnterpriseEnterpriseSiteImsiDefinition)
    );
  }

  /**
   * Path part for operation getSiteSiteMonitoring
   */
  static readonly GetSiteSiteMonitoringPath = '/aether/v4.0.0/{target}/site/site/{id}/monitoring';

  /**
   * GET /site/site/{id}/monitoring.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSiteSiteMonitoring()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSiteSiteMonitoring$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<EnterpriseEnterpriseSiteMonitoring>> {

    const rb = new RequestBuilder(this.rootUrl, SiteSiteService.GetSiteSiteMonitoringPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterpriseEnterpriseSiteMonitoring>;
      })
    );
  }

  /**
   * GET /site/site/{id}/monitoring.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSiteSiteMonitoring$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSiteSiteMonitoring(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<EnterpriseEnterpriseSiteMonitoring> {

    return this.getSiteSiteMonitoring$Response(params).pipe(
      map((r: StrictHttpResponse<EnterpriseEnterpriseSiteMonitoring>) => r.body as EnterpriseEnterpriseSiteMonitoring)
    );
  }

}
