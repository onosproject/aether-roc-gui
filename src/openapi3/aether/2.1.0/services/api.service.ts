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

import { AccessProfile } from '../models/access-profile';
import { AccessProfileAccessProfile } from '../models/access-profile-access-profile';
import { ApnProfile } from '../models/apn-profile';
import { ApnProfileApnProfile } from '../models/apn-profile-apn-profile';
import { ConnectivityService } from '../models/connectivity-service';
import { ConnectivityServiceConnectivityService } from '../models/connectivity-service-connectivity-service';
import { Enterprise } from '../models/enterprise';
import { EnterpriseEnterprise } from '../models/enterprise-enterprise';
import { EnterpriseEnterpriseConnectivityService } from '../models/enterprise-enterprise-connectivity-service';
import { QosProfile } from '../models/qos-profile';
import { QosProfileQosProfile } from '../models/qos-profile-qos-profile';
import { QosProfileQosProfileApnAmbr } from '../models/qos-profile-qos-profile-apn-ambr';
import { QosProfileQosProfileArp } from '../models/qos-profile-qos-profile-arp';
import { SecurityProfile } from '../models/security-profile';
import { SecurityProfileSecurityProfile } from '../models/security-profile-security-profile';
import { ServiceGroup } from '../models/service-group';
import { ServiceGroupServiceGroup } from '../models/service-group-service-group';
import { ServiceGroupServiceGroupServicePolicies } from '../models/service-group-service-group-service-policies';
import { ServicePolicy } from '../models/service-policy';
import { ServicePolicyServicePolicy } from '../models/service-policy-service-policy';
import { ServicePolicyServicePolicyAmbr } from '../models/service-policy-service-policy-ambr';
import { ServicePolicyServicePolicyRules } from '../models/service-policy-service-policy-rules';
import { ServiceRule } from '../models/service-rule';
import { ServiceRuleServiceRule } from '../models/service-rule-service-rule';
import { ServiceRuleServiceRuleFlow } from '../models/service-rule-service-rule-flow';
import { ServiceRuleServiceRuleQos } from '../models/service-rule-service-rule-qos';
import { ServiceRuleServiceRuleQosAggregateMaximumBitrate } from '../models/service-rule-service-rule-qos-aggregate-maximum-bitrate';
import { ServiceRuleServiceRuleQosArp } from '../models/service-rule-service-rule-qos-arp';
import { ServiceRuleServiceRuleQosGuaranteedBitrate } from '../models/service-rule-service-rule-qos-guaranteed-bitrate';
import { ServiceRuleServiceRuleQosMaximumRequestedBandwidth } from '../models/service-rule-service-rule-qos-maximum-requested-bandwidth';
import { Subscriber } from '../models/subscriber';
import { SubscriberUe } from '../models/subscriber-ue';
import { SubscriberUeProfiles } from '../models/subscriber-ue-profiles';
import { SubscriberUeProfilesAccessProfile } from '../models/subscriber-ue-profiles-access-profile';
import { SubscriberUeServingPlmn } from '../models/subscriber-ue-serving-plmn';
import { UpProfile } from '../models/up-profile';
import { UpProfileUpProfile } from '../models/up-profile-up-profile';

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
   * Path part for operation postAccessProfile
   */
  static readonly PostAccessProfilePath = '/aether/v2.1.0/{target}/access-profile';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postAccessProfile()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postAccessProfile$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
    body?: AccessProfile
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostAccessProfilePath, 'post');
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
   * To access the full response (for headers, for example), `postAccessProfile$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postAccessProfile(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
    body?: AccessProfile
  }): Observable<void> {

    return this.postAccessProfile$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteAccessProfile
   */
  static readonly DeleteAccessProfilePath = '/aether/v2.1.0/{target}/access-profile';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteAccessProfile()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAccessProfile$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteAccessProfilePath, 'delete');
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
   * To access the full response (for headers, for example), `deleteAccessProfile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAccessProfile(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<void> {

    return this.deleteAccessProfile$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postAccessProfileAccessProfile
   */
  static readonly PostAccessProfileAccessProfilePath = '/aether/v2.1.0/{target}/access-profile/access-profile/{id}';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postAccessProfileAccessProfile()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postAccessProfileAccessProfile$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: AccessProfileAccessProfile
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostAccessProfileAccessProfilePath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `postAccessProfileAccessProfile$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postAccessProfileAccessProfile(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: AccessProfileAccessProfile
  }): Observable<void> {

    return this.postAccessProfileAccessProfile$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteAccessProfileAccessProfile
   */
  static readonly DeleteAccessProfileAccessProfilePath = '/aether/v2.1.0/{target}/access-profile/access-profile/{id}';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteAccessProfileAccessProfile()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAccessProfileAccessProfile$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteAccessProfileAccessProfilePath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `deleteAccessProfileAccessProfile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAccessProfileAccessProfile(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<void> {

    return this.deleteAccessProfileAccessProfile$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postApnProfile
   */
  static readonly PostApnProfilePath = '/aether/v2.1.0/{target}/apn-profile';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postApnProfile()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postApnProfile$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
    body?: ApnProfile
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostApnProfilePath, 'post');
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
   * To access the full response (for headers, for example), `postApnProfile$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postApnProfile(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
    body?: ApnProfile
  }): Observable<void> {

    return this.postApnProfile$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteApnProfile
   */
  static readonly DeleteApnProfilePath = '/aether/v2.1.0/{target}/apn-profile';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteApnProfile()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteApnProfile$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteApnProfilePath, 'delete');
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
   * To access the full response (for headers, for example), `deleteApnProfile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteApnProfile(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<void> {

    return this.deleteApnProfile$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postApnProfileApnProfile
   */
  static readonly PostApnProfileApnProfilePath = '/aether/v2.1.0/{target}/apn-profile/apn-profile/{id}';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postApnProfileApnProfile()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postApnProfileApnProfile$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: ApnProfileApnProfile
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostApnProfileApnProfilePath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `postApnProfileApnProfile$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postApnProfileApnProfile(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: ApnProfileApnProfile
  }): Observable<void> {

    return this.postApnProfileApnProfile$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteApnProfileApnProfile
   */
  static readonly DeleteApnProfileApnProfilePath = '/aether/v2.1.0/{target}/apn-profile/apn-profile/{id}';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteApnProfileApnProfile()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteApnProfileApnProfile$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteApnProfileApnProfilePath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `deleteApnProfileApnProfile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteApnProfileApnProfile(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<void> {

    return this.deleteApnProfileApnProfile$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postConnectivityService
   */
  static readonly PostConnectivityServicePath = '/aether/v2.1.0/{target}/connectivity-service';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postConnectivityService()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postConnectivityService$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
    body?: ConnectivityService
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostConnectivityServicePath, 'post');
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
   * To access the full response (for headers, for example), `postConnectivityService$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postConnectivityService(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
    body?: ConnectivityService
  }): Observable<void> {

    return this.postConnectivityService$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteConnectivityService
   */
  static readonly DeleteConnectivityServicePath = '/aether/v2.1.0/{target}/connectivity-service';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteConnectivityService()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteConnectivityService$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteConnectivityServicePath, 'delete');
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
   * To access the full response (for headers, for example), `deleteConnectivityService$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteConnectivityService(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<void> {

    return this.deleteConnectivityService$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postConnectivityServiceConnectivityService
   */
  static readonly PostConnectivityServiceConnectivityServicePath = '/aether/v2.1.0/{target}/connectivity-service/connectivity-service/{id}';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postConnectivityServiceConnectivityService()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postConnectivityServiceConnectivityService$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: ConnectivityServiceConnectivityService
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostConnectivityServiceConnectivityServicePath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `postConnectivityServiceConnectivityService$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postConnectivityServiceConnectivityService(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: ConnectivityServiceConnectivityService
  }): Observable<void> {

    return this.postConnectivityServiceConnectivityService$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteConnectivityServiceConnectivityService
   */
  static readonly DeleteConnectivityServiceConnectivityServicePath = '/aether/v2.1.0/{target}/connectivity-service/connectivity-service/{id}';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteConnectivityServiceConnectivityService()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteConnectivityServiceConnectivityService$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteConnectivityServiceConnectivityServicePath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `deleteConnectivityServiceConnectivityService$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteConnectivityServiceConnectivityService(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<void> {

    return this.deleteConnectivityServiceConnectivityService$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postEnterprise
   */
  static readonly PostEnterprisePath = '/aether/v2.1.0/{target}/enterprise';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postEnterprise()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterprise$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
    body?: Enterprise
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostEnterprisePath, 'post');
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
   * To access the full response (for headers, for example), `postEnterprise$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterprise(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
    body?: Enterprise
  }): Observable<void> {

    return this.postEnterprise$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteEnterprise
   */
  static readonly DeleteEnterprisePath = '/aether/v2.1.0/{target}/enterprise';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteEnterprise()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterprise$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteEnterprisePath, 'delete');
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
   * To access the full response (for headers, for example), `deleteEnterprise$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterprise(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<void> {

    return this.deleteEnterprise$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postEnterpriseEnterprise
   */
  static readonly PostEnterpriseEnterprisePath = '/aether/v2.1.0/{target}/enterprise/enterprise/{id}';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postEnterpriseEnterprise()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterpriseEnterprise$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: EnterpriseEnterprise
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostEnterpriseEnterprisePath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `postEnterpriseEnterprise$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterpriseEnterprise(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: EnterpriseEnterprise
  }): Observable<void> {

    return this.postEnterpriseEnterprise$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteEnterpriseEnterprise
   */
  static readonly DeleteEnterpriseEnterprisePath = '/aether/v2.1.0/{target}/enterprise/enterprise/{id}';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteEnterpriseEnterprise()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterpriseEnterprise$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteEnterpriseEnterprisePath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `deleteEnterpriseEnterprise$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterpriseEnterprise(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<void> {

    return this.deleteEnterpriseEnterprise$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postEnterpriseEnterpriseConnectivityService
   */
  static readonly PostEnterpriseEnterpriseConnectivityServicePath = '/aether/v2.1.0/{target}/enterprise/enterprise/{id}/connectivity-service/{connectivity-service}';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postEnterpriseEnterpriseConnectivityService()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterpriseEnterpriseConnectivityService$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {connectivity-service}
     */
    'connectivity-service': any;
    body?: EnterpriseEnterpriseConnectivityService
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostEnterpriseEnterpriseConnectivityServicePath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
      rb.path('connectivity-service', params['connectivity-service'], {});
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
   * To access the full response (for headers, for example), `postEnterpriseEnterpriseConnectivityService$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterpriseEnterpriseConnectivityService(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {connectivity-service}
     */
    'connectivity-service': any;
    body?: EnterpriseEnterpriseConnectivityService
  }): Observable<void> {

    return this.postEnterpriseEnterpriseConnectivityService$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteEnterpriseEnterpriseConnectivityService
   */
  static readonly DeleteEnterpriseEnterpriseConnectivityServicePath = '/aether/v2.1.0/{target}/enterprise/enterprise/{id}/connectivity-service/{connectivity-service}';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteEnterpriseEnterpriseConnectivityService()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterpriseEnterpriseConnectivityService$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {connectivity-service}
     */
    'connectivity-service': any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteEnterpriseEnterpriseConnectivityServicePath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
      rb.path('connectivity-service', params['connectivity-service'], {});
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
   * To access the full response (for headers, for example), `deleteEnterpriseEnterpriseConnectivityService$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterpriseEnterpriseConnectivityService(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {connectivity-service}
     */
    'connectivity-service': any;
  }): Observable<void> {

    return this.deleteEnterpriseEnterpriseConnectivityService$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postQosProfile
   */
  static readonly PostQosProfilePath = '/aether/v2.1.0/{target}/qos-profile';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postQosProfile()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postQosProfile$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
    body?: QosProfile
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostQosProfilePath, 'post');
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
   * To access the full response (for headers, for example), `postQosProfile$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postQosProfile(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
    body?: QosProfile
  }): Observable<void> {

    return this.postQosProfile$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteQosProfile
   */
  static readonly DeleteQosProfilePath = '/aether/v2.1.0/{target}/qos-profile';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteQosProfile()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteQosProfile$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteQosProfilePath, 'delete');
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
   * To access the full response (for headers, for example), `deleteQosProfile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteQosProfile(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<void> {

    return this.deleteQosProfile$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postQosProfileQosProfile
   */
  static readonly PostQosProfileQosProfilePath = '/aether/v2.1.0/{target}/qos-profile/qos-profile/{id}';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postQosProfileQosProfile()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postQosProfileQosProfile$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: QosProfileQosProfile
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostQosProfileQosProfilePath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `postQosProfileQosProfile$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postQosProfileQosProfile(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: QosProfileQosProfile
  }): Observable<void> {

    return this.postQosProfileQosProfile$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteQosProfileQosProfile
   */
  static readonly DeleteQosProfileQosProfilePath = '/aether/v2.1.0/{target}/qos-profile/qos-profile/{id}';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteQosProfileQosProfile()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteQosProfileQosProfile$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteQosProfileQosProfilePath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `deleteQosProfileQosProfile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteQosProfileQosProfile(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<void> {

    return this.deleteQosProfileQosProfile$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postQosProfileQosProfileApnAmbr
   */
  static readonly PostQosProfileQosProfileApnAmbrPath = '/aether/v2.1.0/{target}/qos-profile/qos-profile/{id}/apn-ambr';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postQosProfileQosProfileApnAmbr()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postQosProfileQosProfileApnAmbr$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: QosProfileQosProfileApnAmbr
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostQosProfileQosProfileApnAmbrPath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `postQosProfileQosProfileApnAmbr$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postQosProfileQosProfileApnAmbr(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: QosProfileQosProfileApnAmbr
  }): Observable<void> {

    return this.postQosProfileQosProfileApnAmbr$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteQosProfileQosProfileApnAmbr
   */
  static readonly DeleteQosProfileQosProfileApnAmbrPath = '/aether/v2.1.0/{target}/qos-profile/qos-profile/{id}/apn-ambr';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteQosProfileQosProfileApnAmbr()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteQosProfileQosProfileApnAmbr$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteQosProfileQosProfileApnAmbrPath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `deleteQosProfileQosProfileApnAmbr$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteQosProfileQosProfileApnAmbr(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<void> {

    return this.deleteQosProfileQosProfileApnAmbr$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postQosProfileQosProfileArp
   */
  static readonly PostQosProfileQosProfileArpPath = '/aether/v2.1.0/{target}/qos-profile/qos-profile/{id}/arp';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postQosProfileQosProfileArp()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postQosProfileQosProfileArp$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: QosProfileQosProfileArp
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostQosProfileQosProfileArpPath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `postQosProfileQosProfileArp$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postQosProfileQosProfileArp(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: QosProfileQosProfileArp
  }): Observable<void> {

    return this.postQosProfileQosProfileArp$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteQosProfileQosProfileArp
   */
  static readonly DeleteQosProfileQosProfileArpPath = '/aether/v2.1.0/{target}/qos-profile/qos-profile/{id}/arp';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteQosProfileQosProfileArp()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteQosProfileQosProfileArp$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteQosProfileQosProfileArpPath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `deleteQosProfileQosProfileArp$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteQosProfileQosProfileArp(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<void> {

    return this.deleteQosProfileQosProfileArp$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postSecurityProfile
   */
  static readonly PostSecurityProfilePath = '/aether/v2.1.0/{target}/security-profile';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postSecurityProfile()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postSecurityProfile$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
    body?: SecurityProfile
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostSecurityProfilePath, 'post');
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
   * To access the full response (for headers, for example), `postSecurityProfile$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postSecurityProfile(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
    body?: SecurityProfile
  }): Observable<void> {

    return this.postSecurityProfile$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteSecurityProfile
   */
  static readonly DeleteSecurityProfilePath = '/aether/v2.1.0/{target}/security-profile';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteSecurityProfile()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSecurityProfile$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteSecurityProfilePath, 'delete');
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
   * To access the full response (for headers, for example), `deleteSecurityProfile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSecurityProfile(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<void> {

    return this.deleteSecurityProfile$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postSecurityProfileSecurityProfile
   */
  static readonly PostSecurityProfileSecurityProfilePath = '/aether/v2.1.0/{target}/security-profile/security-profile/{id}';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postSecurityProfileSecurityProfile()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postSecurityProfileSecurityProfile$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: SecurityProfileSecurityProfile
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostSecurityProfileSecurityProfilePath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `postSecurityProfileSecurityProfile$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postSecurityProfileSecurityProfile(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: SecurityProfileSecurityProfile
  }): Observable<void> {

    return this.postSecurityProfileSecurityProfile$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteSecurityProfileSecurityProfile
   */
  static readonly DeleteSecurityProfileSecurityProfilePath = '/aether/v2.1.0/{target}/security-profile/security-profile/{id}';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteSecurityProfileSecurityProfile()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSecurityProfileSecurityProfile$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteSecurityProfileSecurityProfilePath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `deleteSecurityProfileSecurityProfile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSecurityProfileSecurityProfile(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<void> {

    return this.deleteSecurityProfileSecurityProfile$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postServiceGroup
   */
  static readonly PostServiceGroupPath = '/aether/v2.1.0/{target}/service-group';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postServiceGroup()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postServiceGroup$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
    body?: ServiceGroup
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostServiceGroupPath, 'post');
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
   * To access the full response (for headers, for example), `postServiceGroup$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postServiceGroup(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
    body?: ServiceGroup
  }): Observable<void> {

    return this.postServiceGroup$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteServiceGroup
   */
  static readonly DeleteServiceGroupPath = '/aether/v2.1.0/{target}/service-group';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteServiceGroup()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteServiceGroup$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteServiceGroupPath, 'delete');
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
   * To access the full response (for headers, for example), `deleteServiceGroup$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteServiceGroup(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<void> {

    return this.deleteServiceGroup$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postServiceGroupServiceGroup
   */
  static readonly PostServiceGroupServiceGroupPath = '/aether/v2.1.0/{target}/service-group/service-group/{id}';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postServiceGroupServiceGroup()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postServiceGroupServiceGroup$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: ServiceGroupServiceGroup
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostServiceGroupServiceGroupPath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `postServiceGroupServiceGroup$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postServiceGroupServiceGroup(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: ServiceGroupServiceGroup
  }): Observable<void> {

    return this.postServiceGroupServiceGroup$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteServiceGroupServiceGroup
   */
  static readonly DeleteServiceGroupServiceGroupPath = '/aether/v2.1.0/{target}/service-group/service-group/{id}';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteServiceGroupServiceGroup()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteServiceGroupServiceGroup$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteServiceGroupServiceGroupPath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `deleteServiceGroupServiceGroup$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteServiceGroupServiceGroup(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<void> {

    return this.deleteServiceGroupServiceGroup$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postServiceGroupServiceGroupServicePolicies
   */
  static readonly PostServiceGroupServiceGroupServicePoliciesPath = '/aether/v2.1.0/{target}/service-group/service-group/{id}/service-policies/{service-policy}';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postServiceGroupServiceGroupServicePolicies()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postServiceGroupServiceGroupServicePolicies$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {service-policy}
     */
    'service-policy': any;
    body?: ServiceGroupServiceGroupServicePolicies
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostServiceGroupServiceGroupServicePoliciesPath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
      rb.path('service-policy', params['service-policy'], {});
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
   * To access the full response (for headers, for example), `postServiceGroupServiceGroupServicePolicies$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postServiceGroupServiceGroupServicePolicies(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {service-policy}
     */
    'service-policy': any;
    body?: ServiceGroupServiceGroupServicePolicies
  }): Observable<void> {

    return this.postServiceGroupServiceGroupServicePolicies$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteServiceGroupServiceGroupServicePolicies
   */
  static readonly DeleteServiceGroupServiceGroupServicePoliciesPath = '/aether/v2.1.0/{target}/service-group/service-group/{id}/service-policies/{service-policy}';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteServiceGroupServiceGroupServicePolicies()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteServiceGroupServiceGroupServicePolicies$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {service-policy}
     */
    'service-policy': any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteServiceGroupServiceGroupServicePoliciesPath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
      rb.path('service-policy', params['service-policy'], {});
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
   * To access the full response (for headers, for example), `deleteServiceGroupServiceGroupServicePolicies$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteServiceGroupServiceGroupServicePolicies(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {service-policy}
     */
    'service-policy': any;
  }): Observable<void> {

    return this.deleteServiceGroupServiceGroupServicePolicies$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postServicePolicy
   */
  static readonly PostServicePolicyPath = '/aether/v2.1.0/{target}/service-policy';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postServicePolicy()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postServicePolicy$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
    body?: ServicePolicy
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostServicePolicyPath, 'post');
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
   * To access the full response (for headers, for example), `postServicePolicy$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postServicePolicy(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
    body?: ServicePolicy
  }): Observable<void> {

    return this.postServicePolicy$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteServicePolicy
   */
  static readonly DeleteServicePolicyPath = '/aether/v2.1.0/{target}/service-policy';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteServicePolicy()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteServicePolicy$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteServicePolicyPath, 'delete');
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
   * To access the full response (for headers, for example), `deleteServicePolicy$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteServicePolicy(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<void> {

    return this.deleteServicePolicy$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postServicePolicyServicePolicy
   */
  static readonly PostServicePolicyServicePolicyPath = '/aether/v2.1.0/{target}/service-policy/service-policy/{id}';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postServicePolicyServicePolicy()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postServicePolicyServicePolicy$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: ServicePolicyServicePolicy
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostServicePolicyServicePolicyPath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `postServicePolicyServicePolicy$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postServicePolicyServicePolicy(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: ServicePolicyServicePolicy
  }): Observable<void> {

    return this.postServicePolicyServicePolicy$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteServicePolicyServicePolicy
   */
  static readonly DeleteServicePolicyServicePolicyPath = '/aether/v2.1.0/{target}/service-policy/service-policy/{id}';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteServicePolicyServicePolicy()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteServicePolicyServicePolicy$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteServicePolicyServicePolicyPath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `deleteServicePolicyServicePolicy$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteServicePolicyServicePolicy(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<void> {

    return this.deleteServicePolicyServicePolicy$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postServicePolicyServicePolicyAmbr
   */
  static readonly PostServicePolicyServicePolicyAmbrPath = '/aether/v2.1.0/{target}/service-policy/service-policy/{id}/ambr';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postServicePolicyServicePolicyAmbr()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postServicePolicyServicePolicyAmbr$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: ServicePolicyServicePolicyAmbr
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostServicePolicyServicePolicyAmbrPath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `postServicePolicyServicePolicyAmbr$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postServicePolicyServicePolicyAmbr(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: ServicePolicyServicePolicyAmbr
  }): Observable<void> {

    return this.postServicePolicyServicePolicyAmbr$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteServicePolicyServicePolicyAmbr
   */
  static readonly DeleteServicePolicyServicePolicyAmbrPath = '/aether/v2.1.0/{target}/service-policy/service-policy/{id}/ambr';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteServicePolicyServicePolicyAmbr()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteServicePolicyServicePolicyAmbr$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteServicePolicyServicePolicyAmbrPath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `deleteServicePolicyServicePolicyAmbr$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteServicePolicyServicePolicyAmbr(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<void> {

    return this.deleteServicePolicyServicePolicyAmbr$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postServicePolicyServicePolicyRules
   */
  static readonly PostServicePolicyServicePolicyRulesPath = '/aether/v2.1.0/{target}/service-policy/service-policy/{id}/rules/{rule}';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postServicePolicyServicePolicyRules()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postServicePolicyServicePolicyRules$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {rule}
     */
    rule: any;
    body?: ServicePolicyServicePolicyRules
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostServicePolicyServicePolicyRulesPath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
      rb.path('rule', params.rule, {});
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
   * To access the full response (for headers, for example), `postServicePolicyServicePolicyRules$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postServicePolicyServicePolicyRules(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {rule}
     */
    rule: any;
    body?: ServicePolicyServicePolicyRules
  }): Observable<void> {

    return this.postServicePolicyServicePolicyRules$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteServicePolicyServicePolicyRules
   */
  static readonly DeleteServicePolicyServicePolicyRulesPath = '/aether/v2.1.0/{target}/service-policy/service-policy/{id}/rules/{rule}';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteServicePolicyServicePolicyRules()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteServicePolicyServicePolicyRules$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {rule}
     */
    rule: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteServicePolicyServicePolicyRulesPath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
      rb.path('rule', params.rule, {});
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
   * To access the full response (for headers, for example), `deleteServicePolicyServicePolicyRules$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteServicePolicyServicePolicyRules(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {rule}
     */
    rule: any;
  }): Observable<void> {

    return this.deleteServicePolicyServicePolicyRules$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postServiceRule
   */
  static readonly PostServiceRulePath = '/aether/v2.1.0/{target}/service-rule';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postServiceRule()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postServiceRule$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
    body?: ServiceRule
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostServiceRulePath, 'post');
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
   * To access the full response (for headers, for example), `postServiceRule$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postServiceRule(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
    body?: ServiceRule
  }): Observable<void> {

    return this.postServiceRule$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteServiceRule
   */
  static readonly DeleteServiceRulePath = '/aether/v2.1.0/{target}/service-rule';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteServiceRule()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteServiceRule$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteServiceRulePath, 'delete');
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
   * To access the full response (for headers, for example), `deleteServiceRule$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteServiceRule(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<void> {

    return this.deleteServiceRule$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postServiceRuleServiceRule
   */
  static readonly PostServiceRuleServiceRulePath = '/aether/v2.1.0/{target}/service-rule/service-rule/{id}';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postServiceRuleServiceRule()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postServiceRuleServiceRule$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: ServiceRuleServiceRule
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostServiceRuleServiceRulePath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `postServiceRuleServiceRule$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postServiceRuleServiceRule(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: ServiceRuleServiceRule
  }): Observable<void> {

    return this.postServiceRuleServiceRule$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteServiceRuleServiceRule
   */
  static readonly DeleteServiceRuleServiceRulePath = '/aether/v2.1.0/{target}/service-rule/service-rule/{id}';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteServiceRuleServiceRule()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteServiceRuleServiceRule$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteServiceRuleServiceRulePath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `deleteServiceRuleServiceRule$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteServiceRuleServiceRule(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<void> {

    return this.deleteServiceRuleServiceRule$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postServiceRuleServiceRuleFlow
   */
  static readonly PostServiceRuleServiceRuleFlowPath = '/aether/v2.1.0/{target}/service-rule/service-rule/{id}/flow';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postServiceRuleServiceRuleFlow()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postServiceRuleServiceRuleFlow$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: ServiceRuleServiceRuleFlow
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostServiceRuleServiceRuleFlowPath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `postServiceRuleServiceRuleFlow$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postServiceRuleServiceRuleFlow(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: ServiceRuleServiceRuleFlow
  }): Observable<void> {

    return this.postServiceRuleServiceRuleFlow$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteServiceRuleServiceRuleFlow
   */
  static readonly DeleteServiceRuleServiceRuleFlowPath = '/aether/v2.1.0/{target}/service-rule/service-rule/{id}/flow';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteServiceRuleServiceRuleFlow()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteServiceRuleServiceRuleFlow$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteServiceRuleServiceRuleFlowPath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `deleteServiceRuleServiceRuleFlow$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteServiceRuleServiceRuleFlow(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<void> {

    return this.deleteServiceRuleServiceRuleFlow$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postServiceRuleServiceRuleQos
   */
  static readonly PostServiceRuleServiceRuleQosPath = '/aether/v2.1.0/{target}/service-rule/service-rule/{id}/qos';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postServiceRuleServiceRuleQos()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postServiceRuleServiceRuleQos$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: ServiceRuleServiceRuleQos
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostServiceRuleServiceRuleQosPath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `postServiceRuleServiceRuleQos$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postServiceRuleServiceRuleQos(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: ServiceRuleServiceRuleQos
  }): Observable<void> {

    return this.postServiceRuleServiceRuleQos$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteServiceRuleServiceRuleQos
   */
  static readonly DeleteServiceRuleServiceRuleQosPath = '/aether/v2.1.0/{target}/service-rule/service-rule/{id}/qos';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteServiceRuleServiceRuleQos()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteServiceRuleServiceRuleQos$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteServiceRuleServiceRuleQosPath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `deleteServiceRuleServiceRuleQos$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteServiceRuleServiceRuleQos(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<void> {

    return this.deleteServiceRuleServiceRuleQos$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postServiceRuleServiceRuleQosAggregateMaximumBitrate
   */
  static readonly PostServiceRuleServiceRuleQosAggregateMaximumBitratePath = '/aether/v2.1.0/{target}/service-rule/service-rule/{id}/qos/aggregate-maximum-bitrate';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postServiceRuleServiceRuleQosAggregateMaximumBitrate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postServiceRuleServiceRuleQosAggregateMaximumBitrate$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: ServiceRuleServiceRuleQosAggregateMaximumBitrate
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostServiceRuleServiceRuleQosAggregateMaximumBitratePath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `postServiceRuleServiceRuleQosAggregateMaximumBitrate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postServiceRuleServiceRuleQosAggregateMaximumBitrate(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: ServiceRuleServiceRuleQosAggregateMaximumBitrate
  }): Observable<void> {

    return this.postServiceRuleServiceRuleQosAggregateMaximumBitrate$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteServiceRuleServiceRuleQosAggregateMaximumBitrate
   */
  static readonly DeleteServiceRuleServiceRuleQosAggregateMaximumBitratePath = '/aether/v2.1.0/{target}/service-rule/service-rule/{id}/qos/aggregate-maximum-bitrate';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteServiceRuleServiceRuleQosAggregateMaximumBitrate()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteServiceRuleServiceRuleQosAggregateMaximumBitrate$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteServiceRuleServiceRuleQosAggregateMaximumBitratePath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `deleteServiceRuleServiceRuleQosAggregateMaximumBitrate$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteServiceRuleServiceRuleQosAggregateMaximumBitrate(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<void> {

    return this.deleteServiceRuleServiceRuleQosAggregateMaximumBitrate$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postServiceRuleServiceRuleQosArp
   */
  static readonly PostServiceRuleServiceRuleQosArpPath = '/aether/v2.1.0/{target}/service-rule/service-rule/{id}/qos/arp';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postServiceRuleServiceRuleQosArp()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postServiceRuleServiceRuleQosArp$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: ServiceRuleServiceRuleQosArp
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostServiceRuleServiceRuleQosArpPath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `postServiceRuleServiceRuleQosArp$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postServiceRuleServiceRuleQosArp(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: ServiceRuleServiceRuleQosArp
  }): Observable<void> {

    return this.postServiceRuleServiceRuleQosArp$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteServiceRuleServiceRuleQosArp
   */
  static readonly DeleteServiceRuleServiceRuleQosArpPath = '/aether/v2.1.0/{target}/service-rule/service-rule/{id}/qos/arp';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteServiceRuleServiceRuleQosArp()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteServiceRuleServiceRuleQosArp$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteServiceRuleServiceRuleQosArpPath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `deleteServiceRuleServiceRuleQosArp$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteServiceRuleServiceRuleQosArp(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<void> {

    return this.deleteServiceRuleServiceRuleQosArp$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postServiceRuleServiceRuleQosGuaranteedBitrate
   */
  static readonly PostServiceRuleServiceRuleQosGuaranteedBitratePath = '/aether/v2.1.0/{target}/service-rule/service-rule/{id}/qos/guaranteed-bitrate';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postServiceRuleServiceRuleQosGuaranteedBitrate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postServiceRuleServiceRuleQosGuaranteedBitrate$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: ServiceRuleServiceRuleQosGuaranteedBitrate
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostServiceRuleServiceRuleQosGuaranteedBitratePath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `postServiceRuleServiceRuleQosGuaranteedBitrate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postServiceRuleServiceRuleQosGuaranteedBitrate(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: ServiceRuleServiceRuleQosGuaranteedBitrate
  }): Observable<void> {

    return this.postServiceRuleServiceRuleQosGuaranteedBitrate$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteServiceRuleServiceRuleQosGuaranteedBitrate
   */
  static readonly DeleteServiceRuleServiceRuleQosGuaranteedBitratePath = '/aether/v2.1.0/{target}/service-rule/service-rule/{id}/qos/guaranteed-bitrate';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteServiceRuleServiceRuleQosGuaranteedBitrate()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteServiceRuleServiceRuleQosGuaranteedBitrate$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteServiceRuleServiceRuleQosGuaranteedBitratePath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `deleteServiceRuleServiceRuleQosGuaranteedBitrate$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteServiceRuleServiceRuleQosGuaranteedBitrate(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<void> {

    return this.deleteServiceRuleServiceRuleQosGuaranteedBitrate$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postServiceRuleServiceRuleQosMaximumRequestedBandwidth
   */
  static readonly PostServiceRuleServiceRuleQosMaximumRequestedBandwidthPath = '/aether/v2.1.0/{target}/service-rule/service-rule/{id}/qos/maximum-requested-bandwidth';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postServiceRuleServiceRuleQosMaximumRequestedBandwidth()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postServiceRuleServiceRuleQosMaximumRequestedBandwidth$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: ServiceRuleServiceRuleQosMaximumRequestedBandwidth
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostServiceRuleServiceRuleQosMaximumRequestedBandwidthPath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `postServiceRuleServiceRuleQosMaximumRequestedBandwidth$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postServiceRuleServiceRuleQosMaximumRequestedBandwidth(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: ServiceRuleServiceRuleQosMaximumRequestedBandwidth
  }): Observable<void> {

    return this.postServiceRuleServiceRuleQosMaximumRequestedBandwidth$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteServiceRuleServiceRuleQosMaximumRequestedBandwidth
   */
  static readonly DeleteServiceRuleServiceRuleQosMaximumRequestedBandwidthPath = '/aether/v2.1.0/{target}/service-rule/service-rule/{id}/qos/maximum-requested-bandwidth';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteServiceRuleServiceRuleQosMaximumRequestedBandwidth()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteServiceRuleServiceRuleQosMaximumRequestedBandwidth$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteServiceRuleServiceRuleQosMaximumRequestedBandwidthPath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `deleteServiceRuleServiceRuleQosMaximumRequestedBandwidth$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteServiceRuleServiceRuleQosMaximumRequestedBandwidth(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<void> {

    return this.deleteServiceRuleServiceRuleQosMaximumRequestedBandwidth$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postSubscriber
   */
  static readonly PostSubscriberPath = '/aether/v2.1.0/{target}/subscriber';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postSubscriber()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postSubscriber$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
    body?: Subscriber
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostSubscriberPath, 'post');
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
   * To access the full response (for headers, for example), `postSubscriber$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postSubscriber(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
    body?: Subscriber
  }): Observable<void> {

    return this.postSubscriber$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteSubscriber
   */
  static readonly DeleteSubscriberPath = '/aether/v2.1.0/{target}/subscriber';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteSubscriber()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSubscriber$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteSubscriberPath, 'delete');
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
   * To access the full response (for headers, for example), `deleteSubscriber$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSubscriber(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<void> {

    return this.deleteSubscriber$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postSubscriberUe
   */
  static readonly PostSubscriberUePath = '/aether/v2.1.0/{target}/subscriber/ue/{id}';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postSubscriberUe()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postSubscriberUe$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: SubscriberUe
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostSubscriberUePath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `postSubscriberUe$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postSubscriberUe(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: SubscriberUe
  }): Observable<void> {

    return this.postSubscriberUe$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteSubscriberUe
   */
  static readonly DeleteSubscriberUePath = '/aether/v2.1.0/{target}/subscriber/ue/{id}';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteSubscriberUe()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSubscriberUe$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteSubscriberUePath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `deleteSubscriberUe$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSubscriberUe(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<void> {

    return this.deleteSubscriberUe$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postSubscriberUeProfiles
   */
  static readonly PostSubscriberUeProfilesPath = '/aether/v2.1.0/{target}/subscriber/ue/{id}/profiles';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postSubscriberUeProfiles()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postSubscriberUeProfiles$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: SubscriberUeProfiles
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostSubscriberUeProfilesPath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `postSubscriberUeProfiles$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postSubscriberUeProfiles(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: SubscriberUeProfiles
  }): Observable<void> {

    return this.postSubscriberUeProfiles$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteSubscriberUeProfiles
   */
  static readonly DeleteSubscriberUeProfilesPath = '/aether/v2.1.0/{target}/subscriber/ue/{id}/profiles';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteSubscriberUeProfiles()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSubscriberUeProfiles$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteSubscriberUeProfilesPath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `deleteSubscriberUeProfiles$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSubscriberUeProfiles(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<void> {

    return this.deleteSubscriberUeProfiles$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postSubscriberUeProfilesAccessProfile
   */
  static readonly PostSubscriberUeProfilesAccessProfilePath = '/aether/v2.1.0/{target}/subscriber/ue/{id}/profiles/access-profile/{access-profile}';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postSubscriberUeProfilesAccessProfile()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postSubscriberUeProfilesAccessProfile$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {access-profile}
     */
    'access-profile': any;
    body?: SubscriberUeProfilesAccessProfile
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostSubscriberUeProfilesAccessProfilePath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
      rb.path('access-profile', params['access-profile'], {});
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
   * To access the full response (for headers, for example), `postSubscriberUeProfilesAccessProfile$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postSubscriberUeProfilesAccessProfile(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {access-profile}
     */
    'access-profile': any;
    body?: SubscriberUeProfilesAccessProfile
  }): Observable<void> {

    return this.postSubscriberUeProfilesAccessProfile$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteSubscriberUeProfilesAccessProfile
   */
  static readonly DeleteSubscriberUeProfilesAccessProfilePath = '/aether/v2.1.0/{target}/subscriber/ue/{id}/profiles/access-profile/{access-profile}';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteSubscriberUeProfilesAccessProfile()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSubscriberUeProfilesAccessProfile$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {access-profile}
     */
    'access-profile': any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteSubscriberUeProfilesAccessProfilePath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
      rb.path('access-profile', params['access-profile'], {});
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
   * To access the full response (for headers, for example), `deleteSubscriberUeProfilesAccessProfile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSubscriberUeProfilesAccessProfile(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {access-profile}
     */
    'access-profile': any;
  }): Observable<void> {

    return this.deleteSubscriberUeProfilesAccessProfile$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postSubscriberUeServingPlmn
   */
  static readonly PostSubscriberUeServingPlmnPath = '/aether/v2.1.0/{target}/subscriber/ue/{id}/serving-plmn';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postSubscriberUeServingPlmn()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postSubscriberUeServingPlmn$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: SubscriberUeServingPlmn
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostSubscriberUeServingPlmnPath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `postSubscriberUeServingPlmn$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postSubscriberUeServingPlmn(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: SubscriberUeServingPlmn
  }): Observable<void> {

    return this.postSubscriberUeServingPlmn$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteSubscriberUeServingPlmn
   */
  static readonly DeleteSubscriberUeServingPlmnPath = '/aether/v2.1.0/{target}/subscriber/ue/{id}/serving-plmn';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteSubscriberUeServingPlmn()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSubscriberUeServingPlmn$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteSubscriberUeServingPlmnPath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `deleteSubscriberUeServingPlmn$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSubscriberUeServingPlmn(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<void> {

    return this.deleteSubscriberUeServingPlmn$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postUpProfile
   */
  static readonly PostUpProfilePath = '/aether/v2.1.0/{target}/up-profile';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postUpProfile()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postUpProfile$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
    body?: UpProfile
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostUpProfilePath, 'post');
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
   * To access the full response (for headers, for example), `postUpProfile$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postUpProfile(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
    body?: UpProfile
  }): Observable<void> {

    return this.postUpProfile$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteUpProfile
   */
  static readonly DeleteUpProfilePath = '/aether/v2.1.0/{target}/up-profile';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteUpProfile()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUpProfile$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteUpProfilePath, 'delete');
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
   * To access the full response (for headers, for example), `deleteUpProfile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUpProfile(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<void> {

    return this.deleteUpProfile$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postUpProfileUpProfile
   */
  static readonly PostUpProfileUpProfilePath = '/aether/v2.1.0/{target}/up-profile/up-profile/{id}';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postUpProfileUpProfile()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postUpProfileUpProfile$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: UpProfileUpProfile
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostUpProfileUpProfilePath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `postUpProfileUpProfile$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postUpProfileUpProfile(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: UpProfileUpProfile
  }): Observable<void> {

    return this.postUpProfileUpProfile$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteUpProfileUpProfile
   */
  static readonly DeleteUpProfileUpProfilePath = '/aether/v2.1.0/{target}/up-profile/up-profile/{id}';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteUpProfileUpProfile()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUpProfileUpProfile$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteUpProfileUpProfilePath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `deleteUpProfileUpProfile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUpProfileUpProfile(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<void> {

    return this.deleteUpProfileUpProfile$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
