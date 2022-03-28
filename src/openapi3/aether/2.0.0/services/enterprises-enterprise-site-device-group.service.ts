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

import { EnterprisesEnterpriseSiteDeviceGroup } from '../models/enterprises-enterprise-site-device-group';
import { EnterprisesEnterpriseSiteDeviceGroupList } from '../models/enterprises-enterprise-site-device-group-list';
import { EnterprisesEnterpriseSiteDeviceGroupMbr } from '../models/enterprises-enterprise-site-device-group-mbr';

@Injectable({
  providedIn: 'root',
})
export class EnterprisesEnterpriseSiteDeviceGroupService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteDeviceGroupList
   */
  static readonly GetEnterprisesEnterpriseSiteDeviceGroupListPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/device-group';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/device-group List.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSiteDeviceGroupList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteDeviceGroupList$Response(params: {

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
  }): Observable<StrictHttpResponse<Array<EnterprisesEnterpriseSiteDeviceGroupList>>> {

    const rb = new RequestBuilder(this.rootUrl, EnterprisesEnterpriseSiteDeviceGroupService.GetEnterprisesEnterpriseSiteDeviceGroupListPath, 'get');
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
        return r as StrictHttpResponse<Array<EnterprisesEnterpriseSiteDeviceGroupList>>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/device-group List.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSiteDeviceGroupList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteDeviceGroupList(params: {

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
  }): Observable<Array<EnterprisesEnterpriseSiteDeviceGroupList>> {

    return this.getEnterprisesEnterpriseSiteDeviceGroupList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<EnterprisesEnterpriseSiteDeviceGroupList>>) => r.body as Array<EnterprisesEnterpriseSiteDeviceGroupList>)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteDeviceGroup
   */
  static readonly GetEnterprisesEnterpriseSiteDeviceGroupPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/device-group/{device-group-id}';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/device-group Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSiteDeviceGroup()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteDeviceGroup$Response(params: {

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
     * key {device-group-id}
     */
    'device-group-id': any;
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteDeviceGroup>> {

    const rb = new RequestBuilder(this.rootUrl, EnterprisesEnterpriseSiteDeviceGroupService.GetEnterprisesEnterpriseSiteDeviceGroupPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
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
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteDeviceGroup>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/device-group Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSiteDeviceGroup$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteDeviceGroup(params: {

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
     * key {device-group-id}
     */
    'device-group-id': any;
  }): Observable<EnterprisesEnterpriseSiteDeviceGroup> {

    return this.getEnterprisesEnterpriseSiteDeviceGroup$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteDeviceGroup>) => r.body as EnterprisesEnterpriseSiteDeviceGroup)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteDeviceGroupMbr
   */
  static readonly GetEnterprisesEnterpriseSiteDeviceGroupMbrPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/device-group/{device-group-id}/mbr';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/device-group/{device-group-id}/mbr Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSiteDeviceGroupMbr()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteDeviceGroupMbr$Response(params: {

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
     * key {device-group-id}
     */
    'device-group-id': any;
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteDeviceGroupMbr>> {

    const rb = new RequestBuilder(this.rootUrl, EnterprisesEnterpriseSiteDeviceGroupService.GetEnterprisesEnterpriseSiteDeviceGroupMbrPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
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
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteDeviceGroupMbr>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/device-group/{device-group-id}/mbr Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSiteDeviceGroupMbr$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteDeviceGroupMbr(params: {

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
     * key {device-group-id}
     */
    'device-group-id': any;
  }): Observable<EnterprisesEnterpriseSiteDeviceGroupMbr> {

    return this.getEnterprisesEnterpriseSiteDeviceGroupMbr$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteDeviceGroupMbr>) => r.body as EnterprisesEnterpriseSiteDeviceGroupMbr)
    );
  }

}
