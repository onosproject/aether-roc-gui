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
import {EnterpriseEnterpriseSiteSliceDeviceGroup} from "../models/enterprise-enterprise-site-slice-device-group";


@Injectable({
  providedIn: 'root',
})
export class SliceSliceDeviceGroupService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getSliceSliceDeviceGroup
   */
  static readonly GetSliceSliceDeviceGroupPath = '/aether/v4.0.0/{target}/slice/slice/{id}/device-group/{device-group}';

  /**
   * GET /slice/slice/{id}/device-group.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSliceSliceDeviceGroup()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSliceSliceDeviceGroup$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {device-group}
     */
    'device-group': any;
  }): Observable<StrictHttpResponse<EnterpriseEnterpriseSiteSliceDeviceGroup>> {

    const rb = new RequestBuilder(this.rootUrl, SliceSliceDeviceGroupService.GetSliceSliceDeviceGroupPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
      rb.path('device-group', params['device-group'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterpriseEnterpriseSiteSliceDeviceGroup>;
      })
    );
  }

  /**
   * GET /slice/slice/{id}/device-group.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSliceSliceDeviceGroup$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSliceSliceDeviceGroup(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {device-group}
     */
    'device-group': any;
  }): Observable<EnterpriseEnterpriseSiteSliceDeviceGroup> {

    return this.getSliceSliceDeviceGroup$Response(params).pipe(
      map((r: StrictHttpResponse<EnterpriseEnterpriseSiteSliceDeviceGroup>) => r.body as EnterpriseEnterpriseSiteSliceDeviceGroup)
    );
  }

}
