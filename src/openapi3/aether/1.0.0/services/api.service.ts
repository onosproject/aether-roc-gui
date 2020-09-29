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
import { AetherV100TargetAccessProfileAccessProfile } from '../models/aether-v-100-target-access-profile-access-profile';
import { AetherV100TargetApnProfile } from '../models/aether-v-100-target-apn-profile';
import { AetherV100TargetApnProfileApnProfile } from '../models/aether-v-100-target-apn-profile-apn-profile';
import { AetherV100TargetQosProfile } from '../models/aether-v-100-target-qos-profile';
import { AetherV100TargetQosProfileQosProfile } from '../models/aether-v-100-target-qos-profile-qos-profile';
import { AetherV100TargetQosProfileQosProfileApnAmbr } from '../models/aether-v-100-target-qos-profile-qos-profile-apn-ambr';
import { AetherV100TargetSubscriber } from '../models/aether-v-100-target-subscriber';
import { AetherV100TargetSubscriberUe } from '../models/aether-v-100-target-subscriber-ue';
import { AetherV100TargetSubscriberUeProfiles } from '../models/aether-v-100-target-subscriber-ue-profiles';
import { AetherV100TargetSubscriberUeProfilesAccessProfile } from '../models/aether-v-100-target-subscriber-ue-profiles-access-profile';
import { AetherV100TargetSubscriberUeServingPlmn } from '../models/aether-v-100-target-subscriber-ue-serving-plmn';
import { AetherV100TargetUpProfile } from '../models/aether-v-100-target-up-profile';
import { AetherV100TargetUpProfileUpProfile } from '../models/aether-v-100-target-up-profile-up-profile';

