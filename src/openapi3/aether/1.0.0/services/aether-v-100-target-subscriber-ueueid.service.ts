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

import { AetherV100TargetSubscriberUe } from '../models/aether-v-100-target-subscriber-ue';
import { AetherV100TargetSubscriberUeueidProfiles } from '../models/aether-v-100-target-subscriber-ueueid-profiles';
import { AetherV100TargetSubscriberUeueidServingPlmn } from '../models/aether-v-100-target-subscriber-ueueid-serving-plmn';

@Injectable({
  providedIn: 'root',
})
export class AetherV100TargetSubscriberUeueidService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAetherV100TargetSubscriberUe
   */
  static readonly GetAetherV100TargetSubscriberUePath = '/aether/v1.0.0/{target}/subscriber/ue/{ueid}';

  /**
   * GET /aether/v1.0.0/{target}/subscriber/ue Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAetherV100TargetSubscriberUe()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAetherV100TargetSubscriberUe$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {ueid}
     */
    ueid: any;

  }): Observable<StrictHttpResponse<AetherV100TargetSubscriberUe>> {

    const rb = new RequestBuilder(this.rootUrl, AetherV100TargetSubscriberUeueidService.GetAetherV100TargetSubscriberUePath, 'get');
    if (params) {

      rb.path('target', params.target, {});
      rb.path('ueid', params.ueid, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AetherV100TargetSubscriberUe>;
      })
    );
  }

  /**
   * GET /aether/v1.0.0/{target}/subscriber/ue Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAetherV100TargetSubscriberUe$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAetherV100TargetSubscriberUe(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {ueid}
     */
    ueid: any;

  }): Observable<AetherV100TargetSubscriberUe> {

    return this.getAetherV100TargetSubscriberUe$Response(params).pipe(
      map((r: StrictHttpResponse<AetherV100TargetSubscriberUe>) => r.body as AetherV100TargetSubscriberUe)
    );
  }

  /**
   * Path part for operation getAetherV100TargetSubscriberUeueidProfiles
   */
  static readonly GetAetherV100TargetSubscriberUeueidProfilesPath = '/aether/v1.0.0/{target}/subscriber/ue/{ueid}/profiles';

  /**
   * GET /aether/v1.0.0/{target}/subscriber/ue/{ueid}/profiles Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAetherV100TargetSubscriberUeueidProfiles()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAetherV100TargetSubscriberUeueidProfiles$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {ueid}
     */
    ueid: any;

  }): Observable<StrictHttpResponse<AetherV100TargetSubscriberUeueidProfiles>> {

    const rb = new RequestBuilder(this.rootUrl, AetherV100TargetSubscriberUeueidService.GetAetherV100TargetSubscriberUeueidProfilesPath, 'get');
    if (params) {

      rb.path('target', params.target, {});
      rb.path('ueid', params.ueid, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AetherV100TargetSubscriberUeueidProfiles>;
      })
    );
  }

  /**
   * GET /aether/v1.0.0/{target}/subscriber/ue/{ueid}/profiles Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAetherV100TargetSubscriberUeueidProfiles$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAetherV100TargetSubscriberUeueidProfiles(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {ueid}
     */
    ueid: any;

  }): Observable<AetherV100TargetSubscriberUeueidProfiles> {

    return this.getAetherV100TargetSubscriberUeueidProfiles$Response(params).pipe(
      map((r: StrictHttpResponse<AetherV100TargetSubscriberUeueidProfiles>) => r.body as AetherV100TargetSubscriberUeueidProfiles)
    );
  }

  /**
   * Path part for operation getAetherV100TargetSubscriberUeueidServingPlmn
   */
  static readonly GetAetherV100TargetSubscriberUeueidServingPlmnPath = '/aether/v1.0.0/{target}/subscriber/ue/{ueid}/serving-plmn';

  /**
   * GET /aether/v1.0.0/{target}/subscriber/ue/{ueid}/serving-plmn Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAetherV100TargetSubscriberUeueidServingPlmn()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAetherV100TargetSubscriberUeueidServingPlmn$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {ueid}
     */
    ueid: any;

  }): Observable<StrictHttpResponse<AetherV100TargetSubscriberUeueidServingPlmn>> {

    const rb = new RequestBuilder(this.rootUrl, AetherV100TargetSubscriberUeueidService.GetAetherV100TargetSubscriberUeueidServingPlmnPath, 'get');
    if (params) {

      rb.path('target', params.target, {});
      rb.path('ueid', params.ueid, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AetherV100TargetSubscriberUeueidServingPlmn>;
      })
    );
  }

  /**
   * GET /aether/v1.0.0/{target}/subscriber/ue/{ueid}/serving-plmn Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAetherV100TargetSubscriberUeueidServingPlmn$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAetherV100TargetSubscriberUeueidServingPlmn(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {ueid}
     */
    ueid: any;

  }): Observable<AetherV100TargetSubscriberUeueidServingPlmn> {

    return this.getAetherV100TargetSubscriberUeueidServingPlmn$Response(params).pipe(
      map((r: StrictHttpResponse<AetherV100TargetSubscriberUeueidServingPlmn>) => r.body as AetherV100TargetSubscriberUeueidServingPlmn)
    );
  }

}
