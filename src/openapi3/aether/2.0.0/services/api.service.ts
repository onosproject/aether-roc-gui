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

import { Application } from '../models/application';
import { EnterpriseEnterpriseApplication} from "../models/enterprise-enterprise-application";
import { EnterpriseEnterpriseApplicationEndpoint } from "../models/enterprise-enterprise-application-endpoint"
import { EnterpriseEnterpriseApplicationEndpointMbr} from "../models/enterprise-enterprise-application-endpoint-mbr";
import { ConnectivityService } from '../models/connectivity-service';
import { ConnectivityServiceConnectivityService } from '../models/connectivity-service-connectivity-service';
import {DeviceGroup} from "../models/device-group";
import {EnterpriseEnterpriseSiteDeviceGroup} from "../models/enterprise-enterprise-site-device-group";
import {EnterpriseEnterpriseSiteDeviceGroupDevice} from "../models/enterprise-enterprise-site-device-group-device";
import {EnterpriseEnterpriseSiteDeviceGroupMbr} from "../models/enterprise-enterprise-site-device-group-mbr";
import {Enterprise} from "../models/enterprise";
import {EnterpriseEnterprise} from "../models/enterprise-enterprise";
import {EnterpriseEnterpriseConnectivityService} from "../models/enterprise-enterprise-connectivity-service";
import {IpDomain} from "../models/ip-domain";
import {EnterpriseEnterpriseSiteIpDomain} from "../models/enterprise-enterprise-site-ip-domain";
import {Site} from "../models/site";
import {EnterpriseEnterpriseSite} from "../models/enterprise-enterprise-site";
import {EnterpriseEnterpriseSiteImsiDefinition} from "../models/enterprise-enterprise-site-imsi-definition";
import {EnterpriseEnterpriseSiteMonitoring} from "../models/enterprise-enterprise-site-monitoring";
import {EnterpriseEnterpriseSiteMonitoringEdgeDevice} from "../models/enterprise-enterprise-site-monitoring-edge-device";
import {EnterpriseEnterpriseSiteSmallCell} from "../models/enterprise-enterprise-site-small-cell";
import {Template} from "../models/template";
import {EnterpriseEnterpriseTemplate} from "../models/enterprise-enterprise-template";
import {EnterpriseEnterpriseTemplateSliceMbr} from "../models/enterprise-enterprise-template-slice-mbr";
import {TrafficClass} from "../models/traffic-class";
import {EnterpriseEnterpriseTrafficClass} from "../models/enterprise-enterprise-traffic-class";
import {Upf} from "../models/upf";
import {EnterpriseEnterpriseSiteUpf} from "../models/enterprise-enterprise-site-upf";
import {Slice} from "../models/slice";
import {EnterpriseEnterpriseSiteSliceDeviceGroup} from "../models/enterprise-enterprise-site-slice-device-group";
import {EnterpriseEnterpriseSiteSliceFilter} from "../models/enterprise-enterprise-site-slice-filter";
import {EnterpriseEnterpriseSiteSliceMbr} from "../models/enterprise-enterprise-site-slice-mbr";

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
   * Path part for operation postApplication
   */
  static readonly PostApplicationPath = '/aether/v4.0.0/{target}/application';

  /**
   * POST /application.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postApplication()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postApplication$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
    body?: Application
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostApplicationPath, 'post');
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
   * POST /application.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postApplication$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postApplication(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
    body?: Application
  }): Observable<void> {

    return this.postApplication$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteApplication
   */
  static readonly DeleteApplicationPath = '/aether/v4.0.0/{target}/application';

  /**
   * DELETE /application.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteApplication()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteApplication$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteApplicationPath, 'delete');
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
   * DELETE /application.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteApplication$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteApplication(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<void> {

    return this.deleteApplication$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postApplicationApplication
   */
  static readonly PostApplicationApplicationPath = '/aether/v4.0.0/{target}/application/application/{id}';

  /**
   * POST /application/application.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postApplicationApplication()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postApplicationApplication$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: EnterpriseEnterpriseApplication
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostApplicationApplicationPath, 'post');
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
   * POST /application/application.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postApplicationApplication$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postApplicationApplication(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: EnterpriseEnterpriseApplication
  }): Observable<void> {

    return this.postApplicationApplication$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteApplicationApplication
   */
  static readonly DeleteApplicationApplicationPath = '/aether/v4.0.0/{target}/application/application/{id}';

  /**
   * DELETE /application/application.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteApplicationApplication()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteApplicationApplication$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteApplicationApplicationPath, 'delete');
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
   * DELETE /application/application.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteApplicationApplication$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteApplicationApplication(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<void> {

    return this.deleteApplicationApplication$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postApplicationApplicationEndpoint
   */
  static readonly PostApplicationApplicationEndpointPath = '/aether/v4.0.0/{target}/application/application/{id}/endpoint/{endpoint-id}';

  /**
   * POST /application/application/{id}/endpoint.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postApplicationApplicationEndpoint()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postApplicationApplicationEndpoint$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {endpoint-id}
     */
    'endpoint-id': any;
    body?: EnterpriseEnterpriseApplicationEndpoint
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostApplicationApplicationEndpointPath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
      rb.path('endpoint-id', params['endpoint-id'], {});
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
   * POST /application/application/{id}/endpoint.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postApplicationApplicationEndpoint$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postApplicationApplicationEndpoint(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {endpoint-id}
     */
    'endpoint-id': any;
    body?: EnterpriseEnterpriseApplicationEndpoint
  }): Observable<void> {

    return this.postApplicationApplicationEndpoint$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteApplicationApplicationEndpoint
   */
  static readonly DeleteApplicationApplicationEndpointPath = '/aether/v4.0.0/{target}/application/application/{id}/endpoint/{endpoint-id}';

  /**
   * DELETE /application/application/{id}/endpoint.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteApplicationApplicationEndpoint()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteApplicationApplicationEndpoint$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {endpoint-id}
     */
    'endpoint-id': any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteApplicationApplicationEndpointPath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
      rb.path('endpoint-id', params['endpoint-id'], {});
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
   * DELETE /application/application/{id}/endpoint.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteApplicationApplicationEndpoint$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteApplicationApplicationEndpoint(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {endpoint-id}
     */
    'endpoint-id': any;
  }): Observable<void> {

    return this.deleteApplicationApplicationEndpoint$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postApplicationApplicationEndpointMbr
   */
  static readonly PostApplicationApplicationEndpointMbrPath = '/aether/v4.0.0/{target}/application/application/{id}/endpoint/{endpoint-id}/mbr';

  /**
   * POST /application/application/{id}/endpoint/{endpoint-id}/mbr.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postApplicationApplicationEndpointMbr()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postApplicationApplicationEndpointMbr$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {endpoint-id}
     */
    'endpoint-id': any;
    body?: EnterpriseEnterpriseApplicationEndpointMbr
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostApplicationApplicationEndpointMbrPath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
      rb.path('endpoint-id', params['endpoint-id'], {});
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
   * POST /application/application/{id}/endpoint/{endpoint-id}/mbr.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postApplicationApplicationEndpointMbr$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postApplicationApplicationEndpointMbr(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {endpoint-id}
     */
    'endpoint-id': any;
    body?: EnterpriseEnterpriseApplicationEndpointMbr
  }): Observable<void> {

    return this.postApplicationApplicationEndpointMbr$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteApplicationApplicationEndpointMbr
   */
  static readonly DeleteApplicationApplicationEndpointMbrPath = '/aether/v4.0.0/{target}/application/application/{id}/endpoint/{endpoint-id}/mbr';

  /**
   * DELETE /application/application/{id}/endpoint/{endpoint-id}/mbr.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteApplicationApplicationEndpointMbr()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteApplicationApplicationEndpointMbr$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {endpoint-id}
     */
    'endpoint-id': any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteApplicationApplicationEndpointMbrPath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
      rb.path('endpoint-id', params['endpoint-id'], {});
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
   * DELETE /application/application/{id}/endpoint/{endpoint-id}/mbr.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteApplicationApplicationEndpointMbr$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteApplicationApplicationEndpointMbr(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {endpoint-id}
     */
    'endpoint-id': any;
  }): Observable<void> {

    return this.deleteApplicationApplicationEndpointMbr$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postConnectivityService
   */
  static readonly PostConnectivityServicePath = '/aether/v4.0.0/{target}/connectivity-service';

  /**
   * POST /connectivity-service.
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
   * POST /connectivity-service.
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
  static readonly DeleteConnectivityServicePath = '/aether/v4.0.0/{target}/connectivity-service';

  /**
   * DELETE /connectivity-service.
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
   * DELETE /connectivity-service.
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
  static readonly PostConnectivityServiceConnectivityServicePath = '/aether/v4.0.0/{target}/connectivity-service/connectivity-service/{id}';

  /**
   * POST /connectivity-service/connectivity-service.
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
   * POST /connectivity-service/connectivity-service.
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
  static readonly DeleteConnectivityServiceConnectivityServicePath = '/aether/v4.0.0/{target}/connectivity-service/connectivity-service/{id}';

  /**
   * DELETE /connectivity-service/connectivity-service.
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
   * DELETE /connectivity-service/connectivity-service.
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
   * Path part for operation postDeviceGroup
   */
  static readonly PostDeviceGroupPath = '/aether/v4.0.0/{target}/device-group';

  /**
   * POST /device-group.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postDeviceGroup()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postDeviceGroup$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
    body?: DeviceGroup
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostDeviceGroupPath, 'post');
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
   * POST /device-group.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postDeviceGroup$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postDeviceGroup(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
    body?: DeviceGroup
  }): Observable<void> {

    return this.postDeviceGroup$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteDeviceGroup
   */
  static readonly DeleteDeviceGroupPath = '/aether/v4.0.0/{target}/device-group';

  /**
   * DELETE /device-group.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteDeviceGroup()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDeviceGroup$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteDeviceGroupPath, 'delete');
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
   * DELETE /device-group.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteDeviceGroup$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDeviceGroup(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<void> {

    return this.deleteDeviceGroup$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postDeviceGroupDeviceGroup
   */
  static readonly PostDeviceGroupDeviceGroupPath = '/aether/v4.0.0/{target}/device-group/device-group/{id}';

  /**
   * POST /device-group/device-group.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postDeviceGroupDeviceGroup()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postDeviceGroupDeviceGroup$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: EnterpriseEnterpriseSiteDeviceGroup
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostDeviceGroupDeviceGroupPath, 'post');
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
   * POST /device-group/device-group.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postDeviceGroupDeviceGroup$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postDeviceGroupDeviceGroup(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: EnterpriseEnterpriseSiteDeviceGroup
  }): Observable<void> {

    return this.postDeviceGroupDeviceGroup$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteDeviceGroupDeviceGroup
   */
  static readonly DeleteDeviceGroupDeviceGroupPath = '/aether/v4.0.0/{target}/device-group/device-group/{id}';

  /**
   * DELETE /device-group/device-group.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteDeviceGroupDeviceGroup()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDeviceGroupDeviceGroup$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteDeviceGroupDeviceGroupPath, 'delete');
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
   * DELETE /device-group/device-group.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteDeviceGroupDeviceGroup$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDeviceGroupDeviceGroup(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<void> {

    return this.deleteDeviceGroupDeviceGroup$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postDeviceGroupDeviceGroupDevice
   */
  static readonly PostDeviceGroupDeviceGroupDevicePath = '/aether/v4.0.0/{target}/device-group/device-group/{id}/device';

  /**
   * POST /device-group/device-group/{id}/device.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postDeviceGroupDeviceGroupDevice()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postDeviceGroupDeviceGroupDevice$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: EnterpriseEnterpriseSiteDeviceGroupDevice
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostDeviceGroupDeviceGroupDevicePath, 'post');
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
   * POST /device-group/device-group/{id}/device.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postDeviceGroupDeviceGroupDevice$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postDeviceGroupDeviceGroupDevice(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: EnterpriseEnterpriseSiteDeviceGroupDevice
  }): Observable<void> {

    return this.postDeviceGroupDeviceGroupDevice$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteDeviceGroupDeviceGroupDevice
   */
  static readonly DeleteDeviceGroupDeviceGroupDevicePath = '/aether/v4.0.0/{target}/device-group/device-group/{id}/device';

  /**
   * DELETE /device-group/device-group/{id}/device.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteDeviceGroupDeviceGroupDevice()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDeviceGroupDeviceGroupDevice$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteDeviceGroupDeviceGroupDevicePath, 'delete');
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
   * DELETE /device-group/device-group/{id}/device.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteDeviceGroupDeviceGroupDevice$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDeviceGroupDeviceGroupDevice(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<void> {

    return this.deleteDeviceGroupDeviceGroupDevice$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postDeviceGroupDeviceGroupDeviceMbr
   */
  static readonly PostDeviceGroupDeviceGroupDeviceMbrPath = '/aether/v4.0.0/{target}/device-group/device-group/{id}/device/mbr';

  /**
   * POST /device-group/device-group/{id}/device/mbr.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postDeviceGroupDeviceGroupDeviceMbr()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postDeviceGroupDeviceGroupDeviceMbr$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: EnterpriseEnterpriseSiteDeviceGroupMbr
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostDeviceGroupDeviceGroupDeviceMbrPath, 'post');
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
   * POST /device-group/device-group/{id}/device/mbr.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postDeviceGroupDeviceGroupDeviceMbr$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postDeviceGroupDeviceGroupDeviceMbr(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: EnterpriseEnterpriseSiteDeviceGroupMbr
  }): Observable<void> {

    return this.postDeviceGroupDeviceGroupDeviceMbr$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteDeviceGroupDeviceGroupDeviceMbr
   */
  static readonly DeleteDeviceGroupDeviceGroupDeviceMbrPath = '/aether/v4.0.0/{target}/device-group/device-group/{id}/device/mbr';

  /**
   * DELETE /device-group/device-group/{id}/device/mbr.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteDeviceGroupDeviceGroupDeviceMbr()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDeviceGroupDeviceGroupDeviceMbr$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteDeviceGroupDeviceGroupDeviceMbrPath, 'delete');
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
   * DELETE /device-group/device-group/{id}/device/mbr.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteDeviceGroupDeviceGroupDeviceMbr$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDeviceGroupDeviceGroupDeviceMbr(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<void> {

    return this.deleteDeviceGroupDeviceGroupDeviceMbr$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postEnterprise
   */
  static readonly PostEnterprisePath = '/aether/v4.0.0/{target}/enterprise';

  /**
   * POST /enterprise.
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
   * POST /enterprise.
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
  static readonly DeleteEnterprisePath = '/aether/v4.0.0/{target}/enterprise';

  /**
   * DELETE /enterprise.
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
   * DELETE /enterprise.
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
  static readonly PostEnterpriseEnterprisePath = '/aether/v4.0.0/{target}/enterprise/enterprise/{id}';

  /**
   * POST /enterprise/enterprise.
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
   * POST /enterprise/enterprise.
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
  static readonly DeleteEnterpriseEnterprisePath = '/aether/v4.0.0/{target}/enterprise/enterprise/{id}';

  /**
   * DELETE /enterprise/enterprise.
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
   * DELETE /enterprise/enterprise.
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
  static readonly PostEnterpriseEnterpriseConnectivityServicePath = '/aether/v4.0.0/{target}/enterprise/enterprise/{id}/connectivity-service/{connectivity-service}';

  /**
   * POST /enterprise/enterprise/{id}/connectivity-service.
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
   * POST /enterprise/enterprise/{id}/connectivity-service.
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
  static readonly DeleteEnterpriseEnterpriseConnectivityServicePath = '/aether/v4.0.0/{target}/enterprise/enterprise/{id}/connectivity-service/{connectivity-service}';

  /**
   * DELETE /enterprise/enterprise/{id}/connectivity-service.
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
   * DELETE /enterprise/enterprise/{id}/connectivity-service.
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
   * Path part for operation postIpDomain
   */
  static readonly PostIpDomainPath = '/aether/v4.0.0/{target}/ip-domain';

  /**
   * POST /ip-domain.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postIpDomain()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postIpDomain$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
    body?: IpDomain
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostIpDomainPath, 'post');
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
   * POST /ip-domain.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postIpDomain$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postIpDomain(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
    body?: IpDomain
  }): Observable<void> {

    return this.postIpDomain$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteIpDomain
   */
  static readonly DeleteIpDomainPath = '/aether/v4.0.0/{target}/ip-domain';

  /**
   * DELETE /ip-domain.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteIpDomain()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteIpDomain$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteIpDomainPath, 'delete');
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
   * DELETE /ip-domain.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteIpDomain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteIpDomain(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<void> {

    return this.deleteIpDomain$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postIpDomainIpDomain
   */
  static readonly PostIpDomainIpDomainPath = '/aether/v4.0.0/{target}/ip-domain/ip-domain/{id}';

  /**
   * POST /ip-domain/ip-domain.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postIpDomainIpDomain()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postIpDomainIpDomain$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: EnterpriseEnterpriseSiteIpDomain
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostIpDomainIpDomainPath, 'post');
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
   * POST /ip-domain/ip-domain.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postIpDomainIpDomain$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postIpDomainIpDomain(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: EnterpriseEnterpriseSiteIpDomain
  }): Observable<void> {

    return this.postIpDomainIpDomain$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteIpDomainIpDomain
   */
  static readonly DeleteIpDomainIpDomainPath = '/aether/v4.0.0/{target}/ip-domain/ip-domain/{id}';

  /**
   * DELETE /ip-domain/ip-domain.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteIpDomainIpDomain()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteIpDomainIpDomain$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteIpDomainIpDomainPath, 'delete');
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
   * DELETE /ip-domain/ip-domain.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteIpDomainIpDomain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteIpDomainIpDomain(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<void> {

    return this.deleteIpDomainIpDomain$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postSite
   */
  static readonly PostSitePath = '/aether/v4.0.0/{target}/site';

  /**
   * POST /site.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postSite()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postSite$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
    body?: Site
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostSitePath, 'post');
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
   * POST /site.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postSite$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postSite(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
    body?: Site
  }): Observable<void> {

    return this.postSite$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteSite
   */
  static readonly DeleteSitePath = '/aether/v4.0.0/{target}/site';

  /**
   * DELETE /site.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteSite()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSite$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteSitePath, 'delete');
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
   * DELETE /site.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteSite$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSite(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<void> {

    return this.deleteSite$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postSiteSite
   */
  static readonly PostSiteSitePath = '/aether/v4.0.0/{target}/site/site/{id}';

  /**
   * POST /site/site.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postSiteSite()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postSiteSite$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: EnterpriseEnterpriseSite
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostSiteSitePath, 'post');
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
   * POST /site/site.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postSiteSite$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postSiteSite(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: EnterpriseEnterpriseSite
  }): Observable<void> {

    return this.postSiteSite$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteSiteSite
   */
  static readonly DeleteSiteSitePath = '/aether/v4.0.0/{target}/site/site/{id}';

  /**
   * DELETE /site/site.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteSiteSite()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSiteSite$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteSiteSitePath, 'delete');
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
   * DELETE /site/site.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteSiteSite$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSiteSite(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<void> {

    return this.deleteSiteSite$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postSiteSiteImsiDefinition
   */
  static readonly PostSiteSiteImsiDefinitionPath = '/aether/v4.0.0/{target}/site/site/{id}/imsi-definition';

  /**
   * POST /site/site/{id}/imsi-definition.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postSiteSiteImsiDefinition()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postSiteSiteImsiDefinition$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: EnterpriseEnterpriseSiteImsiDefinition
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostSiteSiteImsiDefinitionPath, 'post');
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
   * POST /site/site/{id}/imsi-definition.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postSiteSiteImsiDefinition$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postSiteSiteImsiDefinition(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: EnterpriseEnterpriseSiteImsiDefinition
  }): Observable<void> {

    return this.postSiteSiteImsiDefinition$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteSiteSiteImsiDefinition
   */
  static readonly DeleteSiteSiteImsiDefinitionPath = '/aether/v4.0.0/{target}/site/site/{id}/imsi-definition';

  /**
   * DELETE /site/site/{id}/imsi-definition.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteSiteSiteImsiDefinition()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSiteSiteImsiDefinition$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteSiteSiteImsiDefinitionPath, 'delete');
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
   * DELETE /site/site/{id}/imsi-definition.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteSiteSiteImsiDefinition$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSiteSiteImsiDefinition(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<void> {

    return this.deleteSiteSiteImsiDefinition$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postSiteSiteMonitoring
   */
  static readonly PostSiteSiteMonitoringPath = '/aether/v4.0.0/{target}/site/site/{id}/monitoring';

  /**
   * POST /site/site/{id}/monitoring.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postSiteSiteMonitoring()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postSiteSiteMonitoring$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: EnterpriseEnterpriseSiteMonitoring
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostSiteSiteMonitoringPath, 'post');
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
   * POST /site/site/{id}/monitoring.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postSiteSiteMonitoring$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postSiteSiteMonitoring(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: EnterpriseEnterpriseSiteMonitoring
  }): Observable<void> {

    return this.postSiteSiteMonitoring$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteSiteSiteMonitoring
   */
  static readonly DeleteSiteSiteMonitoringPath = '/aether/v4.0.0/{target}/site/site/{id}/monitoring';

  /**
   * DELETE /site/site/{id}/monitoring.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteSiteSiteMonitoring()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSiteSiteMonitoring$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteSiteSiteMonitoringPath, 'delete');
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
   * DELETE /site/site/{id}/monitoring.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteSiteSiteMonitoring$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSiteSiteMonitoring(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<void> {

    return this.deleteSiteSiteMonitoring$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postSiteSiteMonitoringEdgeDevice
   */
  static readonly PostSiteSiteMonitoringEdgeDevicePath = '/aether/v4.0.0/{target}/site/site/{id}/monitoring/edge-device/{edge-device-id}';

  /**
   * POST /site/site/{id}/monitoring/edge-device.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postSiteSiteMonitoringEdgeDevice()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postSiteSiteMonitoringEdgeDevice$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {edge-device-id}
     */
    'edge-device-id': any;
    body?: EnterpriseEnterpriseSiteMonitoringEdgeDevice
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostSiteSiteMonitoringEdgeDevicePath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
      rb.path('edge-device-id', params['edge-device-id'], {});
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
   * POST /site/site/{id}/monitoring/edge-device.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postSiteSiteMonitoringEdgeDevice$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postSiteSiteMonitoringEdgeDevice(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {edge-device-id}
     */
    'edge-device-id': any;
    body?: EnterpriseEnterpriseSiteMonitoringEdgeDevice
  }): Observable<void> {

    return this.postSiteSiteMonitoringEdgeDevice$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteSiteSiteMonitoringEdgeDevice
   */
  static readonly DeleteSiteSiteMonitoringEdgeDevicePath = '/aether/v4.0.0/{target}/site/site/{id}/monitoring/edge-device/{edge-device-id}';

  /**
   * DELETE /site/site/{id}/monitoring/edge-device.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteSiteSiteMonitoringEdgeDevice()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSiteSiteMonitoringEdgeDevice$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {edge-device-id}
     */
    'edge-device-id': any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteSiteSiteMonitoringEdgeDevicePath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
      rb.path('edge-device-id', params['edge-device-id'], {});
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
   * DELETE /site/site/{id}/monitoring/edge-device.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteSiteSiteMonitoringEdgeDevice$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSiteSiteMonitoringEdgeDevice(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {edge-device-id}
     */
    'edge-device-id': any;
  }): Observable<void> {

    return this.deleteSiteSiteMonitoringEdgeDevice$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postSiteSiteSmallCell
   */
  static readonly PostSiteSiteSmallCellPath = '/aether/v4.0.0/{target}/site/site/{id}/small-cell/{small-cell-id}';

  /**
   * POST /site/site/{id}/small-cell.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postSiteSiteSmallCell()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postSiteSiteSmallCell$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {small-cell-id}
     */
    'small-cell-id': any;
    body?: EnterpriseEnterpriseSiteSmallCell
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostSiteSiteSmallCellPath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
      rb.path('small-cell-id', params['small-cell-id'], {});
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
   * POST /site/site/{id}/small-cell.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postSiteSiteSmallCell$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postSiteSiteSmallCell(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {small-cell-id}
     */
    'small-cell-id': any;
    body?: EnterpriseEnterpriseSiteSmallCell
  }): Observable<void> {

    return this.postSiteSiteSmallCell$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteSiteSiteSmallCell
   */
  static readonly DeleteSiteSiteSmallCellPath = '/aether/v4.0.0/{target}/site/site/{id}/small-cell/{small-cell-id}';

  /**
   * DELETE /site/site/{id}/small-cell.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteSiteSiteSmallCell()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSiteSiteSmallCell$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {small-cell-id}
     */
    'small-cell-id': any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteSiteSiteSmallCellPath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
      rb.path('small-cell-id', params['small-cell-id'], {});
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
   * DELETE /site/site/{id}/small-cell.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteSiteSiteSmallCell$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSiteSiteSmallCell(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {small-cell-id}
     */
    'small-cell-id': any;
  }): Observable<void> {

    return this.deleteSiteSiteSmallCell$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postTemplate
   */
  static readonly PostTemplatePath = '/aether/v4.0.0/{target}/template';

  /**
   * POST /template.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postTemplate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postTemplate$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
    body?: Template
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostTemplatePath, 'post');
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
   * POST /template.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postTemplate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postTemplate(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
    body?: Template
  }): Observable<void> {

    return this.postTemplate$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteTemplate
   */
  static readonly DeleteTemplatePath = '/aether/v4.0.0/{target}/template';

  /**
   * DELETE /template.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteTemplate()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTemplate$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteTemplatePath, 'delete');
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
   * DELETE /template.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteTemplate$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTemplate(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<void> {

    return this.deleteTemplate$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postTemplateTemplate
   */
  static readonly PostTemplateTemplatePath = '/aether/v4.0.0/{target}/template/template/{id}';

  /**
   * POST /template/template.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postTemplateTemplate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postTemplateTemplate$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: EnterpriseEnterpriseTemplate
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostTemplateTemplatePath, 'post');
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
   * POST /template/template.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postTemplateTemplate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postTemplateTemplate(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: EnterpriseEnterpriseTemplate
  }): Observable<void> {

    return this.postTemplateTemplate$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteTemplateTemplate
   */
  static readonly DeleteTemplateTemplatePath = '/aether/v4.0.0/{target}/template/template/{id}';

  /**
   * DELETE /template/template.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteTemplateTemplate()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTemplateTemplate$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteTemplateTemplatePath, 'delete');
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
   * DELETE /template/template.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteTemplateTemplate$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTemplateTemplate(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<void> {

    return this.deleteTemplateTemplate$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postTemplateTemplateSlice
   */
  // static readonly PostTemplateTemplateSlicePath = '/aether/v4.0.0/{target}/template/template/{id}/slice';

  /**
   * POST /template/template/{id}/slice.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postTemplateTemplateSlice()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  // postTemplateTemplateSlice$Response(params: {
  //
  //   /**
  //    * target (device in onos-config)
  //    */
  //   target: any;
  //
  //   /**
  //    * key {id}
  //    */
  //   id: any;
  //   body?: EnterpriseEnterpriseTemplateSlice
  // }): Observable<StrictHttpResponse<void>> {
  //
  //   const rb = new RequestBuilder(this.rootUrl, ApiService.PostTemplateTemplateSlicePath, 'post');
  //   if (params) {
  //     rb.path('target', params.target, {});
  //     rb.path('id', params.id, {});
  //     rb.body(params.body, 'application/json');
  //   }
  //
  //   return this.http.request(rb.build({
  //     responseType: 'text',
  //     accept: '*/*'
  //   })).pipe(
  //     filter((r: any) => r instanceof HttpResponse),
  //     map((r: HttpResponse<any>) => {
  //       return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
  //     })
  //   );
  // }

  /**
   * POST /template/template/{id}/slice.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postTemplateTemplateSlice$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  // postTemplateTemplateSlice(params: {
  //
  //   /**
  //    * target (device in onos-config)
  //    */
  //   target: any;
  //
  //   /**
  //    * key {id}
  //    */
  //   id: any;
  //   body?:EnterpriseEnterpriseTemplateSlice
  // }): Observable<void> {
  //
  //   return this.postTemplateTemplateSlice$Response(params).pipe(
  //     map((r: StrictHttpResponse<void>) => r.body as void)
  //   );
  // }

  /**
   * Path part for operation deleteTemplateTemplateSlice
   */
  static readonly DeleteTemplateTemplateSlicePath = '/aether/v4.0.0/{target}/template/template/{id}/slice';

  /**
   * DELETE /template/template/{id}/slice.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteTemplateTemplateSlice()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTemplateTemplateSlice$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteTemplateTemplateSlicePath, 'delete');
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
   * DELETE /template/template/{id}/slice.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteTemplateTemplateSlice$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTemplateTemplateSlice(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<void> {

    return this.deleteTemplateTemplateSlice$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postTemplateTemplateSliceMbr
   */
  static readonly PostTemplateTemplateSliceMbrPath = '/aether/v4.0.0/{target}/template/template/{id}/slice/mbr';

  /**
   * POST /template/template/{id}/slice/mbr.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postTemplateTemplateSliceMbr()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postTemplateTemplateSliceMbr$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: EnterpriseEnterpriseTemplateSliceMbr
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostTemplateTemplateSliceMbrPath, 'post');
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
   * POST /template/template/{id}/slice/mbr.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postTemplateTemplateSliceMbr$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postTemplateTemplateSliceMbr(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: EnterpriseEnterpriseTemplateSliceMbr
  }): Observable<void> {

    return this.postTemplateTemplateSliceMbr$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteTemplateTemplateSliceMbr
   */
  static readonly DeleteTemplateTemplateSliceMbrPath = '/aether/v4.0.0/{target}/template/template/{id}/slice/mbr';

  /**
   * DELETE /template/template/{id}/slice/mbr.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteTemplateTemplateSliceMbr()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTemplateTemplateSliceMbr$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteTemplateTemplateSliceMbrPath, 'delete');
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
   * DELETE /template/template/{id}/slice/mbr.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteTemplateTemplateSliceMbr$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTemplateTemplateSliceMbr(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<void> {

    return this.deleteTemplateTemplateSliceMbr$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postTrafficClass
   */
  static readonly PostTrafficClassPath = '/aether/v4.0.0/{target}/traffic-class';

  /**
   * POST /traffic-class.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postTrafficClass()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postTrafficClass$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
    body?: TrafficClass
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostTrafficClassPath, 'post');
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
   * POST /traffic-class.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postTrafficClass$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postTrafficClass(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
    body?: TrafficClass
  }): Observable<void> {

    return this.postTrafficClass$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteTrafficClass
   */
  static readonly DeleteTrafficClassPath = '/aether/v4.0.0/{target}/traffic-class';

  /**
   * DELETE /traffic-class.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteTrafficClass()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTrafficClass$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteTrafficClassPath, 'delete');
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
   * DELETE /traffic-class.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteTrafficClass$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTrafficClass(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<void> {

    return this.deleteTrafficClass$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postTrafficClassTrafficClass
   */
  static readonly PostTrafficClassTrafficClassPath = '/aether/v4.0.0/{target}/traffic-class/traffic-class/{id}';

  /**
   * POST /traffic-class/traffic-class.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postTrafficClassTrafficClass()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postTrafficClassTrafficClass$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: EnterpriseEnterpriseTrafficClass
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostTrafficClassTrafficClassPath, 'post');
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
   * POST /traffic-class/traffic-class.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postTrafficClassTrafficClass$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postTrafficClassTrafficClass(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: EnterpriseEnterpriseTrafficClass
  }): Observable<void> {

    return this.postTrafficClassTrafficClass$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteTrafficClassTrafficClass
   */
  static readonly DeleteTrafficClassTrafficClassPath = '/aether/v4.0.0/{target}/traffic-class/traffic-class/{id}';

  /**
   * DELETE /traffic-class/traffic-class.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteTrafficClassTrafficClass()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTrafficClassTrafficClass$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteTrafficClassTrafficClassPath, 'delete');
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
   * DELETE /traffic-class/traffic-class.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteTrafficClassTrafficClass$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTrafficClassTrafficClass(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<void> {

    return this.deleteTrafficClassTrafficClass$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postUpf
   */
  static readonly PostUpfPath = '/aether/v4.0.0/{target}/upf';

  /**
   * POST /upf.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postUpf()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postUpf$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
    body?: Upf
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostUpfPath, 'post');
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
   * POST /upf.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postUpf$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postUpf(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
    body?: Upf
  }): Observable<void> {

    return this.postUpf$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteUpf
   */
  static readonly DeleteUpfPath = '/aether/v4.0.0/{target}/upf';

  /**
   * DELETE /upf.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteUpf()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUpf$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteUpfPath, 'delete');
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
   * DELETE /upf.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteUpf$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUpf(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<void> {

    return this.deleteUpf$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postUpfUpf
   */
  static readonly PostUpfUpfPath = '/aether/v4.0.0/{target}/upf/upf/{id}';

  /**
   * POST /upf/upf.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postUpfUpf()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postUpfUpf$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: EnterpriseEnterpriseSiteUpf
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostUpfUpfPath, 'post');
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
   * POST /upf/upf.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postUpfUpf$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postUpfUpf(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: EnterpriseEnterpriseSiteUpf
  }): Observable<void> {

    return this.postUpfUpf$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteUpfUpf
   */
  static readonly DeleteUpfUpfPath = '/aether/v4.0.0/{target}/upf/upf/{id}';

  /**
   * DELETE /upf/upf.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteUpfUpf()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUpfUpf$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteUpfUpfPath, 'delete');
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
   * DELETE /upf/upf.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteUpfUpf$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUpfUpf(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<void> {

    return this.deleteUpfUpf$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postSlice
   */
  static readonly PostSlicePath = '/aether/v4.0.0/{target}/slice';

  /**
   * POST /slice.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postSlice()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postSlice$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
    body?: Slice
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostSlicePath, 'post');
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
   * POST /slice.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postSlice$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postSlice(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
    body?: Slice
  }): Observable<void> {

    return this.postSlice$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteSlice
   */
  static readonly DeleteSlicePath = '/aether/v4.0.0/{target}/slice';

  /**
   * DELETE /slice.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteSlice()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSlice$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteSlicePath, 'delete');
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
   * DELETE /slice.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteSlice$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSlice(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<void> {

    return this.deleteSlice$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postSlice
   */
  // static readonly PostSlicePath = '/aether/v4.0.0/{target}/slice/slice/{id}';

  /**
   * POST /slice/slice.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postSlice()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  // postSlice$Response(params: {
  //
  //   /**
  //    * target (device in onos-config)
  //    */
  //   target: any;
  //
  //   /**
  //    * key {id}
  //    */
  //   id: any;
  //   body?: EnterpriseEnterpriseSiteSlice
  // }): Observable<StrictHttpResponse<void>> {
  //
  //   const rb = new RequestBuilder(this.rootUrl, ApiService.PostSlicePath, 'post');
  //   if (params) {
  //     rb.path('target', params.target, {});
  //     rb.path('id', params.id, {});
  //     rb.body(params.body, 'application/json');
  //   }
  //
  //   return this.http.request(rb.build({
  //     responseType: 'text',
  //     accept: '*/*'
  //   })).pipe(
  //     filter((r: any) => r instanceof HttpResponse),
  //     map((r: HttpResponse<any>) => {
  //       return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
  //     })
  //   );
  // }

  /**
   * POST /slice/slice.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postSlice$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  // postSlice(params: {
  //
  //   /**
  //    * target (device in onos-config)
  //    */
  //   target: any;
  //
  //   /**
  //    * key {id}
  //    */
  //   id: any;
  //   body?: EnterpriseEnterpriseSiteSlice
  // }): Observable<void> {
  //
  //   return this.postSlice$Response(params).pipe(
  //     map((r: StrictHttpResponse<void>) => r.body as void)
  //   );
  // }

  /**
   * Path part for operation deleteSlice
   */
  // static readonly DeleteSlicePath = '/aether/v4.0.0/{target}/slice/slice/{id}';

  /**
   * DELETE /slice/slice.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteSlice()` instead.
   *
   * This method doesn't expect any request body.
   */
  // deleteSlice$Response(params: {
  //
  //   /**
  //    * target (device in onos-config)
  //    */
  //   target: any;
  //
  //   /**
  //    * key {id}
  //    */
  //   id: any;
  // }): Observable<StrictHttpResponse<void>> {
  //
  //   const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteSlicePath, 'delete');
  //   if (params) {
  //     rb.path('target', params.target, {});
  //     rb.path('id', params.id, {});
  //   }
  //
  //   return this.http.request(rb.build({
  //     responseType: 'text',
  //     accept: '*/*'
  //   })).pipe(
  //     filter((r: any) => r instanceof HttpResponse),
  //     map((r: HttpResponse<any>) => {
  //       return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
  //     })
  //   );
  // }

  /**
   * DELETE /slice/slice.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteSlice$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  // deleteSlice(params: {
  //
  //   /**
  //    * target (device in onos-config)
  //    */
  //   target: any;
  //
  //   /**
  //    * key {id}
  //    */
  //   id: any;
  // }): Observable<void> {
  //
  //   return this.deleteSlice$Response(params).pipe(
  //     map((r: StrictHttpResponse<void>) => r.body as void)
  //   );
  // }

  /**
   * Path part for operation postSliceDeviceGroup
   */
  static readonly PostSliceDeviceGroupPath = '/aether/v4.0.0/{target}/slice/slice/{id}/device-group/{device-group}';

  /**
   * POST /slice/slice/{id}/device-group.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postSliceDeviceGroup()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postSliceDeviceGroup$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {device-group}
     */
    'device-group': any;
    body?: EnterpriseEnterpriseSiteSliceDeviceGroup
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostSliceDeviceGroupPath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
      rb.path('device-group', params['device-group'], {});
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
   * POST /slice/slice/{id}/device-group.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postSliceDeviceGroup$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postSliceDeviceGroup(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {device-group}
     */
    'device-group': any;
    body?: EnterpriseEnterpriseSiteSliceDeviceGroup
  }): Observable<void> {

    return this.postSliceDeviceGroup$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteSliceDeviceGroup
   */
  static readonly DeleteSliceDeviceGroupPath = '/aether/v4.0.0/{target}/slice/slice/{id}/device-group/{device-group}';

  /**
   * DELETE /slice/slice/{id}/device-group.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteSliceDeviceGroup()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSliceDeviceGroup$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {device-group}
     */
    'device-group': any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteSliceDeviceGroupPath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
      rb.path('device-group', params['device-group'], {});
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
   * DELETE /slice/slice/{id}/device-group.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteSliceDeviceGroup$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSliceDeviceGroup(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {device-group}
     */
    'device-group': any;
  }): Observable<void> {

    return this.deleteSliceDeviceGroup$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postSliceFilter
   */
  static readonly PostSliceFilterPath = '/aether/v4.0.0/{target}/slice/slice/{id}/filter/{application}';

  /**
   * POST /slice/slice/{id}/filter.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postSliceFilter()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postSliceFilter$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {application}
     */
    application: any;
    body?: EnterpriseEnterpriseSiteSliceFilter
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostSliceFilterPath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
      rb.path('application', params.application, {});
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
   * POST /slice/slice/{id}/filter.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postSliceFilter$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postSliceFilter(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {application}
     */
    application: any;
    body?: EnterpriseEnterpriseSiteSliceFilter
  }): Observable<void> {

    return this.postSliceFilter$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteSliceFilter
   */
  static readonly DeleteSliceFilterPath = '/aether/v4.0.0/{target}/slice/slice/{id}/filter/{application}';

  /**
   * DELETE /slice/slice/{id}/filter.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteSliceFilter()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSliceFilter$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {application}
     */
    application: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteSliceFilterPath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
      rb.path('application', params.application, {});
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
   * DELETE /slice/slice/{id}/filter.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteSliceFilter$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSliceFilter(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {application}
     */
    application: any;
  }): Observable<void> {

    return this.deleteSliceFilter$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postSliceSlice
   */
  // static readonly PostSliceSlicePath = '/aether/v4.0.0/{target}/slice/slice/{id}/slice';

  /**
   * POST /slice/slice/{id}/slice.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postSliceSlice()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  // postSliceSlice$Response(params: {
  //
  //   /**
  //    * target (device in onos-config)
  //    */
  //   target: any;
  //
  //   /**
  //    * key {id}
  //    */
  //   id: any;
  //   body?: EnterpriseEnterpriseSiteSliceSlice
  // }): Observable<StrictHttpResponse<void>> {
  //
  //   const rb = new RequestBuilder(this.rootUrl, ApiService.PostSliceSlicePath, 'post');
  //   if (params) {
  //     rb.path('target', params.target, {});
  //     rb.path('id', params.id, {});
  //     rb.body(params.body, 'application/json');
  //   }
  //
  //   return this.http.request(rb.build({
  //     responseType: 'text',
  //     accept: '*/*'
  //   })).pipe(
  //     filter((r: any) => r instanceof HttpResponse),
  //     map((r: HttpResponse<any>) => {
  //       return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
  //     })
  //   );
  // }

  /**
   * POST /slice/slice/{id}/slice.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postSliceSlice$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  // postSliceSlice(params: {
  //
  //   /**
  //    * target (device in onos-config)
  //    */
  //   target: any;
  //
  //   /**
  //    * key {id}
  //    */
  //   id: any;
  //   body?: EnterpriseEnterpriseSiteSliceSlice
  // }): Observable<void> {
  //
  //   return this.postSliceSlice$Response(params).pipe(
  //     map((r: StrictHttpResponse<void>) => r.body as void)
  //   );
  // }

  /**
   * Path part for operation deleteSliceSlice
   */
  static readonly DeleteSliceSlicePath = '/aether/v4.0.0/{target}/slice/slice/{id}/slice';

  /**
   * DELETE /slice/slice/{id}/slice.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteSliceSlice()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSliceSlice$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteSliceSlicePath, 'delete');
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
   * DELETE /slice/slice/{id}/slice.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteSliceSlice$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSliceSlice(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<void> {

    return this.deleteSliceSlice$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postSliceSliceMbr
   */
  static readonly PostSliceSliceMbrPath = '/aether/v4.0.0/{target}/slice/slice/{id}/slice/mbr';

  /**
   * POST /slice/slice/{id}/slice/mbr.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postSliceSliceMbr()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postSliceSliceMbr$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: EnterpriseEnterpriseSiteSliceMbr
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostSliceSliceMbrPath, 'post');
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
   * POST /slice/slice/{id}/slice/mbr.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postSliceSliceMbr$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postSliceSliceMbr(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
    body?: EnterpriseEnterpriseSiteSliceMbr
  }): Observable<void> {

    return this.postSliceSliceMbr$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteSliceSliceMbr
   */
  static readonly DeleteSliceSliceMbrPath = '/aether/v4.0.0/{target}/slice/slice/{id}/slice/mbr';

  /**
   * DELETE /slice/slice/{id}/slice/mbr.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteSliceSliceMbr()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSliceSliceMbr$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteSliceSliceMbrPath, 'delete');
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
   * DELETE /slice/slice/{id}/slice/mbr.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteSliceSliceMbr$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSliceSliceMbr(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<void> {

    return this.deleteSliceSliceMbr$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
