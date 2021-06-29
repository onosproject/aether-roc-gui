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
import { ApnProfile } from '../models/apn-profile';
import { ConnectivityService } from '../models/connectivity-service';
import { Enterprise } from '../models/enterprise';
import { QosProfile } from '../models/qos-profile';
import { SecurityProfile } from '../models/security-profile';
import { ServiceGroup } from '../models/service-group';
import { ServicePolicy } from '../models/service-policy';
import { ServiceRule } from '../models/service-rule';
import { Subscriber } from '../models/subscriber';
import { UpProfile } from '../models/up-profile';

@Injectable({
  providedIn: 'root',
})
export class Service extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAccessProfile
   */
  static readonly GetAccessProfilePath = '/aether/v2.1.0/{target}/access-profile';

  /**
   * GET /access-profile Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAccessProfile()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAccessProfile$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<AccessProfile>> {

    const rb = new RequestBuilder(this.rootUrl, Service.GetAccessProfilePath, 'get');
    if (params) {
      rb.path('target', params.target, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AccessProfile>;
      })
    );
  }

  /**
   * GET /access-profile Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAccessProfile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAccessProfile(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<AccessProfile> {

    return this.getAccessProfile$Response(params).pipe(
      map((r: StrictHttpResponse<AccessProfile>) => r.body as AccessProfile)
    );
  }

  /**
   * Path part for operation getApnProfile
   */
  static readonly GetApnProfilePath = '/aether/v2.1.0/{target}/apn-profile';

  /**
   * GET /apn-profile Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getApnProfile()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApnProfile$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<ApnProfile>> {

    const rb = new RequestBuilder(this.rootUrl, Service.GetApnProfilePath, 'get');
    if (params) {
      rb.path('target', params.target, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ApnProfile>;
      })
    );
  }

  /**
   * GET /apn-profile Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getApnProfile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApnProfile(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<ApnProfile> {

    return this.getApnProfile$Response(params).pipe(
      map((r: StrictHttpResponse<ApnProfile>) => r.body as ApnProfile)
    );
  }

  /**
   * Path part for operation getConnectivityService
   */
  static readonly GetConnectivityServicePath = '/aether/v2.1.0/{target}/connectivity-service';

  /**
   * GET /connectivity-service Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getConnectivityService()` instead.
   *
   * This method doesn't expect any request body.
   */
  getConnectivityService$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<ConnectivityService>> {

    const rb = new RequestBuilder(this.rootUrl, Service.GetConnectivityServicePath, 'get');
    if (params) {
      rb.path('target', params.target, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ConnectivityService>;
      })
    );
  }

  /**
   * GET /connectivity-service Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getConnectivityService$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getConnectivityService(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<ConnectivityService> {

    return this.getConnectivityService$Response(params).pipe(
      map((r: StrictHttpResponse<ConnectivityService>) => r.body as ConnectivityService)
    );
  }

  /**
   * Path part for operation getEnterprise
   */
  static readonly GetEnterprisePath = '/aether/v2.1.0/{target}/enterprise';

  /**
   * GET /enterprise Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprise()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprise$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<Enterprise>> {

    const rb = new RequestBuilder(this.rootUrl, Service.GetEnterprisePath, 'get');
    if (params) {
      rb.path('target', params.target, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Enterprise>;
      })
    );
  }

  /**
   * GET /enterprise Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprise$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprise(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<Enterprise> {

    return this.getEnterprise$Response(params).pipe(
      map((r: StrictHttpResponse<Enterprise>) => r.body as Enterprise)
    );
  }

  /**
   * Path part for operation getQosProfile
   */
  static readonly GetQosProfilePath = '/aether/v2.1.0/{target}/qos-profile';

  /**
   * GET /qos-profile Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getQosProfile()` instead.
   *
   * This method doesn't expect any request body.
   */
  getQosProfile$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<QosProfile>> {

    const rb = new RequestBuilder(this.rootUrl, Service.GetQosProfilePath, 'get');
    if (params) {
      rb.path('target', params.target, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<QosProfile>;
      })
    );
  }

  /**
   * GET /qos-profile Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getQosProfile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getQosProfile(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<QosProfile> {

    return this.getQosProfile$Response(params).pipe(
      map((r: StrictHttpResponse<QosProfile>) => r.body as QosProfile)
    );
  }

  /**
   * Path part for operation getSecurityProfile
   */
  static readonly GetSecurityProfilePath = '/aether/v2.1.0/{target}/security-profile';

  /**
   * GET /security-profile Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSecurityProfile()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSecurityProfile$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<SecurityProfile>> {

    const rb = new RequestBuilder(this.rootUrl, Service.GetSecurityProfilePath, 'get');
    if (params) {
      rb.path('target', params.target, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SecurityProfile>;
      })
    );
  }

  /**
   * GET /security-profile Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSecurityProfile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSecurityProfile(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<SecurityProfile> {

    return this.getSecurityProfile$Response(params).pipe(
      map((r: StrictHttpResponse<SecurityProfile>) => r.body as SecurityProfile)
    );
  }

  /**
   * Path part for operation getServiceGroup
   */
  static readonly GetServiceGroupPath = '/aether/v2.1.0/{target}/service-group';

  /**
   * GET /service-group Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getServiceGroup()` instead.
   *
   * This method doesn't expect any request body.
   */
  getServiceGroup$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<ServiceGroup>> {

    const rb = new RequestBuilder(this.rootUrl, Service.GetServiceGroupPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ServiceGroup>;
      })
    );
  }

  /**
   * GET /service-group Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getServiceGroup$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getServiceGroup(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<ServiceGroup> {

    return this.getServiceGroup$Response(params).pipe(
      map((r: StrictHttpResponse<ServiceGroup>) => r.body as ServiceGroup)
    );
  }

  /**
   * Path part for operation getServicePolicy
   */
  static readonly GetServicePolicyPath = '/aether/v2.1.0/{target}/service-policy';

  /**
   * GET /service-policy Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getServicePolicy()` instead.
   *
   * This method doesn't expect any request body.
   */
  getServicePolicy$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<ServicePolicy>> {

    const rb = new RequestBuilder(this.rootUrl, Service.GetServicePolicyPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ServicePolicy>;
      })
    );
  }

  /**
   * GET /service-policy Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getServicePolicy$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getServicePolicy(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<ServicePolicy> {

    return this.getServicePolicy$Response(params).pipe(
      map((r: StrictHttpResponse<ServicePolicy>) => r.body as ServicePolicy)
    );
  }

  /**
   * Path part for operation getServiceRule
   */
  static readonly GetServiceRulePath = '/aether/v2.1.0/{target}/service-rule';

  /**
   * GET /service-rule Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getServiceRule()` instead.
   *
   * This method doesn't expect any request body.
   */
  getServiceRule$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<ServiceRule>> {

    const rb = new RequestBuilder(this.rootUrl, Service.GetServiceRulePath, 'get');
    if (params) {
      rb.path('target', params.target, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ServiceRule>;
      })
    );
  }

  /**
   * GET /service-rule Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getServiceRule$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getServiceRule(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<ServiceRule> {

    return this.getServiceRule$Response(params).pipe(
      map((r: StrictHttpResponse<ServiceRule>) => r.body as ServiceRule)
    );
  }

  /**
   * Path part for operation getSubscriber
   */
  static readonly GetSubscriberPath = '/aether/v2.1.0/{target}/subscriber';

  /**
   * GET /subscriber Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSubscriber()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSubscriber$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<Subscriber>> {

    const rb = new RequestBuilder(this.rootUrl, Service.GetSubscriberPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Subscriber>;
      })
    );
  }

  /**
   * GET /subscriber Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSubscriber$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSubscriber(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<Subscriber> {

    return this.getSubscriber$Response(params).pipe(
      map((r: StrictHttpResponse<Subscriber>) => r.body as Subscriber)
    );
  }

  /**
   * Path part for operation getUpProfile
   */
  static readonly GetUpProfilePath = '/aether/v2.1.0/{target}/up-profile';

  /**
   * GET /up-profile Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUpProfile()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUpProfile$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<UpProfile>> {

    const rb = new RequestBuilder(this.rootUrl, Service.GetUpProfilePath, 'get');
    if (params) {
      rb.path('target', params.target, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UpProfile>;
      })
    );
  }

  /**
   * GET /up-profile Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getUpProfile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUpProfile(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<UpProfile> {

    return this.getUpProfile$Response(params).pipe(
      map((r: StrictHttpResponse<UpProfile>) => r.body as UpProfile)
    );
  }

}
