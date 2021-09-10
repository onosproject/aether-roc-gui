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

import { DeviceGroupDeviceGroup } from '../models/device-group-device-group';

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
  static readonly GetDeviceGroupDeviceGroupPath = '/aether/v3.0.0/{target}/device-group/device-group/{id}';

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
  }): Observable<StrictHttpResponse<DeviceGroupDeviceGroup>> {

    const rb = new RequestBuilder(this.rootUrl, DeviceGroupDeviceGroupService.GetDeviceGroupDeviceGroupPath, 'get');
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
        return r as StrictHttpResponse<DeviceGroupDeviceGroup>;
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
  }): Observable<DeviceGroupDeviceGroup> {

    return this.getDeviceGroupDeviceGroup$Response(params).pipe(
      map((r: StrictHttpResponse<DeviceGroupDeviceGroup>) => r.body as DeviceGroupDeviceGroup)
    );
  }

}
