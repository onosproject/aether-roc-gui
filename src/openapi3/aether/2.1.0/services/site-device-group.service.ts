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

import { SiteDeviceGroup } from '../models/site-device-group';
import { SiteDeviceGroupList } from '../models/site-device-group-list';
import { SiteDeviceGroupMbr } from '../models/site-device-group-mbr';

@Injectable({
  providedIn: 'root',
})
export class SiteDeviceGroupService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getSiteDeviceGroupList
   */
  static readonly GetSiteDeviceGroupListPath = '/aether/v2.1.x/{enterprise-id}/site/{site-id}/device-group';

  /**
   * GET /site/{site-id}/device-group List.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSiteDeviceGroupList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSiteDeviceGroupList$Response(params: {

    /**
     * enterprise-id (target in onos-config)
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;
  }): Observable<StrictHttpResponse<SiteDeviceGroupList>> {

    const rb = new RequestBuilder(this.rootUrl, SiteDeviceGroupService.GetSiteDeviceGroupListPath, 'get');
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
        return r as StrictHttpResponse<SiteDeviceGroupList>;
      })
    );
  }

  /**
   * GET /site/{site-id}/device-group List.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSiteDeviceGroupList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSiteDeviceGroupList(params: {

    /**
     * enterprise-id (target in onos-config)
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;
  }): Observable<SiteDeviceGroupList> {

    return this.getSiteDeviceGroupList$Response(params).pipe(
      map((r: StrictHttpResponse<SiteDeviceGroupList>) => r.body as SiteDeviceGroupList)
    );
  }

  /**
   * Path part for operation getSiteDeviceGroup
   */
  static readonly GetSiteDeviceGroupPath = '/aether/v2.1.x/{enterprise-id}/site/{site-id}/device-group/{device-group-id}';

  /**
   * GET /site/{site-id}/device-group Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSiteDeviceGroup()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSiteDeviceGroup$Response(params: {

    /**
     * enterprise-id (target in onos-config)
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {device-group-id}
     */
    'device-group-id': any;
  }): Observable<StrictHttpResponse<SiteDeviceGroup>> {

    const rb = new RequestBuilder(this.rootUrl, SiteDeviceGroupService.GetSiteDeviceGroupPath, 'get');
    if (params) {
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.path('device-group-id', params['device-group-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SiteDeviceGroup>;
      })
    );
  }

  /**
   * GET /site/{site-id}/device-group Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSiteDeviceGroup$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSiteDeviceGroup(params: {

    /**
     * enterprise-id (target in onos-config)
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {device-group-id}
     */
    'device-group-id': any;
  }): Observable<SiteDeviceGroup> {

    return this.getSiteDeviceGroup$Response(params).pipe(
      map((r: StrictHttpResponse<SiteDeviceGroup>) => r.body as SiteDeviceGroup)
    );
  }

  /**
   * Path part for operation getSiteDeviceGroupMbr
   */
  static readonly GetSiteDeviceGroupMbrPath = '/aether/v2.1.x/{enterprise-id}/site/{site-id}/device-group/{device-group-id}/mbr';

  /**
   * GET /site/{site-id}/device-group/{device-group-id}/mbr Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSiteDeviceGroupMbr()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSiteDeviceGroupMbr$Response(params: {

    /**
     * enterprise-id (target in onos-config)
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {device-group-id}
     */
    'device-group-id': any;
  }): Observable<StrictHttpResponse<SiteDeviceGroupMbr>> {

    const rb = new RequestBuilder(this.rootUrl, SiteDeviceGroupService.GetSiteDeviceGroupMbrPath, 'get');
    if (params) {
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.path('device-group-id', params['device-group-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SiteDeviceGroupMbr>;
      })
    );
  }

  /**
   * GET /site/{site-id}/device-group/{device-group-id}/mbr Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSiteDeviceGroupMbr$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSiteDeviceGroupMbr(params: {

    /**
     * enterprise-id (target in onos-config)
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {device-group-id}
     */
    'device-group-id': any;
  }): Observable<SiteDeviceGroupMbr> {

    return this.getSiteDeviceGroupMbr$Response(params).pipe(
      map((r: StrictHttpResponse<SiteDeviceGroupMbr>) => r.body as SiteDeviceGroupMbr)
    );
  }

}
