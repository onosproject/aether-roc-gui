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

import { QosProfileQosProfile } from '../models/qos-profile-qos-profile';
import { QosProfileQosProfileApnAmbr } from '../models/qos-profile-qos-profile-apn-ambr';
import { QosProfileQosProfileArp } from '../models/qos-profile-qos-profile-arp';

@Injectable({
  providedIn: 'root',
})
export class QosProfileQosProfileService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getQosProfileQosProfile
   */
  static readonly GetQosProfileQosProfilePath = '/aether/v2.1.0/{target}/qos-profile/qos-profile/{id}';

  /**
   * GET /qos-profile/qos-profile Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getQosProfileQosProfile()` instead.
   *
   * This method doesn't expect any request body.
   */
  getQosProfileQosProfile$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<QosProfileQosProfile>> {

    const rb = new RequestBuilder(this.rootUrl, QosProfileQosProfileService.GetQosProfileQosProfilePath, 'get');
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
        return r as StrictHttpResponse<QosProfileQosProfile>;
      })
    );
  }

  /**
   * GET /qos-profile/qos-profile Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getQosProfileQosProfile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getQosProfileQosProfile(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<QosProfileQosProfile> {

    return this.getQosProfileQosProfile$Response(params).pipe(
      map((r: StrictHttpResponse<QosProfileQosProfile>) => r.body as QosProfileQosProfile)
    );
  }

  /**
   * Path part for operation getQosProfileQosProfileApnAmbr
   */
  static readonly GetQosProfileQosProfileApnAmbrPath = '/aether/v2.1.0/{target}/qos-profile/qos-profile/{id}/apn-ambr';

  /**
   * GET /qos-profile/qos-profile/{id}/apn-ambr Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getQosProfileQosProfileApnAmbr()` instead.
   *
   * This method doesn't expect any request body.
   */
  getQosProfileQosProfileApnAmbr$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<QosProfileQosProfileApnAmbr>> {

    const rb = new RequestBuilder(this.rootUrl, QosProfileQosProfileService.GetQosProfileQosProfileApnAmbrPath, 'get');
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
        return r as StrictHttpResponse<QosProfileQosProfileApnAmbr>;
      })
    );
  }

  /**
   * GET /qos-profile/qos-profile/{id}/apn-ambr Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getQosProfileQosProfileApnAmbr$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getQosProfileQosProfileApnAmbr(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<QosProfileQosProfileApnAmbr> {

    return this.getQosProfileQosProfileApnAmbr$Response(params).pipe(
      map((r: StrictHttpResponse<QosProfileQosProfileApnAmbr>) => r.body as QosProfileQosProfileApnAmbr)
    );
  }

  /**
   * Path part for operation getQosProfileQosProfileArp
   */
  static readonly GetQosProfileQosProfileArpPath = '/aether/v2.1.0/{target}/qos-profile/qos-profile/{id}/arp';

  /**
   * GET /qos-profile/qos-profile/{id}/arp Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getQosProfileQosProfileArp()` instead.
   *
   * This method doesn't expect any request body.
   */
  getQosProfileQosProfileArp$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<QosProfileQosProfileArp>> {

    const rb = new RequestBuilder(this.rootUrl, QosProfileQosProfileService.GetQosProfileQosProfileArpPath, 'get');
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
        return r as StrictHttpResponse<QosProfileQosProfileArp>;
      })
    );
  }

  /**
   * GET /qos-profile/qos-profile/{id}/arp Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getQosProfileQosProfileArp$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getQosProfileQosProfileArp(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<QosProfileQosProfileArp> {

    return this.getQosProfileQosProfileArp$Response(params).pipe(
      map((r: StrictHttpResponse<QosProfileQosProfileArp>) => r.body as QosProfileQosProfileArp)
    );
  }

}
