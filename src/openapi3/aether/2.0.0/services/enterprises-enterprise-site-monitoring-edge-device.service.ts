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

import { EnterprisesEnterpriseSiteMonitoringEdgeDevice } from '../models/enterprises-enterprise-site-monitoring-edge-device';
import { EnterprisesEnterpriseSiteMonitoringEdgeDeviceList } from '../models/enterprises-enterprise-site-monitoring-edge-device-list';

@Injectable({
  providedIn: 'root',
})
export class EnterprisesEnterpriseSiteMonitoringEdgeDeviceService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteMonitoringEdgeDevice
   */
  static readonly GetEnterprisesEnterpriseSiteMonitoringEdgeDevicePath = '/aether/v2.0.0/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/monitoring/edge-device/{edge-device-id}';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/monitoring/edge-device.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSiteMonitoringEdgeDevice()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteMonitoringEdgeDevice$Response(params: {

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
     * key {edge-device-id}
     */
    'edge-device-id': any;
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteMonitoringEdgeDevice>> {

    const rb = new RequestBuilder(this.rootUrl, EnterprisesEnterpriseSiteMonitoringEdgeDeviceService.GetEnterprisesEnterpriseSiteMonitoringEdgeDevicePath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.path('edge-device-id', params['edge-device-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteMonitoringEdgeDevice>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/monitoring/edge-device.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSiteMonitoringEdgeDevice$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteMonitoringEdgeDevice(params: {

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
     * key {edge-device-id}
     */
    'edge-device-id': any;
  }): Observable<EnterprisesEnterpriseSiteMonitoringEdgeDevice> {

    return this.getEnterprisesEnterpriseSiteMonitoringEdgeDevice$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteMonitoringEdgeDevice>) => r.body as EnterprisesEnterpriseSiteMonitoringEdgeDevice)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteMonitoringEdgeDeviceList
   */
  static readonly GetEnterprisesEnterpriseSiteMonitoringEdgeDeviceListPath = '/aether/v2.0.0/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/monitoring/edge-device';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/monitoring/edge-device.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSiteMonitoringEdgeDeviceList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteMonitoringEdgeDeviceList$Response(params: {

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
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteMonitoringEdgeDeviceList>> {

    const rb = new RequestBuilder(this.rootUrl, EnterprisesEnterpriseSiteMonitoringEdgeDeviceService.GetEnterprisesEnterpriseSiteMonitoringEdgeDeviceListPath, 'get');
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
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteMonitoringEdgeDeviceList>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/monitoring/edge-device.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSiteMonitoringEdgeDeviceList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteMonitoringEdgeDeviceList(params: {

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
  }): Observable<EnterprisesEnterpriseSiteMonitoringEdgeDeviceList> {

    return this.getEnterprisesEnterpriseSiteMonitoringEdgeDeviceList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteMonitoringEdgeDeviceList>) => r.body as EnterprisesEnterpriseSiteMonitoringEdgeDeviceList)
    );
  }

}
