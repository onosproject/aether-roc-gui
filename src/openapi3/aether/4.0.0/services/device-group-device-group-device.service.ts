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

import { DeviceGroupDeviceGroupDeviceMbr } from '../models/device-group-device-group-device-mbr';

@Injectable({
  providedIn: 'root',
})
export class DeviceGroupDeviceGroupDeviceService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getDeviceGroupDeviceGroupDeviceMbr
   */
  static readonly GetDeviceGroupDeviceGroupDeviceMbrPath = '/aether/v4.0.0/{target}/device-group/device-group/{id}/device/mbr';

  /**
   * GET /device-group/device-group/{id}/device/mbr.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDeviceGroupDeviceGroupDeviceMbr()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDeviceGroupDeviceGroupDeviceMbr$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<DeviceGroupDeviceGroupDeviceMbr>> {

    const rb = new RequestBuilder(this.rootUrl, DeviceGroupDeviceGroupDeviceService.GetDeviceGroupDeviceGroupDeviceMbrPath, 'get');
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
        return r as StrictHttpResponse<DeviceGroupDeviceGroupDeviceMbr>;
      })
    );
  }

  /**
   * GET /device-group/device-group/{id}/device/mbr.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDeviceGroupDeviceGroupDeviceMbr$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDeviceGroupDeviceGroupDeviceMbr(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<DeviceGroupDeviceGroupDeviceMbr> {

    return this.getDeviceGroupDeviceGroupDeviceMbr$Response(params).pipe(
      map((r: StrictHttpResponse<DeviceGroupDeviceGroupDeviceMbr>) => r.body as DeviceGroupDeviceGroupDeviceMbr)
    );
  }

}
