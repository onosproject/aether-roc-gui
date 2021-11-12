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

import { SiteSiteMonitoringEdgeDevice } from '../models/site-site-monitoring-edge-device';

@Injectable({
  providedIn: 'root',
})
export class SiteSiteMonitoringEdgeDeviceService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getSiteSiteMonitoringEdgeDevice
   */
  static readonly GetSiteSiteMonitoringEdgeDevicePath = '/aether/v4.0.0/{target}/site/site/{id}/monitoring/edge-device/{edge-device-id}';

  /**
   * GET /site/site/{id}/monitoring/edge-device.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSiteSiteMonitoringEdgeDevice()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSiteSiteMonitoringEdgeDevice$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {edge-device-id}
     */
    'edge-device-id': any;
  }): Observable<StrictHttpResponse<SiteSiteMonitoringEdgeDevice>> {

    const rb = new RequestBuilder(this.rootUrl, SiteSiteMonitoringEdgeDeviceService.GetSiteSiteMonitoringEdgeDevicePath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
      rb.path('edge-device-id', params['edge-device-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SiteSiteMonitoringEdgeDevice>;
      })
    );
  }

  /**
   * GET /site/site/{id}/monitoring/edge-device.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSiteSiteMonitoringEdgeDevice$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSiteSiteMonitoringEdgeDevice(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {edge-device-id}
     */
    'edge-device-id': any;
  }): Observable<SiteSiteMonitoringEdgeDevice> {

    return this.getSiteSiteMonitoringEdgeDevice$Response(params).pipe(
      map((r: StrictHttpResponse<SiteSiteMonitoringEdgeDevice>) => r.body as SiteSiteMonitoringEdgeDevice)
    );
  }

}
