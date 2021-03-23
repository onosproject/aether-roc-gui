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

import { ServiceRuleServiceRuleQosAggregateMaximumBitrate } from '../models/service-rule-service-rule-qos-aggregate-maximum-bitrate';
import { ServiceRuleServiceRuleQosArp } from '../models/service-rule-service-rule-qos-arp';
import { ServiceRuleServiceRuleQosGuaranteedBitrate } from '../models/service-rule-service-rule-qos-guaranteed-bitrate';
import { ServiceRuleServiceRuleQosMaximumRequestedBandwidth } from '../models/service-rule-service-rule-qos-maximum-requested-bandwidth';

@Injectable({
  providedIn: 'root',
})
export class ServiceRuleServiceRuleQosService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getServiceRuleServiceRuleQosAggregateMaximumBitrate
   */
  static readonly GetServiceRuleServiceRuleQosAggregateMaximumBitratePath = '/aether/v2.1.0/{target}/service-rule/service-rule/{id}/qos/aggregate-maximum-bitrate';

  /**
   * GET /service-rule/service-rule/{id}/qos/aggregate-maximum-bitrate Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getServiceRuleServiceRuleQosAggregateMaximumBitrate()` instead.
   *
   * This method doesn't expect any request body.
   */
  getServiceRuleServiceRuleQosAggregateMaximumBitrate$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<ServiceRuleServiceRuleQosAggregateMaximumBitrate>> {

    const rb = new RequestBuilder(this.rootUrl, ServiceRuleServiceRuleQosService.GetServiceRuleServiceRuleQosAggregateMaximumBitratePath, 'get');
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
        return r as StrictHttpResponse<ServiceRuleServiceRuleQosAggregateMaximumBitrate>;
      })
    );
  }

  /**
   * GET /service-rule/service-rule/{id}/qos/aggregate-maximum-bitrate Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getServiceRuleServiceRuleQosAggregateMaximumBitrate$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getServiceRuleServiceRuleQosAggregateMaximumBitrate(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<ServiceRuleServiceRuleQosAggregateMaximumBitrate> {

    return this.getServiceRuleServiceRuleQosAggregateMaximumBitrate$Response(params).pipe(
      map((r: StrictHttpResponse<ServiceRuleServiceRuleQosAggregateMaximumBitrate>) => r.body as ServiceRuleServiceRuleQosAggregateMaximumBitrate)
    );
  }

  /**
   * Path part for operation getServiceRuleServiceRuleQosArp
   */
  static readonly GetServiceRuleServiceRuleQosArpPath = '/aether/v2.1.0/{target}/service-rule/service-rule/{id}/qos/arp';

  /**
   * GET /service-rule/service-rule/{id}/qos/arp Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getServiceRuleServiceRuleQosArp()` instead.
   *
   * This method doesn't expect any request body.
   */
  getServiceRuleServiceRuleQosArp$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<ServiceRuleServiceRuleQosArp>> {

    const rb = new RequestBuilder(this.rootUrl, ServiceRuleServiceRuleQosService.GetServiceRuleServiceRuleQosArpPath, 'get');
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
        return r as StrictHttpResponse<ServiceRuleServiceRuleQosArp>;
      })
    );
  }

  /**
   * GET /service-rule/service-rule/{id}/qos/arp Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getServiceRuleServiceRuleQosArp$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getServiceRuleServiceRuleQosArp(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<ServiceRuleServiceRuleQosArp> {

    return this.getServiceRuleServiceRuleQosArp$Response(params).pipe(
      map((r: StrictHttpResponse<ServiceRuleServiceRuleQosArp>) => r.body as ServiceRuleServiceRuleQosArp)
    );
  }

  /**
   * Path part for operation getServiceRuleServiceRuleQosGuaranteedBitrate
   */
  static readonly GetServiceRuleServiceRuleQosGuaranteedBitratePath = '/aether/v2.1.0/{target}/service-rule/service-rule/{id}/qos/guaranteed-bitrate';

  /**
   * GET /service-rule/service-rule/{id}/qos/guaranteed-bitrate Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getServiceRuleServiceRuleQosGuaranteedBitrate()` instead.
   *
   * This method doesn't expect any request body.
   */
  getServiceRuleServiceRuleQosGuaranteedBitrate$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<ServiceRuleServiceRuleQosGuaranteedBitrate>> {

    const rb = new RequestBuilder(this.rootUrl, ServiceRuleServiceRuleQosService.GetServiceRuleServiceRuleQosGuaranteedBitratePath, 'get');
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
        return r as StrictHttpResponse<ServiceRuleServiceRuleQosGuaranteedBitrate>;
      })
    );
  }

  /**
   * GET /service-rule/service-rule/{id}/qos/guaranteed-bitrate Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getServiceRuleServiceRuleQosGuaranteedBitrate$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getServiceRuleServiceRuleQosGuaranteedBitrate(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<ServiceRuleServiceRuleQosGuaranteedBitrate> {

    return this.getServiceRuleServiceRuleQosGuaranteedBitrate$Response(params).pipe(
      map((r: StrictHttpResponse<ServiceRuleServiceRuleQosGuaranteedBitrate>) => r.body as ServiceRuleServiceRuleQosGuaranteedBitrate)
    );
  }

  /**
   * Path part for operation getServiceRuleServiceRuleQosMaximumRequestedBandwidth
   */
  static readonly GetServiceRuleServiceRuleQosMaximumRequestedBandwidthPath = '/aether/v2.1.0/{target}/service-rule/service-rule/{id}/qos/maximum-requested-bandwidth';

  /**
   * GET /service-rule/service-rule/{id}/qos/maximum-requested-bandwidth Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getServiceRuleServiceRuleQosMaximumRequestedBandwidth()` instead.
   *
   * This method doesn't expect any request body.
   */
  getServiceRuleServiceRuleQosMaximumRequestedBandwidth$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<ServiceRuleServiceRuleQosMaximumRequestedBandwidth>> {

    const rb = new RequestBuilder(this.rootUrl, ServiceRuleServiceRuleQosService.GetServiceRuleServiceRuleQosMaximumRequestedBandwidthPath, 'get');
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
        return r as StrictHttpResponse<ServiceRuleServiceRuleQosMaximumRequestedBandwidth>;
      })
    );
  }

  /**
   * GET /service-rule/service-rule/{id}/qos/maximum-requested-bandwidth Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getServiceRuleServiceRuleQosMaximumRequestedBandwidth$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getServiceRuleServiceRuleQosMaximumRequestedBandwidth(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<ServiceRuleServiceRuleQosMaximumRequestedBandwidth> {

    return this.getServiceRuleServiceRuleQosMaximumRequestedBandwidth$Response(params).pipe(
      map((r: StrictHttpResponse<ServiceRuleServiceRuleQosMaximumRequestedBandwidth>) => r.body as ServiceRuleServiceRuleQosMaximumRequestedBandwidth)
    );
  }

}
