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

import { EnterprisesEnterpriseSiteSliceDeviceGroup } from '../models/enterprises-enterprise-site-slice-device-group';

@Injectable({
  providedIn: 'root',
})
export class EnterprisesEnterpriseSiteSliceDeviceGroupService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteSliceDeviceGroup
   */
  static readonly GetEnterprisesEnterpriseSiteSliceDeviceGroupPath = '/aether/v2.0.0/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/device-group/{device-group}';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/device-group.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSiteSliceDeviceGroup()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteSliceDeviceGroup$Response(params: {

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

    /**
     * key {device-group}
     */
    'device-group': any;
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteSliceDeviceGroup>> {

    const rb = new RequestBuilder(this.rootUrl, EnterprisesEnterpriseSiteSliceDeviceGroupService.GetEnterprisesEnterpriseSiteSliceDeviceGroupPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.path('slice-id', params['slice-id'], {});
      rb.path('device-group', params['device-group'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteSliceDeviceGroup>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/device-group.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSiteSliceDeviceGroup$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteSliceDeviceGroup(params: {

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

    /**
     * key {device-group}
     */
    'device-group': any;
  }): Observable<EnterprisesEnterpriseSiteSliceDeviceGroup> {

    return this.getEnterprisesEnterpriseSiteSliceDeviceGroup$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteSliceDeviceGroup>) => r.body as EnterprisesEnterpriseSiteSliceDeviceGroup)
    );
  }

}
