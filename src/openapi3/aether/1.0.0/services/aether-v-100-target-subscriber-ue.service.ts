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

import { AetherV100TargetSubscriberUeProfiles } from '../models/aether-v-100-target-subscriber-ue-profiles';
import { AetherV100TargetSubscriberUeServingPlmn } from '../models/aether-v-100-target-subscriber-ue-serving-plmn';

@Injectable({
  providedIn: 'root',
})
export class AetherV100TargetSubscriberUeService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAetherV100TargetSubscriberUeProfiles
   */
  static readonly GetAetherV100TargetSubscriberUeProfilesPath = '/aether/v1.0.0/{target}/subscriber/ue/{ueid}/profiles';

  /**
   * GET /aether/v1.0.0/{target}/subscriber/ue/profiles Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAetherV100TargetSubscriberUeProfiles()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAetherV100TargetSubscriberUeProfiles$Response(params: {

    /**
     * key for ue
     */
    ueid: any;

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<StrictHttpResponse<AetherV100TargetSubscriberUeProfiles>> {

    const rb = new RequestBuilder(this.rootUrl, AetherV100TargetSubscriberUeService.GetAetherV100TargetSubscriberUeProfilesPath, 'get');
    if (params) {

      rb.path('ueid', params.ueid, {});
      rb.path('target', params.target, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AetherV100TargetSubscriberUeProfiles>;
      })
    );
  }

  /**
   * GET /aether/v1.0.0/{target}/subscriber/ue/profiles Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAetherV100TargetSubscriberUeProfiles$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAetherV100TargetSubscriberUeProfiles(params: {

    /**
     * key for ue
     */
    ueid: any;

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<AetherV100TargetSubscriberUeProfiles> {

    return this.getAetherV100TargetSubscriberUeProfiles$Response(params).pipe(
      map((r: StrictHttpResponse<AetherV100TargetSubscriberUeProfiles>) => r.body as AetherV100TargetSubscriberUeProfiles)
    );
  }

  /**
   * Path part for operation getAetherV100TargetSubscriberUeServingPlmn
   */
  static readonly GetAetherV100TargetSubscriberUeServingPlmnPath = '/aether/v1.0.0/{target}/subscriber/ue/{ueid}/serving-plmn';

  /**
   * GET /aether/v1.0.0/{target}/subscriber/ue/serving-plmn Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAetherV100TargetSubscriberUeServingPlmn()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAetherV100TargetSubscriberUeServingPlmn$Response(params: {

    /**
     * key for ue
     */
    ueid: any;

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<StrictHttpResponse<AetherV100TargetSubscriberUeServingPlmn>> {

    const rb = new RequestBuilder(this.rootUrl, AetherV100TargetSubscriberUeService.GetAetherV100TargetSubscriberUeServingPlmnPath, 'get');
    if (params) {

      rb.path('ueid', params.ueid, {});
      rb.path('target', params.target, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AetherV100TargetSubscriberUeServingPlmn>;
      })
    );
  }

  /**
   * GET /aether/v1.0.0/{target}/subscriber/ue/serving-plmn Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAetherV100TargetSubscriberUeServingPlmn$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAetherV100TargetSubscriberUeServingPlmn(params: {

    /**
     * key for ue
     */
    ueid: any;

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<AetherV100TargetSubscriberUeServingPlmn> {

    return this.getAetherV100TargetSubscriberUeServingPlmn$Response(params).pipe(
      map((r: StrictHttpResponse<AetherV100TargetSubscriberUeServingPlmn>) => r.body as AetherV100TargetSubscriberUeServingPlmn)
    );
  }

}