@Injectable({
  providedIn: 'root',
})
export class ApiService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation postAetherV100TargetAccessProfile
   */
  static readonly PostAetherV100TargetAccessProfilePath = '/aether/v1.0.0/{target}/access-profile';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postAetherV100TargetAccessProfile()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postAetherV100TargetAccessProfile$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  
    /**
     * AccessProfile
     */
    body?: AetherV100TargetAccessProfile
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostAetherV100TargetAccessProfilePath, 'post');
    if (params) {

      rb.path('target', params.target, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postAetherV100TargetAccessProfile$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postAetherV100TargetAccessProfile(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  
    /**
     * AccessProfile
     */
    body?: AetherV100TargetAccessProfile
  }): Observable<void> {

    return this.postAetherV100TargetAccessProfile$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteAetherV100TargetAccessProfile
   */
  static readonly DeleteAetherV100TargetAccessProfilePath = '/aether/v1.0.0/{target}/access-profile';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteAetherV100TargetAccessProfile()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAetherV100TargetAccessProfile$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteAetherV100TargetAccessProfilePath, 'delete');
    if (params) {

      rb.path('target', params.target, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteAetherV100TargetAccessProfile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAetherV100TargetAccessProfile(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<void> {

    return this.deleteAetherV100TargetAccessProfile$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postAetherV100TargetAccessProfileAccessProfile
   */
  static readonly PostAetherV100TargetAccessProfileAccessProfilePath = '/aether/v1.0.0/{target}/access-profile/access-profile/{id}';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postAetherV100TargetAccessProfileAccessProfile()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postAetherV100TargetAccessProfileAccessProfile$Response(params: {

    /**
     * key for access-profile
     */
    id: any;

    /**
     * target (device in onos-config)
     */
    target: any;
  
    /**
     * AccessProfileAccessProfile
     */
    body?: AetherV100TargetAccessProfileAccessProfile
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostAetherV100TargetAccessProfileAccessProfilePath, 'post');
    if (params) {

      rb.path('id', params.id, {});
      rb.path('target', params.target, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postAetherV100TargetAccessProfileAccessProfile$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postAetherV100TargetAccessProfileAccessProfile(params: {

    /**
     * key for access-profile
     */
    id: any;

    /**
     * target (device in onos-config)
     */
    target: any;
  
    /**
     * AccessProfileAccessProfile
     */
    body?: AetherV100TargetAccessProfileAccessProfile
  }): Observable<void> {

    return this.postAetherV100TargetAccessProfileAccessProfile$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteAetherV100TargetAccessProfileAccessProfile
   */
  static readonly DeleteAetherV100TargetAccessProfileAccessProfilePath = '/aether/v1.0.0/{target}/access-profile/access-profile/{id}';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteAetherV100TargetAccessProfileAccessProfile()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAetherV100TargetAccessProfileAccessProfile$Response(params: {

    /**
     * key for access-profile
     */
    id: any;

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteAetherV100TargetAccessProfileAccessProfilePath, 'delete');
    if (params) {

      rb.path('id', params.id, {});
      rb.path('target', params.target, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteAetherV100TargetAccessProfileAccessProfile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAetherV100TargetAccessProfileAccessProfile(params: {

    /**
     * key for access-profile
     */
    id: any;

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<void> {

    return this.deleteAetherV100TargetAccessProfileAccessProfile$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postAetherV100TargetApnProfile
   */
  static readonly PostAetherV100TargetApnProfilePath = '/aether/v1.0.0/{target}/apn-profile';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postAetherV100TargetApnProfile()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postAetherV100TargetApnProfile$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  
    /**
     * ApnProfile
     */
    body?: AetherV100TargetApnProfile
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostAetherV100TargetApnProfilePath, 'post');
    if (params) {

      rb.path('target', params.target, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postAetherV100TargetApnProfile$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postAetherV100TargetApnProfile(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  
    /**
     * ApnProfile
     */
    body?: AetherV100TargetApnProfile
  }): Observable<void> {

    return this.postAetherV100TargetApnProfile$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteAetherV100TargetApnProfile
   */
  static readonly DeleteAetherV100TargetApnProfilePath = '/aether/v1.0.0/{target}/apn-profile';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteAetherV100TargetApnProfile()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAetherV100TargetApnProfile$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteAetherV100TargetApnProfilePath, 'delete');
    if (params) {

      rb.path('target', params.target, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteAetherV100TargetApnProfile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAetherV100TargetApnProfile(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<void> {

    return this.deleteAetherV100TargetApnProfile$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postAetherV100TargetApnProfileApnProfile
   */
  static readonly PostAetherV100TargetApnProfileApnProfilePath = '/aether/v1.0.0/{target}/apn-profile/apn-profile/{id}';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postAetherV100TargetApnProfileApnProfile()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postAetherV100TargetApnProfileApnProfile$Response(params: {

    /**
     * key for apn-profile
     */
    id: any;

    /**
     * target (device in onos-config)
     */
    target: any;
  
    /**
     * ApnProfileApnProfile
     */
    body?: AetherV100TargetApnProfileApnProfile
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostAetherV100TargetApnProfileApnProfilePath, 'post');
    if (params) {

      rb.path('id', params.id, {});
      rb.path('target', params.target, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postAetherV100TargetApnProfileApnProfile$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postAetherV100TargetApnProfileApnProfile(params: {

    /**
     * key for apn-profile
     */
    id: any;

    /**
     * target (device in onos-config)
     */
    target: any;
  
    /**
     * ApnProfileApnProfile
     */
    body?: AetherV100TargetApnProfileApnProfile
  }): Observable<void> {

    return this.postAetherV100TargetApnProfileApnProfile$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteAetherV100TargetApnProfileApnProfile
   */
  static readonly DeleteAetherV100TargetApnProfileApnProfilePath = '/aether/v1.0.0/{target}/apn-profile/apn-profile/{id}';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteAetherV100TargetApnProfileApnProfile()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAetherV100TargetApnProfileApnProfile$Response(params: {

    /**
     * key for apn-profile
     */
    id: any;

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteAetherV100TargetApnProfileApnProfilePath, 'delete');
    if (params) {

      rb.path('id', params.id, {});
      rb.path('target', params.target, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteAetherV100TargetApnProfileApnProfile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAetherV100TargetApnProfileApnProfile(params: {

    /**
     * key for apn-profile
     */
    id: any;

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<void> {

    return this.deleteAetherV100TargetApnProfileApnProfile$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postAetherV100TargetQosProfile
   */
  static readonly PostAetherV100TargetQosProfilePath = '/aether/v1.0.0/{target}/qos-profile';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postAetherV100TargetQosProfile()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postAetherV100TargetQosProfile$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  
    /**
     * QosProfile
     */
    body?: AetherV100TargetQosProfile
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostAetherV100TargetQosProfilePath, 'post');
    if (params) {

      rb.path('target', params.target, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postAetherV100TargetQosProfile$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postAetherV100TargetQosProfile(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  
    /**
     * QosProfile
     */
    body?: AetherV100TargetQosProfile
  }): Observable<void> {

    return this.postAetherV100TargetQosProfile$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteAetherV100TargetQosProfile
   */
  static readonly DeleteAetherV100TargetQosProfilePath = '/aether/v1.0.0/{target}/qos-profile';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteAetherV100TargetQosProfile()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAetherV100TargetQosProfile$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteAetherV100TargetQosProfilePath, 'delete');
    if (params) {

      rb.path('target', params.target, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteAetherV100TargetQosProfile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAetherV100TargetQosProfile(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<void> {

    return this.deleteAetherV100TargetQosProfile$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postAetherV100TargetQosProfileQosProfile
   */
  static readonly PostAetherV100TargetQosProfileQosProfilePath = '/aether/v1.0.0/{target}/qos-profile/qos-profile/{id}';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postAetherV100TargetQosProfileQosProfile()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postAetherV100TargetQosProfileQosProfile$Response(params: {

    /**
     * key for qos-profile
     */
    id: any;

    /**
     * target (device in onos-config)
     */
    target: any;
  
    /**
     * QosProfileQosProfile
     */
    body?: AetherV100TargetQosProfileQosProfile
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostAetherV100TargetQosProfileQosProfilePath, 'post');
    if (params) {

      rb.path('id', params.id, {});
      rb.path('target', params.target, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postAetherV100TargetQosProfileQosProfile$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postAetherV100TargetQosProfileQosProfile(params: {

    /**
     * key for qos-profile
     */
    id: any;

    /**
     * target (device in onos-config)
     */
    target: any;
  
    /**
     * QosProfileQosProfile
     */
    body?: AetherV100TargetQosProfileQosProfile
  }): Observable<void> {

    return this.postAetherV100TargetQosProfileQosProfile$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteAetherV100TargetQosProfileQosProfile
   */
  static readonly DeleteAetherV100TargetQosProfileQosProfilePath = '/aether/v1.0.0/{target}/qos-profile/qos-profile/{id}';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteAetherV100TargetQosProfileQosProfile()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAetherV100TargetQosProfileQosProfile$Response(params: {

    /**
     * key for qos-profile
     */
    id: any;

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteAetherV100TargetQosProfileQosProfilePath, 'delete');
    if (params) {

      rb.path('id', params.id, {});
      rb.path('target', params.target, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteAetherV100TargetQosProfileQosProfile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAetherV100TargetQosProfileQosProfile(params: {

    /**
     * key for qos-profile
     */
    id: any;

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<void> {

    return this.deleteAetherV100TargetQosProfileQosProfile$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postAetherV100TargetQosProfileQosProfileApnAmbr
   */
  static readonly PostAetherV100TargetQosProfileQosProfileApnAmbrPath = '/aether/v1.0.0/{target}/qos-profile/qos-profile/{id}/apn-ambr';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postAetherV100TargetQosProfileQosProfileApnAmbr()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postAetherV100TargetQosProfileQosProfileApnAmbr$Response(params: {

    /**
     * key for qos-profile
     */
    id: any;

    /**
     * target (device in onos-config)
     */
    target: any;
  
    /**
     * QosProfileQosProfileApnAmbr
     */
    body?: AetherV100TargetQosProfileQosProfileApnAmbr
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostAetherV100TargetQosProfileQosProfileApnAmbrPath, 'post');
    if (params) {

      rb.path('id', params.id, {});
      rb.path('target', params.target, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postAetherV100TargetQosProfileQosProfileApnAmbr$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postAetherV100TargetQosProfileQosProfileApnAmbr(params: {

    /**
     * key for qos-profile
     */
    id: any;

    /**
     * target (device in onos-config)
     */
    target: any;
  
    /**
     * QosProfileQosProfileApnAmbr
     */
    body?: AetherV100TargetQosProfileQosProfileApnAmbr
  }): Observable<void> {

    return this.postAetherV100TargetQosProfileQosProfileApnAmbr$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteAetherV100TargetQosProfileQosProfileApnAmbr
   */
  static readonly DeleteAetherV100TargetQosProfileQosProfileApnAmbrPath = '/aether/v1.0.0/{target}/qos-profile/qos-profile/{id}/apn-ambr';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteAetherV100TargetQosProfileQosProfileApnAmbr()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAetherV100TargetQosProfileQosProfileApnAmbr$Response(params: {

    /**
     * key for qos-profile
     */
    id: any;

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteAetherV100TargetQosProfileQosProfileApnAmbrPath, 'delete');
    if (params) {

      rb.path('id', params.id, {});
      rb.path('target', params.target, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteAetherV100TargetQosProfileQosProfileApnAmbr$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAetherV100TargetQosProfileQosProfileApnAmbr(params: {

    /**
     * key for qos-profile
     */
    id: any;

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<void> {

    return this.deleteAetherV100TargetQosProfileQosProfileApnAmbr$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postAetherV100TargetSubscriber
   */
  static readonly PostAetherV100TargetSubscriberPath = '/aether/v1.0.0/{target}/subscriber';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postAetherV100TargetSubscriber()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postAetherV100TargetSubscriber$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  
    /**
     * Subscriber
     */
    body?: AetherV100TargetSubscriber
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostAetherV100TargetSubscriberPath, 'post');
    if (params) {

      rb.path('target', params.target, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postAetherV100TargetSubscriber$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postAetherV100TargetSubscriber(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  
    /**
     * Subscriber
     */
    body?: AetherV100TargetSubscriber
  }): Observable<void> {

    return this.postAetherV100TargetSubscriber$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteAetherV100TargetSubscriber
   */
  static readonly DeleteAetherV100TargetSubscriberPath = '/aether/v1.0.0/{target}/subscriber';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteAetherV100TargetSubscriber()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAetherV100TargetSubscriber$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteAetherV100TargetSubscriberPath, 'delete');
    if (params) {

      rb.path('target', params.target, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteAetherV100TargetSubscriber$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAetherV100TargetSubscriber(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<void> {

    return this.deleteAetherV100TargetSubscriber$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postAetherV100TargetSubscriberUe
   */
  static readonly PostAetherV100TargetSubscriberUePath = '/aether/v1.0.0/{target}/subscriber/ue/{ueid}';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postAetherV100TargetSubscriberUe()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postAetherV100TargetSubscriberUe$Response(params: {

    /**
     * key for ue
     */
    ueid: any;

    /**
     * target (device in onos-config)
     */
    target: any;
  
    /**
     * SubscriberUe
     */
    body?: AetherV100TargetSubscriberUe
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostAetherV100TargetSubscriberUePath, 'post');
    if (params) {

      rb.path('ueid', params.ueid, {});
      rb.path('target', params.target, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postAetherV100TargetSubscriberUe$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postAetherV100TargetSubscriberUe(params: {

    /**
     * key for ue
     */
    ueid: any;

    /**
     * target (device in onos-config)
     */
    target: any;
  
    /**
     * SubscriberUe
     */
    body?: AetherV100TargetSubscriberUe
  }): Observable<void> {

    return this.postAetherV100TargetSubscriberUe$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteAetherV100TargetSubscriberUe
   */
  static readonly DeleteAetherV100TargetSubscriberUePath = '/aether/v1.0.0/{target}/subscriber/ue/{ueid}';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteAetherV100TargetSubscriberUe()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAetherV100TargetSubscriberUe$Response(params: {

    /**
     * key for ue
     */
    ueid: any;

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteAetherV100TargetSubscriberUePath, 'delete');
    if (params) {

      rb.path('ueid', params.ueid, {});
      rb.path('target', params.target, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteAetherV100TargetSubscriberUe$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAetherV100TargetSubscriberUe(params: {

    /**
     * key for ue
     */
    ueid: any;

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<void> {

    return this.deleteAetherV100TargetSubscriberUe$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postAetherV100TargetSubscriberUeProfiles
   */
  static readonly PostAetherV100TargetSubscriberUeProfilesPath = '/aether/v1.0.0/{target}/subscriber/ue/{ueid}/profiles';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postAetherV100TargetSubscriberUeProfiles()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postAetherV100TargetSubscriberUeProfiles$Response(params: {

    /**
     * key for ue
     */
    ueid: any;

    /**
     * target (device in onos-config)
     */
    target: any;
  
    /**
     * SubscriberUeProfiles
     */
    body?: AetherV100TargetSubscriberUeProfiles
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostAetherV100TargetSubscriberUeProfilesPath, 'post');
    if (params) {

      rb.path('ueid', params.ueid, {});
      rb.path('target', params.target, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postAetherV100TargetSubscriberUeProfiles$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postAetherV100TargetSubscriberUeProfiles(params: {

    /**
     * key for ue
     */
    ueid: any;

    /**
     * target (device in onos-config)
     */
    target: any;
  
    /**
     * SubscriberUeProfiles
     */
    body?: AetherV100TargetSubscriberUeProfiles
  }): Observable<void> {

    return this.postAetherV100TargetSubscriberUeProfiles$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteAetherV100TargetSubscriberUeProfiles
   */
  static readonly DeleteAetherV100TargetSubscriberUeProfilesPath = '/aether/v1.0.0/{target}/subscriber/ue/{ueid}/profiles';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteAetherV100TargetSubscriberUeProfiles()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAetherV100TargetSubscriberUeProfiles$Response(params: {

    /**
     * key for ue
     */
    ueid: any;

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteAetherV100TargetSubscriberUeProfilesPath, 'delete');
    if (params) {

      rb.path('ueid', params.ueid, {});
      rb.path('target', params.target, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteAetherV100TargetSubscriberUeProfiles$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAetherV100TargetSubscriberUeProfiles(params: {

    /**
     * key for ue
     */
    ueid: any;

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<void> {

    return this.deleteAetherV100TargetSubscriberUeProfiles$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postAetherV100TargetSubscriberUeProfilesAccessProfile
   */
  static readonly PostAetherV100TargetSubscriberUeProfilesAccessProfilePath = '/aether/v1.0.0/{target}/subscriber/ue/{ueid}/profiles/access-profile/{access-profile}';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postAetherV100TargetSubscriberUeProfilesAccessProfile()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postAetherV100TargetSubscriberUeProfilesAccessProfile$Response(params: {

    /**
     * key for ue
     */
    ueid: any;

    /**
     * key for access-profile
     */
    'access-profile': any;

    /**
     * target (device in onos-config)
     */
    target: any;
  
    /**
     * SubscriberUeProfilesAccessProfile
     */
    body?: AetherV100TargetSubscriberUeProfilesAccessProfile
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostAetherV100TargetSubscriberUeProfilesAccessProfilePath, 'post');
    if (params) {

      rb.path('ueid', params.ueid, {});
      rb.path('access-profile', params['access-profile'], {});
      rb.path('target', params.target, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postAetherV100TargetSubscriberUeProfilesAccessProfile$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postAetherV100TargetSubscriberUeProfilesAccessProfile(params: {

    /**
     * key for ue
     */
    ueid: any;

    /**
     * key for access-profile
     */
    'access-profile': any;

    /**
     * target (device in onos-config)
     */
    target: any;
  
    /**
     * SubscriberUeProfilesAccessProfile
     */
    body?: AetherV100TargetSubscriberUeProfilesAccessProfile
  }): Observable<void> {

    return this.postAetherV100TargetSubscriberUeProfilesAccessProfile$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteAetherV100TargetSubscriberUeProfilesAccessProfile
   */
  static readonly DeleteAetherV100TargetSubscriberUeProfilesAccessProfilePath = '/aether/v1.0.0/{target}/subscriber/ue/{ueid}/profiles/access-profile/{access-profile}';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteAetherV100TargetSubscriberUeProfilesAccessProfile()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAetherV100TargetSubscriberUeProfilesAccessProfile$Response(params: {

    /**
     * key for ue
     */
    ueid: any;

    /**
     * key for access-profile
     */
    'access-profile': any;

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteAetherV100TargetSubscriberUeProfilesAccessProfilePath, 'delete');
    if (params) {

      rb.path('ueid', params.ueid, {});
      rb.path('access-profile', params['access-profile'], {});
      rb.path('target', params.target, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteAetherV100TargetSubscriberUeProfilesAccessProfile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAetherV100TargetSubscriberUeProfilesAccessProfile(params: {

    /**
     * key for ue
     */
    ueid: any;

    /**
     * key for access-profile
     */
    'access-profile': any;

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<void> {

    return this.deleteAetherV100TargetSubscriberUeProfilesAccessProfile$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postAetherV100TargetSubscriberUeServingPlmn
   */
  static readonly PostAetherV100TargetSubscriberUeServingPlmnPath = '/aether/v1.0.0/{target}/subscriber/ue/{ueid}/serving-plmn';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postAetherV100TargetSubscriberUeServingPlmn()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postAetherV100TargetSubscriberUeServingPlmn$Response(params: {

    /**
     * key for ue
     */
    ueid: any;

    /**
     * target (device in onos-config)
     */
    target: any;
  
    /**
     * SubscriberUeServingPlmn
     */
    body?: AetherV100TargetSubscriberUeServingPlmn
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostAetherV100TargetSubscriberUeServingPlmnPath, 'post');
    if (params) {

      rb.path('ueid', params.ueid, {});
      rb.path('target', params.target, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postAetherV100TargetSubscriberUeServingPlmn$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postAetherV100TargetSubscriberUeServingPlmn(params: {

    /**
     * key for ue
     */
    ueid: any;

    /**
     * target (device in onos-config)
     */
    target: any;
  
    /**
     * SubscriberUeServingPlmn
     */
    body?: AetherV100TargetSubscriberUeServingPlmn
  }): Observable<void> {

    return this.postAetherV100TargetSubscriberUeServingPlmn$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteAetherV100TargetSubscriberUeServingPlmn
   */
  static readonly DeleteAetherV100TargetSubscriberUeServingPlmnPath = '/aether/v1.0.0/{target}/subscriber/ue/{ueid}/serving-plmn';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteAetherV100TargetSubscriberUeServingPlmn()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAetherV100TargetSubscriberUeServingPlmn$Response(params: {

    /**
     * key for ue
     */
    ueid: any;

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteAetherV100TargetSubscriberUeServingPlmnPath, 'delete');
    if (params) {

      rb.path('ueid', params.ueid, {});
      rb.path('target', params.target, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteAetherV100TargetSubscriberUeServingPlmn$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAetherV100TargetSubscriberUeServingPlmn(params: {

    /**
     * key for ue
     */
    ueid: any;

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<void> {

    return this.deleteAetherV100TargetSubscriberUeServingPlmn$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postAetherV100TargetUpProfile
   */
  static readonly PostAetherV100TargetUpProfilePath = '/aether/v1.0.0/{target}/up-profile';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postAetherV100TargetUpProfile()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postAetherV100TargetUpProfile$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  
    /**
     * UpProfile
     */
    body?: AetherV100TargetUpProfile
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostAetherV100TargetUpProfilePath, 'post');
    if (params) {

      rb.path('target', params.target, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postAetherV100TargetUpProfile$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postAetherV100TargetUpProfile(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  
    /**
     * UpProfile
     */
    body?: AetherV100TargetUpProfile
  }): Observable<void> {

    return this.postAetherV100TargetUpProfile$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteAetherV100TargetUpProfile
   */
  static readonly DeleteAetherV100TargetUpProfilePath = '/aether/v1.0.0/{target}/up-profile';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteAetherV100TargetUpProfile()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAetherV100TargetUpProfile$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteAetherV100TargetUpProfilePath, 'delete');
    if (params) {

      rb.path('target', params.target, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteAetherV100TargetUpProfile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAetherV100TargetUpProfile(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<void> {

    return this.deleteAetherV100TargetUpProfile$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postAetherV100TargetUpProfileUpProfile
   */
  static readonly PostAetherV100TargetUpProfileUpProfilePath = '/aether/v1.0.0/{target}/up-profile/up-profile/{id}';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postAetherV100TargetUpProfileUpProfile()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postAetherV100TargetUpProfileUpProfile$Response(params: {

    /**
     * key for up-profile
     */
    id: any;

    /**
     * target (device in onos-config)
     */
    target: any;
  
    /**
     * UpProfileUpProfile
     */
    body?: AetherV100TargetUpProfileUpProfile
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostAetherV100TargetUpProfileUpProfilePath, 'post');
    if (params) {

      rb.path('id', params.id, {});
      rb.path('target', params.target, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postAetherV100TargetUpProfileUpProfile$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postAetherV100TargetUpProfileUpProfile(params: {

    /**
     * key for up-profile
     */
    id: any;

    /**
     * target (device in onos-config)
     */
    target: any;
  
    /**
     * UpProfileUpProfile
     */
    body?: AetherV100TargetUpProfileUpProfile
  }): Observable<void> {

    return this.postAetherV100TargetUpProfileUpProfile$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteAetherV100TargetUpProfileUpProfile
   */
  static readonly DeleteAetherV100TargetUpProfileUpProfilePath = '/aether/v1.0.0/{target}/up-profile/up-profile/{id}';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteAetherV100TargetUpProfileUpProfile()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAetherV100TargetUpProfileUpProfile$Response(params: {

    /**
     * key for up-profile
     */
    id: any;

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteAetherV100TargetUpProfileUpProfilePath, 'delete');
    if (params) {

      rb.path('id', params.id, {});
      rb.path('target', params.target, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteAetherV100TargetUpProfileUpProfile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAetherV100TargetUpProfileUpProfile(params: {

    /**
     * key for up-profile
     */
    id: any;

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<void> {

    return this.deleteAetherV100TargetUpProfileUpProfile$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
