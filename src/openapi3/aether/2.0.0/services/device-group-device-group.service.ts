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
import {EnterpriseEnterpriseSiteDeviceGroup} from "../models/enterprise-enterprise-site-device-group";
import {EnterpriseEnterpriseSiteDeviceGroupDevice} from "../models/enterprise-enterprise-site-device-group-device";

@Injectable({
  providedIn: 'root',
})
export class DeviceGroupDeviceGroupService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getDeviceGroupDeviceGroup
   */
  static readonly GetDeviceGroupDeviceGroupPath = '/aether/v2.0.0/{target}/enterprises/enterprise/{ent_id}/site/{site_id}/device-group/{id}';

  /**
   * GET /device-group/device-group.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDeviceGroupDeviceGroup()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDeviceGroupDeviceGroup$Response(params: {

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

      /**
       * key {enterprise-id}
       */
      site_id: any;
  }): Observable<StrictHttpResponse<EnterpriseEnterpriseSiteDeviceGroup>> {

    const rb = new RequestBuilder(this.rootUrl, DeviceGroupDeviceGroupService.GetDeviceGroupDeviceGroupPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
        rb.path('ent_id', params['ent_id'], {});
        rb.path('site_id', params['site_id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterpriseEnterpriseSiteDeviceGroup>;
      })
    );
  }

  /**
   * GET /device-group/device-group.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDeviceGroupDeviceGroup$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDeviceGroupDeviceGroup(params: {

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

      /**
       * key {enterprise-id}
       */
      site_id: any;
  }): Observable<EnterpriseEnterpriseSiteDeviceGroup> {

    return this.getDeviceGroupDeviceGroup$Response(params).pipe(
      map((r: StrictHttpResponse<EnterpriseEnterpriseSiteDeviceGroup>) => r.body as EnterpriseEnterpriseSiteDeviceGroup)
    );
  }

  /**
   * Path part for operation getDeviceGroupDeviceGroupDevice
   */
  static readonly GetDeviceGroupDeviceGroupDevicePath = '/aether/v4.0.0/{target}/device-group/device-group/{id}/device';

  /**
   * GET /device-group/device-group/{id}/device.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDeviceGroupDeviceGroupDevice()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDeviceGroupDeviceGroupDevice$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<EnterpriseEnterpriseSiteDeviceGroupDevice>> {

    const rb = new RequestBuilder(this.rootUrl, DeviceGroupDeviceGroupService.GetDeviceGroupDeviceGroupDevicePath, 'get');
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
        return r as StrictHttpResponse<EnterpriseEnterpriseSiteDeviceGroupDevice>;
      })
    );
  }

  /**
   * GET /device-group/device-group/{id}/device.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDeviceGroupDeviceGroupDevice$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDeviceGroupDeviceGroupDevice(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<EnterpriseEnterpriseSiteDeviceGroupDevice> {

    return this.getDeviceGroupDeviceGroupDevice$Response(params).pipe(
      map((r: StrictHttpResponse<EnterpriseEnterpriseSiteDeviceGroupDevice>) => r.body as EnterpriseEnterpriseSiteDeviceGroupDevice)
    );
  }

}
