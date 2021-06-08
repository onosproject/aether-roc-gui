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

import { DeviceModelListDeviceModelList } from '../models/device-model-list-device-model-list';

@Injectable({
  providedIn: 'root',
})
export class DeviceModelListDeviceModelListService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getDeviceModelListDeviceModelList
   */
  static readonly GetDeviceModelListDeviceModelListPath = '/aether/v3.0.0/{target}/device-model-list/device-model-list/{id}';

  /**
   * GET /device-model-list/device-model-list Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDeviceModelListDeviceModelList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDeviceModelListDeviceModelList$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<DeviceModelListDeviceModelList>> {

    const rb = new RequestBuilder(this.rootUrl, DeviceModelListDeviceModelListService.GetDeviceModelListDeviceModelListPath, 'get');
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
        return r as StrictHttpResponse<DeviceModelListDeviceModelList>;
      })
    );
  }

  /**
   * GET /device-model-list/device-model-list Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDeviceModelListDeviceModelList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDeviceModelListDeviceModelList(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<DeviceModelListDeviceModelList> {

    return this.getDeviceModelListDeviceModelList$Response(params).pipe(
      map((r: StrictHttpResponse<DeviceModelListDeviceModelList>) => r.body as DeviceModelListDeviceModelList)
    );
  }

}
