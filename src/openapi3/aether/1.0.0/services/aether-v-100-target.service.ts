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

import { AetherV100TargetAccessProfile } from '../models/aether-v-100-target-access-profile';
import { AetherV100TargetApnProfile } from '../models/aether-v-100-target-apn-profile';
import { AetherV100TargetQosProfile } from '../models/aether-v-100-target-qos-profile';
import { AetherV100TargetSubscriber } from '../models/aether-v-100-target-subscriber';
import { AetherV100TargetUpProfile } from '../models/aether-v-100-target-up-profile';

@Injectable({
  providedIn: 'root',
})
export class AetherV100TargetService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAetherV100TargetAccessProfile
   */
  static readonly GetAetherV100TargetAccessProfilePath = '/aether/v1.0.0/{target}/access-profile';

  /**
   * GET /aether/v1.0.0/{target}/access-profile Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAetherV100TargetAccessProfile()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAetherV100TargetAccessProfile$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<StrictHttpResponse<AetherV100TargetAccessProfile>> {

    const rb = new RequestBuilder(this.rootUrl, AetherV100TargetService.GetAetherV100TargetAccessProfilePath, 'get');
    if (params) {

      rb.path('target', params.target, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AetherV100TargetAccessProfile>;
      })
    );
  }

  /**
   * GET /aether/v1.0.0/{target}/access-profile Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAetherV100TargetAccessProfile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAetherV100TargetAccessProfile(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<AetherV100TargetAccessProfile> {

    return this.getAetherV100TargetAccessProfile$Response(params).pipe(
      map((r: StrictHttpResponse<AetherV100TargetAccessProfile>) => r.body as AetherV100TargetAccessProfile)
    );
  }

  /**
   * Path part for operation getAetherV100TargetApnProfile
   */
  static readonly GetAetherV100TargetApnProfilePath = '/aether/v1.0.0/{target}/apn-profile';

  /**
   * GET /aether/v1.0.0/{target}/apn-profile Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAetherV100TargetApnProfile()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAetherV100TargetApnProfile$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<StrictHttpResponse<AetherV100TargetApnProfile>> {

    const rb = new RequestBuilder(this.rootUrl, AetherV100TargetService.GetAetherV100TargetApnProfilePath, 'get');
    if (params) {

      rb.path('target', params.target, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AetherV100TargetApnProfile>;
      })
    );
  }

  /**
   * GET /aether/v1.0.0/{target}/apn-profile Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAetherV100TargetApnProfile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAetherV100TargetApnProfile(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<AetherV100TargetApnProfile> {

    return this.getAetherV100TargetApnProfile$Response(params).pipe(
      map((r: StrictHttpResponse<AetherV100TargetApnProfile>) => r.body as AetherV100TargetApnProfile)
    );
  }

  /**
   * Path part for operation getAetherV100TargetQosProfile
   */
  static readonly GetAetherV100TargetQosProfilePath = '/aether/v1.0.0/{target}/qos-profile';

  /**
   * GET /aether/v1.0.0/{target}/qos-profile Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAetherV100TargetQosProfile()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAetherV100TargetQosProfile$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<StrictHttpResponse<AetherV100TargetQosProfile>> {

    const rb = new RequestBuilder(this.rootUrl, AetherV100TargetService.GetAetherV100TargetQosProfilePath, 'get');
    if (params) {

      rb.path('target', params.target, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AetherV100TargetQosProfile>;
      })
    );
  }

  /**
   * GET /aether/v1.0.0/{target}/qos-profile Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAetherV100TargetQosProfile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAetherV100TargetQosProfile(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<AetherV100TargetQosProfile> {

    return this.getAetherV100TargetQosProfile$Response(params).pipe(
      map((r: StrictHttpResponse<AetherV100TargetQosProfile>) => r.body as AetherV100TargetQosProfile)
    );
  }

  /**
   * Path part for operation getAetherV100TargetSubscriber
   */
  static readonly GetAetherV100TargetSubscriberPath = '/aether/v1.0.0/{target}/subscriber';

  /**
   * GET /aether/v1.0.0/{target}/subscriber Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAetherV100TargetSubscriber()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAetherV100TargetSubscriber$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<StrictHttpResponse<AetherV100TargetSubscriber>> {

    const rb = new RequestBuilder(this.rootUrl, AetherV100TargetService.GetAetherV100TargetSubscriberPath, 'get');
    if (params) {

      rb.path('target', params.target, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AetherV100TargetSubscriber>;
      })
    );
  }

  /**
   * GET /aether/v1.0.0/{target}/subscriber Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAetherV100TargetSubscriber$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAetherV100TargetSubscriber(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<AetherV100TargetSubscriber> {

    return this.getAetherV100TargetSubscriber$Response(params).pipe(
      map((r: StrictHttpResponse<AetherV100TargetSubscriber>) => r.body as AetherV100TargetSubscriber)
    );
  }

  /**
   * Path part for operation getAetherV100TargetUpProfile
   */
  static readonly GetAetherV100TargetUpProfilePath = '/aether/v1.0.0/{target}/up-profile';

  /**
   * GET /aether/v1.0.0/{target}/up-profile Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAetherV100TargetUpProfile()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAetherV100TargetUpProfile$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<StrictHttpResponse<AetherV100TargetUpProfile>> {

    const rb = new RequestBuilder(this.rootUrl, AetherV100TargetService.GetAetherV100TargetUpProfilePath, 'get');
    if (params) {

      rb.path('target', params.target, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AetherV100TargetUpProfile>;
      })
    );
  }

  /**
   * GET /aether/v1.0.0/{target}/up-profile Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAetherV100TargetUpProfile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAetherV100TargetUpProfile(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<AetherV100TargetUpProfile> {

    return this.getAetherV100TargetUpProfile$Response(params).pipe(
      map((r: StrictHttpResponse<AetherV100TargetUpProfile>) => r.body as AetherV100TargetUpProfile)
    );
  }

}
