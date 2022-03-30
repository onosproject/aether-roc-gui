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

import { EnterprisesEnterpriseSiteDevice } from '../models/enterprises-enterprise-site-device';
import { EnterprisesEnterpriseSiteDeviceList } from '../models/enterprises-enterprise-site-device-list';

@Injectable({
  providedIn: 'root',
})
export class EnterprisesEnterpriseSiteDeviceService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteDeviceList
   */
  static readonly GetEnterprisesEnterpriseSiteDeviceListPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/device';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/device List.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSiteDeviceList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteDeviceList$Response(params: {

    /**
<<<<<<< HEAD
     * target (device in onos-config)
=======
     * target (target in onos-config)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
  }): Observable<StrictHttpResponse<Array<EnterprisesEnterpriseSiteDeviceList>>> {
=======
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteDeviceList>> {
>>>>>>> e357b5d... Aether-3394 handle null values in responses

    const rb = new RequestBuilder(this.rootUrl, EnterprisesEnterpriseSiteDeviceService.GetEnterprisesEnterpriseSiteDeviceListPath, 'get');
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
<<<<<<< HEAD
        return r as StrictHttpResponse<Array<EnterprisesEnterpriseSiteDeviceList>>;
=======
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteDeviceList>;
>>>>>>> e357b5d... Aether-3394 handle null values in responses
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/device List.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSiteDeviceList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteDeviceList(params: {

    /**
<<<<<<< HEAD
     * target (device in onos-config)
=======
     * target (target in onos-config)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
  }): Observable<Array<EnterprisesEnterpriseSiteDeviceList>> {

    return this.getEnterprisesEnterpriseSiteDeviceList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<EnterprisesEnterpriseSiteDeviceList>>) => r.body as Array<EnterprisesEnterpriseSiteDeviceList>)
=======
  }): Observable<EnterprisesEnterpriseSiteDeviceList> {

    return this.getEnterprisesEnterpriseSiteDeviceList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteDeviceList>) => r.body as EnterprisesEnterpriseSiteDeviceList)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteDevice
   */
  static readonly GetEnterprisesEnterpriseSiteDevicePath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/device/{device-id}';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/device Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSiteDevice()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteDevice$Response(params: {

    /**
     * target (target in onos-config)
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
     * key {device-id}
     */
    'device-id': any;
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteDevice>> {

    const rb = new RequestBuilder(this.rootUrl, EnterprisesEnterpriseSiteDeviceService.GetEnterprisesEnterpriseSiteDevicePath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.path('device-id', params['device-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteDevice>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/device Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSiteDevice$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteDevice(params: {

    /**
     * target (target in onos-config)
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
     * key {device-id}
     */
    'device-id': any;
  }): Observable<EnterprisesEnterpriseSiteDevice> {

    return this.getEnterprisesEnterpriseSiteDevice$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteDevice>) => r.body as EnterprisesEnterpriseSiteDevice)
    );
  }

}
