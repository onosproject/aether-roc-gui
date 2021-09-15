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

import { DeviceGroupDeviceGroupImsis } from '../models/device-group-device-group-imsis';

@Injectable({
  providedIn: 'root',
})
export class DeviceGroupDeviceGroupImsisService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getDeviceGroupDeviceGroupImsis
   */
  static readonly GetDeviceGroupDeviceGroupImsisPath = '/aether/v3.0.0/{target}/device-group/device-group/{id}/imsis/{name}';

  /**
   * GET /device-group/device-group/{id}/imsis.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDeviceGroupDeviceGroupImsis()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDeviceGroupDeviceGroupImsis$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {name}
     */
    name: any;
  }): Observable<StrictHttpResponse<DeviceGroupDeviceGroupImsis>> {

    const rb = new RequestBuilder(this.rootUrl, DeviceGroupDeviceGroupImsisService.GetDeviceGroupDeviceGroupImsisPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
      rb.path('name', params.name, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<DeviceGroupDeviceGroupImsis>;
      })
    );
  }

  /**
   * GET /device-group/device-group/{id}/imsis.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDeviceGroupDeviceGroupImsis$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDeviceGroupDeviceGroupImsis(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {name}
     */
    name: any;
  }): Observable<DeviceGroupDeviceGroupImsis> {

    return this.getDeviceGroupDeviceGroupImsis$Response(params).pipe(
      map((r: StrictHttpResponse<DeviceGroupDeviceGroupImsis>) => r.body as DeviceGroupDeviceGroupImsis)
    );
  }

}
