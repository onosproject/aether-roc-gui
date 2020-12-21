// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { AetherV100TargetQosProfileQosProfile } from '../models/aether-v-100-target-qos-profile-qos-profile';
import { AetherV100TargetQosProfileQosProfileidApnAmbr } from '../models/aether-v-100-target-qos-profile-qos-profileid-apn-ambr';

@Injectable({
  providedIn: 'root',
})
export class AetherV100TargetQosProfileQosProfileidService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAetherV100TargetQosProfileQosProfile
   */
  static readonly GetAetherV100TargetQosProfileQosProfilePath = '/aether/v1.0.0/{target}/qos-profile/qos-profile/{id}';

  /**
   * GET /aether/v1.0.0/{target}/qos-profile/qos-profile Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAetherV100TargetQosProfileQosProfile()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAetherV100TargetQosProfileQosProfile$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

  }): Observable<StrictHttpResponse<AetherV100TargetQosProfileQosProfile>> {

    const rb = new RequestBuilder(this.rootUrl, AetherV100TargetQosProfileQosProfileidService.GetAetherV100TargetQosProfileQosProfilePath, 'get');
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
        return r as StrictHttpResponse<AetherV100TargetQosProfileQosProfile>;
      })
    );
  }

  /**
   * GET /aether/v1.0.0/{target}/qos-profile/qos-profile Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAetherV100TargetQosProfileQosProfile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAetherV100TargetQosProfileQosProfile(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

  }): Observable<AetherV100TargetQosProfileQosProfile> {

    return this.getAetherV100TargetQosProfileQosProfile$Response(params).pipe(
      map((r: StrictHttpResponse<AetherV100TargetQosProfileQosProfile>) => r.body as AetherV100TargetQosProfileQosProfile)
    );
  }

  /**
   * Path part for operation getAetherV100TargetQosProfileQosProfileidApnAmbr
   */
  static readonly GetAetherV100TargetQosProfileQosProfileidApnAmbrPath = '/aether/v1.0.0/{target}/qos-profile/qos-profile/{id}/apn-ambr';

  /**
   * GET /aether/v1.0.0/{target}/qos-profile/qos-profile/{id}/apn-ambr Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAetherV100TargetQosProfileQosProfileidApnAmbr()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAetherV100TargetQosProfileQosProfileidApnAmbr$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

  }): Observable<StrictHttpResponse<AetherV100TargetQosProfileQosProfileidApnAmbr>> {

    const rb = new RequestBuilder(this.rootUrl, AetherV100TargetQosProfileQosProfileidService.GetAetherV100TargetQosProfileQosProfileidApnAmbrPath, 'get');
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
        return r as StrictHttpResponse<AetherV100TargetQosProfileQosProfileidApnAmbr>;
      })
    );
  }

  /**
   * GET /aether/v1.0.0/{target}/qos-profile/qos-profile/{id}/apn-ambr Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAetherV100TargetQosProfileQosProfileidApnAmbr$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAetherV100TargetQosProfileQosProfileidApnAmbr(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

  }): Observable<AetherV100TargetQosProfileQosProfileidApnAmbr> {

    return this.getAetherV100TargetQosProfileQosProfileidApnAmbr$Response(params).pipe(
      map((r: StrictHttpResponse<AetherV100TargetQosProfileQosProfileidApnAmbr>) => r.body as AetherV100TargetQosProfileQosProfileidApnAmbr)
    );
  }

}
