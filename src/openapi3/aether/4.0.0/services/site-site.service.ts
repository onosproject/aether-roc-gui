// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { SiteSite } from '../models/site-site';
import { SiteSiteImsiDefinition } from '../models/site-site-imsi-definition';

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
  static readonly GetSiteSitePath = '/aether/v4.0.0/{target}/site/site/{id}';

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
  }): Observable<StrictHttpResponse<SiteSite>> {

    const rb = new RequestBuilder(this.rootUrl, SiteSiteService.GetSiteSitePath, 'get');
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
        return r as StrictHttpResponse<SiteSite>;
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
  }): Observable<SiteSite> {

    return this.getSiteSite$Response(params).pipe(
      map((r: StrictHttpResponse<SiteSite>) => r.body as SiteSite)
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
  }): Observable<StrictHttpResponse<SiteSiteImsiDefinition>> {

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
        return r as StrictHttpResponse<SiteSiteImsiDefinition>;
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
  }): Observable<SiteSiteImsiDefinition> {

    return this.getSiteSiteImsiDefinition$Response(params).pipe(
      map((r: StrictHttpResponse<SiteSiteImsiDefinition>) => r.body as SiteSiteImsiDefinition)
    );
  }

}
