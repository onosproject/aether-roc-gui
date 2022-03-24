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

import { ConnectivityServices } from '../models/connectivity-services';
import { ConnectivityServicesConnectivityService } from '../models/connectivity-services-connectivity-service';
import { Enterprises } from '../models/enterprises';
import { EnterprisesEnterprise } from '../models/enterprises-enterprise';
import { EnterprisesEnterpriseApplication } from '../models/enterprises-enterprise-application';
import { EnterprisesEnterpriseApplicationEndpoint } from '../models/enterprises-enterprise-application-endpoint';
import { EnterprisesEnterpriseApplicationEndpointMbr } from '../models/enterprises-enterprise-application-endpoint-mbr';
import { EnterprisesEnterpriseConnectivityService } from '../models/enterprises-enterprise-connectivity-service';
import { EnterprisesEnterpriseSite } from '../models/enterprises-enterprise-site';
import { EnterprisesEnterpriseSiteDevice } from '../models/enterprises-enterprise-site-device';
import { EnterprisesEnterpriseSiteDeviceGroup } from '../models/enterprises-enterprise-site-device-group';
import { EnterprisesEnterpriseSiteDeviceGroupDevice } from '../models/enterprises-enterprise-site-device-group-device';
import { EnterprisesEnterpriseSiteDeviceGroupMbr } from '../models/enterprises-enterprise-site-device-group-mbr';
import { EnterprisesEnterpriseSiteImsiDefinition } from '../models/enterprises-enterprise-site-imsi-definition';
import { EnterprisesEnterpriseSiteIpDomain } from '../models/enterprises-enterprise-site-ip-domain';
import { EnterprisesEnterpriseSiteMonitoring } from '../models/enterprises-enterprise-site-monitoring';
import { EnterprisesEnterpriseSiteMonitoringEdgeDevice } from '../models/enterprises-enterprise-site-monitoring-edge-device';
import { EnterprisesEnterpriseSiteSimCard } from '../models/enterprises-enterprise-site-sim-card';
import { EnterprisesEnterpriseSiteSlice } from '../models/enterprises-enterprise-site-slice';
import { EnterprisesEnterpriseSiteSliceDeviceGroup } from '../models/enterprises-enterprise-site-slice-device-group';
import { EnterprisesEnterpriseSiteSliceFilter } from '../models/enterprises-enterprise-site-slice-filter';
import { EnterprisesEnterpriseSiteSliceMbr } from '../models/enterprises-enterprise-site-slice-mbr';
import { EnterprisesEnterpriseSiteSlicePriorityTrafficRule } from '../models/enterprises-enterprise-site-slice-priority-traffic-rule';
import { EnterprisesEnterpriseSiteSmallCell } from '../models/enterprises-enterprise-site-small-cell';
import { EnterprisesEnterpriseSiteUpf } from '../models/enterprises-enterprise-site-upf';
import { EnterprisesEnterpriseTemplate } from '../models/enterprises-enterprise-template';
import { EnterprisesEnterpriseTemplateMbr } from '../models/enterprises-enterprise-template-mbr';
import { EnterprisesEnterpriseTrafficClass } from '../models/enterprises-enterprise-traffic-class';

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
   * Path part for operation postConnectivityServices
   */
  static readonly PostConnectivityServicesPath = '/aether/v2.0.x/{target}/connectivity-services';

  /**
   * POST /connectivity-services.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postConnectivityServices()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postConnectivityServices$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
    body?: ConnectivityServices
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostConnectivityServicesPath, 'post');
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
   * POST /connectivity-services.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postConnectivityServices$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postConnectivityServices(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
    body?: ConnectivityServices
  }): Observable<void> {

    return this.postConnectivityServices$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteConnectivityServices
   */
  static readonly DeleteConnectivityServicesPath = '/aether/v2.0.x/{target}/connectivity-services';

  /**
   * DELETE /connectivity-services.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteConnectivityServices()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteConnectivityServices$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteConnectivityServicesPath, 'delete');
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
   * DELETE /connectivity-services.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteConnectivityServices$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteConnectivityServices(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<void> {

    return this.deleteConnectivityServices$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postConnectivityServicesConnectivityService
   */
  static readonly PostConnectivityServicesConnectivityServicePath = '/aether/v2.0.x/{target}/connectivity-services/connectivity-service/{connectivity-service-id}';

  /**
   * POST /connectivity-services/connectivity-service.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postConnectivityServicesConnectivityService()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postConnectivityServicesConnectivityService$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {connectivity-service-id}
     */
    'connectivity-service-id': any;
    body?: ConnectivityServicesConnectivityService
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostConnectivityServicesConnectivityServicePath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('connectivity-service-id', params['connectivity-service-id'], {});
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
   * POST /connectivity-services/connectivity-service.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postConnectivityServicesConnectivityService$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postConnectivityServicesConnectivityService(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {connectivity-service-id}
     */
    'connectivity-service-id': any;
    body?: ConnectivityServicesConnectivityService
  }): Observable<void> {

    return this.postConnectivityServicesConnectivityService$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteConnectivityServicesConnectivityService
   */
  static readonly DeleteConnectivityServicesConnectivityServicePath = '/aether/v2.0.x/{target}/connectivity-services/connectivity-service/{connectivity-service-id}';

  /**
   * DELETE /connectivity-services/connectivity-service.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteConnectivityServicesConnectivityService()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteConnectivityServicesConnectivityService$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {connectivity-service-id}
     */
    'connectivity-service-id': any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteConnectivityServicesConnectivityServicePath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('connectivity-service-id', params['connectivity-service-id'], {});
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
   * DELETE /connectivity-services/connectivity-service.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteConnectivityServicesConnectivityService$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteConnectivityServicesConnectivityService(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {connectivity-service-id}
     */
    'connectivity-service-id': any;
  }): Observable<void> {

    return this.deleteConnectivityServicesConnectivityService$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postEnterprises
   */
  static readonly PostEnterprisesPath = '/aether/v2.0.x/{target}/enterprises';

  /**
   * POST /enterprises.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postEnterprises()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterprises$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
    body?: Enterprises
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostEnterprisesPath, 'post');
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
   * POST /enterprises.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postEnterprises$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterprises(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
    body?: Enterprises
  }): Observable<void> {

    return this.postEnterprises$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteEnterprises
   */
  static readonly DeleteEnterprisesPath = '/aether/v2.0.x/{target}/enterprises';

  /**
   * DELETE /enterprises.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteEnterprises()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterprises$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteEnterprisesPath, 'delete');
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
   * DELETE /enterprises.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteEnterprises$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterprises(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<void> {

    return this.deleteEnterprises$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postEnterprisesEnterprise
   */
  static readonly PostEnterprisesEnterprisePath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}';

  /**
   * POST /enterprises/enterprise.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postEnterprisesEnterprise()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterprisesEnterprise$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;
    body?: EnterprisesEnterprise
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostEnterprisesEnterprisePath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
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
   * POST /enterprises/enterprise.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postEnterprisesEnterprise$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterprisesEnterprise(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;
    body?: EnterprisesEnterprise
  }): Observable<void> {

    return this.postEnterprisesEnterprise$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteEnterprisesEnterprise
   */
  static readonly DeleteEnterprisesEnterprisePath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}';

  /**
   * DELETE /enterprises/enterprise.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteEnterprisesEnterprise()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterprisesEnterprise$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteEnterprisesEnterprisePath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
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
   * DELETE /enterprises/enterprise.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteEnterprisesEnterprise$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterprisesEnterprise(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;
  }): Observable<void> {

    return this.deleteEnterprisesEnterprise$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postEnterprisesEnterpriseApplication
   */
  static readonly PostEnterprisesEnterpriseApplicationPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/application/{application-id}';

  /**
   * POST /enterprises/enterprise/{enterprise-id}/application.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postEnterprisesEnterpriseApplication()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterprisesEnterpriseApplication$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {application-id}
     */
    'application-id': any;
    body?: EnterprisesEnterpriseApplication
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostEnterprisesEnterpriseApplicationPath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('application-id', params['application-id'], {});
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
   * POST /enterprises/enterprise/{enterprise-id}/application.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postEnterprisesEnterpriseApplication$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterprisesEnterpriseApplication(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {application-id}
     */
    'application-id': any;
    body?: EnterprisesEnterpriseApplication
  }): Observable<void> {

    return this.postEnterprisesEnterpriseApplication$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteEnterprisesEnterpriseApplication
   */
  static readonly DeleteEnterprisesEnterpriseApplicationPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/application/{application-id}';

  /**
   * DELETE /enterprises/enterprise/{enterprise-id}/application.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteEnterprisesEnterpriseApplication()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterprisesEnterpriseApplication$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {application-id}
     */
    'application-id': any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteEnterprisesEnterpriseApplicationPath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('application-id', params['application-id'], {});
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
   * DELETE /enterprises/enterprise/{enterprise-id}/application.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteEnterprisesEnterpriseApplication$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterprisesEnterpriseApplication(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {application-id}
     */
    'application-id': any;
  }): Observable<void> {

    return this.deleteEnterprisesEnterpriseApplication$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postEnterprisesEnterpriseApplicationEndpoint
   */
  static readonly PostEnterprisesEnterpriseApplicationEndpointPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/application/{application-id}/endpoint/{endpoint-id}';

  /**
   * POST /enterprises/enterprise/{enterprise-id}/application/{application-id}/endpoint.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postEnterprisesEnterpriseApplicationEndpoint()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterprisesEnterpriseApplicationEndpoint$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {application-id}
     */
    'application-id': any;

    /**
     * key {endpoint-id}
     */
    'endpoint-id': any;
    body?: EnterprisesEnterpriseApplicationEndpoint
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostEnterprisesEnterpriseApplicationEndpointPath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('application-id', params['application-id'], {});
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
   * POST /enterprises/enterprise/{enterprise-id}/application/{application-id}/endpoint.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postEnterprisesEnterpriseApplicationEndpoint$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterprisesEnterpriseApplicationEndpoint(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {application-id}
     */
    'application-id': any;

    /**
     * key {endpoint-id}
     */
    'endpoint-id': any;
    body?: EnterprisesEnterpriseApplicationEndpoint
  }): Observable<void> {

    return this.postEnterprisesEnterpriseApplicationEndpoint$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteEnterprisesEnterpriseApplicationEndpoint
   */
  static readonly DeleteEnterprisesEnterpriseApplicationEndpointPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/application/{application-id}/endpoint/{endpoint-id}';

  /**
   * DELETE /enterprises/enterprise/{enterprise-id}/application/{application-id}/endpoint.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteEnterprisesEnterpriseApplicationEndpoint()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterprisesEnterpriseApplicationEndpoint$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {application-id}
     */
    'application-id': any;

    /**
     * key {endpoint-id}
     */
    'endpoint-id': any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteEnterprisesEnterpriseApplicationEndpointPath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('application-id', params['application-id'], {});
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
   * DELETE /enterprises/enterprise/{enterprise-id}/application/{application-id}/endpoint.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteEnterprisesEnterpriseApplicationEndpoint$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterprisesEnterpriseApplicationEndpoint(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {application-id}
     */
    'application-id': any;

    /**
     * key {endpoint-id}
     */
    'endpoint-id': any;
  }): Observable<void> {

    return this.deleteEnterprisesEnterpriseApplicationEndpoint$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postEnterprisesEnterpriseApplicationEndpointMbr
   */
  static readonly PostEnterprisesEnterpriseApplicationEndpointMbrPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/application/{application-id}/endpoint/{endpoint-id}/mbr';

  /**
   * POST /enterprises/enterprise/{enterprise-id}/application/{application-id}/endpoint/{endpoint-id}/mbr.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postEnterprisesEnterpriseApplicationEndpointMbr()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterprisesEnterpriseApplicationEndpointMbr$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {application-id}
     */
    'application-id': any;

    /**
     * key {endpoint-id}
     */
    'endpoint-id': any;
    body?: EnterprisesEnterpriseApplicationEndpointMbr
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostEnterprisesEnterpriseApplicationEndpointMbrPath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('application-id', params['application-id'], {});
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
   * POST /enterprises/enterprise/{enterprise-id}/application/{application-id}/endpoint/{endpoint-id}/mbr.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postEnterprisesEnterpriseApplicationEndpointMbr$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterprisesEnterpriseApplicationEndpointMbr(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {application-id}
     */
    'application-id': any;

    /**
     * key {endpoint-id}
     */
    'endpoint-id': any;
    body?: EnterprisesEnterpriseApplicationEndpointMbr
  }): Observable<void> {

    return this.postEnterprisesEnterpriseApplicationEndpointMbr$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteEnterprisesEnterpriseApplicationEndpointMbr
   */
  static readonly DeleteEnterprisesEnterpriseApplicationEndpointMbrPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/application/{application-id}/endpoint/{endpoint-id}/mbr';

  /**
   * DELETE /enterprises/enterprise/{enterprise-id}/application/{application-id}/endpoint/{endpoint-id}/mbr.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteEnterprisesEnterpriseApplicationEndpointMbr()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterprisesEnterpriseApplicationEndpointMbr$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {application-id}
     */
    'application-id': any;

    /**
     * key {endpoint-id}
     */
    'endpoint-id': any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteEnterprisesEnterpriseApplicationEndpointMbrPath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('application-id', params['application-id'], {});
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
   * DELETE /enterprises/enterprise/{enterprise-id}/application/{application-id}/endpoint/{endpoint-id}/mbr.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteEnterprisesEnterpriseApplicationEndpointMbr$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterprisesEnterpriseApplicationEndpointMbr(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {application-id}
     */
    'application-id': any;

    /**
     * key {endpoint-id}
     */
    'endpoint-id': any;
  }): Observable<void> {

    return this.deleteEnterprisesEnterpriseApplicationEndpointMbr$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postEnterprisesEnterpriseConnectivityService
   */
  static readonly PostEnterprisesEnterpriseConnectivityServicePath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/connectivity-service/{connectivity-service}';

  /**
   * POST /enterprises/enterprise/{enterprise-id}/connectivity-service.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postEnterprisesEnterpriseConnectivityService()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterprisesEnterpriseConnectivityService$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {connectivity-service}
     */
    'connectivity-service': any;
    body?: EnterprisesEnterpriseConnectivityService
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostEnterprisesEnterpriseConnectivityServicePath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
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
   * POST /enterprises/enterprise/{enterprise-id}/connectivity-service.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postEnterprisesEnterpriseConnectivityService$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterprisesEnterpriseConnectivityService(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {connectivity-service}
     */
    'connectivity-service': any;
    body?: EnterprisesEnterpriseConnectivityService
  }): Observable<void> {

    return this.postEnterprisesEnterpriseConnectivityService$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteEnterprisesEnterpriseConnectivityService
   */
  static readonly DeleteEnterprisesEnterpriseConnectivityServicePath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/connectivity-service/{connectivity-service}';

  /**
   * DELETE /enterprises/enterprise/{enterprise-id}/connectivity-service.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteEnterprisesEnterpriseConnectivityService()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterprisesEnterpriseConnectivityService$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {connectivity-service}
     */
    'connectivity-service': any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteEnterprisesEnterpriseConnectivityServicePath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
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
   * DELETE /enterprises/enterprise/{enterprise-id}/connectivity-service.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteEnterprisesEnterpriseConnectivityService$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterprisesEnterpriseConnectivityService(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {connectivity-service}
     */
    'connectivity-service': any;
  }): Observable<void> {

    return this.deleteEnterprisesEnterpriseConnectivityService$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postEnterprisesEnterpriseSite
   */
  static readonly PostEnterprisesEnterpriseSitePath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}';

  /**
   * POST /enterprises/enterprise/{enterprise-id}/site.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postEnterprisesEnterpriseSite()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterprisesEnterpriseSite$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;
    body?: EnterprisesEnterpriseSite
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostEnterprisesEnterpriseSitePath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
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
   * POST /enterprises/enterprise/{enterprise-id}/site.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postEnterprisesEnterpriseSite$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterprisesEnterpriseSite(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;
    body?: EnterprisesEnterpriseSite
  }): Observable<void> {

    return this.postEnterprisesEnterpriseSite$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteEnterprisesEnterpriseSite
   */
  static readonly DeleteEnterprisesEnterpriseSitePath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}';

  /**
   * DELETE /enterprises/enterprise/{enterprise-id}/site.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteEnterprisesEnterpriseSite()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterprisesEnterpriseSite$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteEnterprisesEnterpriseSitePath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
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
   * DELETE /enterprises/enterprise/{enterprise-id}/site.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteEnterprisesEnterpriseSite$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterprisesEnterpriseSite(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;
  }): Observable<void> {

    return this.deleteEnterprisesEnterpriseSite$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postEnterprisesEnterpriseSiteDeviceGroup
   */
  static readonly PostEnterprisesEnterpriseSiteDeviceGroupPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/device-group/{device-group-id}';

  /**
   * POST /enterprises/enterprise/{enterprise-id}/site/{site-id}/device-group.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postEnterprisesEnterpriseSiteDeviceGroup()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterprisesEnterpriseSiteDeviceGroup$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {device-group-id}
     */
    'device-group-id': any;
    body?: EnterprisesEnterpriseSiteDeviceGroup
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostEnterprisesEnterpriseSiteDeviceGroupPath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.path('device-group-id', params['device-group-id'], {});
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
   * POST /enterprises/enterprise/{enterprise-id}/site/{site-id}/device-group.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postEnterprisesEnterpriseSiteDeviceGroup$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterprisesEnterpriseSiteDeviceGroup(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {device-group-id}
     */
    'device-group-id': any;
    body?: EnterprisesEnterpriseSiteDeviceGroup
  }): Observable<void> {

    return this.postEnterprisesEnterpriseSiteDeviceGroup$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteEnterprisesEnterpriseSiteDeviceGroup
   */
  static readonly DeleteEnterprisesEnterpriseSiteDeviceGroupPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/device-group/{device-group-id}';

  /**
   * DELETE /enterprises/enterprise/{enterprise-id}/site/{site-id}/device-group.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteEnterprisesEnterpriseSiteDeviceGroup()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterprisesEnterpriseSiteDeviceGroup$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {device-group-id}
     */
    'device-group-id': any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteEnterprisesEnterpriseSiteDeviceGroupPath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.path('device-group-id', params['device-group-id'], {});
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
   * DELETE /enterprises/enterprise/{enterprise-id}/site/{site-id}/device-group.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteEnterprisesEnterpriseSiteDeviceGroup$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterprisesEnterpriseSiteDeviceGroup(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {device-group-id}
     */
    'device-group-id': any;
  }): Observable<void> {

    return this.deleteEnterprisesEnterpriseSiteDeviceGroup$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postEnterprisesEnterpriseSiteDeviceGroupDevice
   */
  static readonly PostEnterprisesEnterpriseSiteDeviceGroupDevicePath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/device-group/{device-group-id}/device/{device-id}';

  /**
   * POST /enterprises/enterprise/{enterprise-id}/site/{site-id}/device-group/{device-group-id}/device.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postEnterprisesEnterpriseSiteDeviceGroupDevice()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterprisesEnterpriseSiteDeviceGroupDevice$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {device-group-id}
     */
    'device-group-id': any;

    /**
     * key {device-id}
     */
    'device-id': any;
    body?: EnterprisesEnterpriseSiteDeviceGroupDevice
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostEnterprisesEnterpriseSiteDeviceGroupDevicePath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.path('device-group-id', params['device-group-id'], {});
      rb.path('device-id', params['device-id'], {});
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
   * POST /enterprises/enterprise/{enterprise-id}/site/{site-id}/device-group/{device-group-id}/device.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postEnterprisesEnterpriseSiteDeviceGroupDevice$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterprisesEnterpriseSiteDeviceGroupDevice(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {device-group-id}
     */
    'device-group-id': any;

    /**
     * key {device-id}
     */
    'device-id': any;
    body?: EnterprisesEnterpriseSiteDeviceGroupDevice
  }): Observable<void> {

    return this.postEnterprisesEnterpriseSiteDeviceGroupDevice$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteEnterprisesEnterpriseSiteDeviceGroupDevice
   */
  static readonly DeleteEnterprisesEnterpriseSiteDeviceGroupDevicePath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/device-group/{device-group-id}/device/{device-id}';

  /**
   * DELETE /enterprises/enterprise/{enterprise-id}/site/{site-id}/device-group/{device-group-id}/device.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteEnterprisesEnterpriseSiteDeviceGroupDevice()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterprisesEnterpriseSiteDeviceGroupDevice$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {device-group-id}
     */
    'device-group-id': any;

    /**
     * key {device-id}
     */
    'device-id': any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteEnterprisesEnterpriseSiteDeviceGroupDevicePath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.path('device-group-id', params['device-group-id'], {});
      rb.path('device-id', params['device-id'], {});
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
   * DELETE /enterprises/enterprise/{enterprise-id}/site/{site-id}/device-group/{device-group-id}/device.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteEnterprisesEnterpriseSiteDeviceGroupDevice$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterprisesEnterpriseSiteDeviceGroupDevice(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {device-group-id}
     */
    'device-group-id': any;

    /**
     * key {device-id}
     */
    'device-id': any;
  }): Observable<void> {

    return this.deleteEnterprisesEnterpriseSiteDeviceGroupDevice$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postEnterprisesEnterpriseSiteDeviceGroupMbr
   */
  static readonly PostEnterprisesEnterpriseSiteDeviceGroupMbrPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/device-group/{device-group-id}/mbr';

  /**
   * POST /enterprises/enterprise/{enterprise-id}/site/{site-id}/device-group/{device-group-id}/mbr.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postEnterprisesEnterpriseSiteDeviceGroupMbr()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterprisesEnterpriseSiteDeviceGroupMbr$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {device-group-id}
     */
    'device-group-id': any;
    body?: EnterprisesEnterpriseSiteDeviceGroupMbr
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostEnterprisesEnterpriseSiteDeviceGroupMbrPath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.path('device-group-id', params['device-group-id'], {});
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
   * POST /enterprises/enterprise/{enterprise-id}/site/{site-id}/device-group/{device-group-id}/mbr.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postEnterprisesEnterpriseSiteDeviceGroupMbr$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterprisesEnterpriseSiteDeviceGroupMbr(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {device-group-id}
     */
    'device-group-id': any;
    body?: EnterprisesEnterpriseSiteDeviceGroupMbr
  }): Observable<void> {

    return this.postEnterprisesEnterpriseSiteDeviceGroupMbr$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteEnterprisesEnterpriseSiteDeviceGroupMbr
   */
  static readonly DeleteEnterprisesEnterpriseSiteDeviceGroupMbrPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/device-group/{device-group-id}/mbr';

  /**
   * DELETE /enterprises/enterprise/{enterprise-id}/site/{site-id}/device-group/{device-group-id}/mbr.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteEnterprisesEnterpriseSiteDeviceGroupMbr()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterprisesEnterpriseSiteDeviceGroupMbr$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {device-group-id}
     */
    'device-group-id': any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteEnterprisesEnterpriseSiteDeviceGroupMbrPath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.path('device-group-id', params['device-group-id'], {});
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
   * DELETE /enterprises/enterprise/{enterprise-id}/site/{site-id}/device-group/{device-group-id}/mbr.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteEnterprisesEnterpriseSiteDeviceGroupMbr$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterprisesEnterpriseSiteDeviceGroupMbr(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {device-group-id}
     */
    'device-group-id': any;
  }): Observable<void> {

    return this.deleteEnterprisesEnterpriseSiteDeviceGroupMbr$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postEnterprisesEnterpriseSiteDevice
   */
  static readonly PostEnterprisesEnterpriseSiteDevicePath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/device/{device-id}';

  /**
   * POST /enterprises/enterprise/{enterprise-id}/site/{site-id}/device.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postEnterprisesEnterpriseSiteDevice()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterprisesEnterpriseSiteDevice$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {device-id}
     */
    'device-id': any;
    body?: EnterprisesEnterpriseSiteDevice
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostEnterprisesEnterpriseSiteDevicePath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.path('device-id', params['device-id'], {});
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
   * POST /enterprises/enterprise/{enterprise-id}/site/{site-id}/device.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postEnterprisesEnterpriseSiteDevice$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterprisesEnterpriseSiteDevice(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {device-id}
     */
    'device-id': any;
    body?: EnterprisesEnterpriseSiteDevice
  }): Observable<void> {

    return this.postEnterprisesEnterpriseSiteDevice$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteEnterprisesEnterpriseSiteDevice
   */
  static readonly DeleteEnterprisesEnterpriseSiteDevicePath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/device/{device-id}';

  /**
   * DELETE /enterprises/enterprise/{enterprise-id}/site/{site-id}/device.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteEnterprisesEnterpriseSiteDevice()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterprisesEnterpriseSiteDevice$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {device-id}
     */
    'device-id': any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteEnterprisesEnterpriseSiteDevicePath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.path('device-id', params['device-id'], {});
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
   * DELETE /enterprises/enterprise/{enterprise-id}/site/{site-id}/device.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteEnterprisesEnterpriseSiteDevice$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterprisesEnterpriseSiteDevice(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {device-id}
     */
    'device-id': any;
  }): Observable<void> {

    return this.deleteEnterprisesEnterpriseSiteDevice$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postEnterprisesEnterpriseSiteImsiDefinition
   */
  static readonly PostEnterprisesEnterpriseSiteImsiDefinitionPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/imsi-definition';

  /**
   * POST /enterprises/enterprise/{enterprise-id}/site/{site-id}/imsi-definition.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postEnterprisesEnterpriseSiteImsiDefinition()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterprisesEnterpriseSiteImsiDefinition$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;
    body?: EnterprisesEnterpriseSiteImsiDefinition
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostEnterprisesEnterpriseSiteImsiDefinitionPath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
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
   * POST /enterprises/enterprise/{enterprise-id}/site/{site-id}/imsi-definition.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postEnterprisesEnterpriseSiteImsiDefinition$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterprisesEnterpriseSiteImsiDefinition(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;
    body?: EnterprisesEnterpriseSiteImsiDefinition
  }): Observable<void> {

    return this.postEnterprisesEnterpriseSiteImsiDefinition$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteEnterprisesEnterpriseSiteImsiDefinition
   */
  static readonly DeleteEnterprisesEnterpriseSiteImsiDefinitionPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/imsi-definition';

  /**
   * DELETE /enterprises/enterprise/{enterprise-id}/site/{site-id}/imsi-definition.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteEnterprisesEnterpriseSiteImsiDefinition()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterprisesEnterpriseSiteImsiDefinition$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteEnterprisesEnterpriseSiteImsiDefinitionPath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
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
   * DELETE /enterprises/enterprise/{enterprise-id}/site/{site-id}/imsi-definition.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteEnterprisesEnterpriseSiteImsiDefinition$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterprisesEnterpriseSiteImsiDefinition(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;
  }): Observable<void> {

    return this.deleteEnterprisesEnterpriseSiteImsiDefinition$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postEnterprisesEnterpriseSiteIpDomain
   */
  static readonly PostEnterprisesEnterpriseSiteIpDomainPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/ip-domain/{ip-domain-id}';

  /**
   * POST /enterprises/enterprise/{enterprise-id}/site/{site-id}/ip-domain.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postEnterprisesEnterpriseSiteIpDomain()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterprisesEnterpriseSiteIpDomain$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {ip-domain-id}
     */
    'ip-domain-id': any;
    body?: EnterprisesEnterpriseSiteIpDomain
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostEnterprisesEnterpriseSiteIpDomainPath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.path('ip-domain-id', params['ip-domain-id'], {});
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
   * POST /enterprises/enterprise/{enterprise-id}/site/{site-id}/ip-domain.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postEnterprisesEnterpriseSiteIpDomain$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterprisesEnterpriseSiteIpDomain(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {ip-domain-id}
     */
    'ip-domain-id': any;
    body?: EnterprisesEnterpriseSiteIpDomain
  }): Observable<void> {

    return this.postEnterprisesEnterpriseSiteIpDomain$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteEnterprisesEnterpriseSiteIpDomain
   */
  static readonly DeleteEnterprisesEnterpriseSiteIpDomainPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/ip-domain/{ip-domain-id}';

  /**
   * DELETE /enterprises/enterprise/{enterprise-id}/site/{site-id}/ip-domain.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteEnterprisesEnterpriseSiteIpDomain()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterprisesEnterpriseSiteIpDomain$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {ip-domain-id}
     */
    'ip-domain-id': any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteEnterprisesEnterpriseSiteIpDomainPath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.path('ip-domain-id', params['ip-domain-id'], {});
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
   * DELETE /enterprises/enterprise/{enterprise-id}/site/{site-id}/ip-domain.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteEnterprisesEnterpriseSiteIpDomain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterprisesEnterpriseSiteIpDomain(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {ip-domain-id}
     */
    'ip-domain-id': any;
  }): Observable<void> {

    return this.deleteEnterprisesEnterpriseSiteIpDomain$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postEnterprisesEnterpriseSiteMonitoring
   */
  static readonly PostEnterprisesEnterpriseSiteMonitoringPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/monitoring';

  /**
   * POST /enterprises/enterprise/{enterprise-id}/site/{site-id}/monitoring.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postEnterprisesEnterpriseSiteMonitoring()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterprisesEnterpriseSiteMonitoring$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;
    body?: EnterprisesEnterpriseSiteMonitoring
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostEnterprisesEnterpriseSiteMonitoringPath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
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
   * POST /enterprises/enterprise/{enterprise-id}/site/{site-id}/monitoring.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postEnterprisesEnterpriseSiteMonitoring$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterprisesEnterpriseSiteMonitoring(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;
    body?: EnterprisesEnterpriseSiteMonitoring
  }): Observable<void> {

    return this.postEnterprisesEnterpriseSiteMonitoring$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteEnterprisesEnterpriseSiteMonitoring
   */
  static readonly DeleteEnterprisesEnterpriseSiteMonitoringPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/monitoring';

  /**
   * DELETE /enterprises/enterprise/{enterprise-id}/site/{site-id}/monitoring.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteEnterprisesEnterpriseSiteMonitoring()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterprisesEnterpriseSiteMonitoring$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteEnterprisesEnterpriseSiteMonitoringPath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
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
   * DELETE /enterprises/enterprise/{enterprise-id}/site/{site-id}/monitoring.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteEnterprisesEnterpriseSiteMonitoring$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterprisesEnterpriseSiteMonitoring(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;
  }): Observable<void> {

    return this.deleteEnterprisesEnterpriseSiteMonitoring$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postEnterprisesEnterpriseSiteMonitoringEdgeDevice
   */
  static readonly PostEnterprisesEnterpriseSiteMonitoringEdgeDevicePath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/monitoring/edge-device/{edge-device-id}';

  /**
   * POST /enterprises/enterprise/{enterprise-id}/site/{site-id}/monitoring/edge-device.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postEnterprisesEnterpriseSiteMonitoringEdgeDevice()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterprisesEnterpriseSiteMonitoringEdgeDevice$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {edge-device-id}
     */
    'edge-device-id': any;
    body?: EnterprisesEnterpriseSiteMonitoringEdgeDevice
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostEnterprisesEnterpriseSiteMonitoringEdgeDevicePath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
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
   * POST /enterprises/enterprise/{enterprise-id}/site/{site-id}/monitoring/edge-device.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postEnterprisesEnterpriseSiteMonitoringEdgeDevice$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterprisesEnterpriseSiteMonitoringEdgeDevice(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {edge-device-id}
     */
    'edge-device-id': any;
    body?: EnterprisesEnterpriseSiteMonitoringEdgeDevice
  }): Observable<void> {

    return this.postEnterprisesEnterpriseSiteMonitoringEdgeDevice$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteEnterprisesEnterpriseSiteMonitoringEdgeDevice
   */
  static readonly DeleteEnterprisesEnterpriseSiteMonitoringEdgeDevicePath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/monitoring/edge-device/{edge-device-id}';

  /**
   * DELETE /enterprises/enterprise/{enterprise-id}/site/{site-id}/monitoring/edge-device.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteEnterprisesEnterpriseSiteMonitoringEdgeDevice()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterprisesEnterpriseSiteMonitoringEdgeDevice$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {edge-device-id}
     */
    'edge-device-id': any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteEnterprisesEnterpriseSiteMonitoringEdgeDevicePath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
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
   * DELETE /enterprises/enterprise/{enterprise-id}/site/{site-id}/monitoring/edge-device.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteEnterprisesEnterpriseSiteMonitoringEdgeDevice$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterprisesEnterpriseSiteMonitoringEdgeDevice(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {edge-device-id}
     */
    'edge-device-id': any;
  }): Observable<void> {

    return this.deleteEnterprisesEnterpriseSiteMonitoringEdgeDevice$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postEnterprisesEnterpriseSiteSimCard
   */
  static readonly PostEnterprisesEnterpriseSiteSimCardPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/sim-card/{sim-id}';

  /**
   * POST /enterprises/enterprise/{enterprise-id}/site/{site-id}/sim-card.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postEnterprisesEnterpriseSiteSimCard()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterprisesEnterpriseSiteSimCard$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {sim-id}
     */
    'sim-id': any;
    body?: EnterprisesEnterpriseSiteSimCard
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostEnterprisesEnterpriseSiteSimCardPath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.path('sim-id', params['sim-id'], {});
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
   * POST /enterprises/enterprise/{enterprise-id}/site/{site-id}/sim-card.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postEnterprisesEnterpriseSiteSimCard$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterprisesEnterpriseSiteSimCard(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {sim-id}
     */
    'sim-id': any;
    body?: EnterprisesEnterpriseSiteSimCard
  }): Observable<void> {

    return this.postEnterprisesEnterpriseSiteSimCard$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteEnterprisesEnterpriseSiteSimCard
   */
  static readonly DeleteEnterprisesEnterpriseSiteSimCardPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/sim-card/{sim-id}';

  /**
   * DELETE /enterprises/enterprise/{enterprise-id}/site/{site-id}/sim-card.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteEnterprisesEnterpriseSiteSimCard()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterprisesEnterpriseSiteSimCard$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {sim-id}
     */
    'sim-id': any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteEnterprisesEnterpriseSiteSimCardPath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.path('sim-id', params['sim-id'], {});
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
   * DELETE /enterprises/enterprise/{enterprise-id}/site/{site-id}/sim-card.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteEnterprisesEnterpriseSiteSimCard$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterprisesEnterpriseSiteSimCard(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {sim-id}
     */
    'sim-id': any;
  }): Observable<void> {

    return this.deleteEnterprisesEnterpriseSiteSimCard$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postEnterprisesEnterpriseSiteSlice
   */
  static readonly PostEnterprisesEnterpriseSiteSlicePath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}';

  /**
   * POST /enterprises/enterprise/{enterprise-id}/site/{site-id}/slice.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postEnterprisesEnterpriseSiteSlice()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterprisesEnterpriseSiteSlice$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {slice-id}
     */
    'slice-id': any;
    body?: EnterprisesEnterpriseSiteSlice
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostEnterprisesEnterpriseSiteSlicePath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.path('slice-id', params['slice-id'], {});
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
   * POST /enterprises/enterprise/{enterprise-id}/site/{site-id}/slice.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postEnterprisesEnterpriseSiteSlice$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterprisesEnterpriseSiteSlice(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {slice-id}
     */
    'slice-id': any;
    body?: EnterprisesEnterpriseSiteSlice
  }): Observable<void> {

    return this.postEnterprisesEnterpriseSiteSlice$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteEnterprisesEnterpriseSiteSlice
   */
  static readonly DeleteEnterprisesEnterpriseSiteSlicePath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}';

  /**
   * DELETE /enterprises/enterprise/{enterprise-id}/site/{site-id}/slice.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteEnterprisesEnterpriseSiteSlice()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterprisesEnterpriseSiteSlice$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {slice-id}
     */
    'slice-id': any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteEnterprisesEnterpriseSiteSlicePath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.path('slice-id', params['slice-id'], {});
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
   * DELETE /enterprises/enterprise/{enterprise-id}/site/{site-id}/slice.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteEnterprisesEnterpriseSiteSlice$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterprisesEnterpriseSiteSlice(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {slice-id}
     */
    'slice-id': any;
  }): Observable<void> {

    return this.deleteEnterprisesEnterpriseSiteSlice$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postEnterprisesEnterpriseSiteSliceDeviceGroup
   */
  static readonly PostEnterprisesEnterpriseSiteSliceDeviceGroupPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/device-group/{device-group}';

  /**
   * POST /enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/device-group.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postEnterprisesEnterpriseSiteSliceDeviceGroup()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterprisesEnterpriseSiteSliceDeviceGroup$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {slice-id}
     */
    'slice-id': any;

    /**
     * key {device-group}
     */
    'device-group': any;
    body?: EnterprisesEnterpriseSiteSliceDeviceGroup
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostEnterprisesEnterpriseSiteSliceDeviceGroupPath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.path('slice-id', params['slice-id'], {});
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
   * POST /enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/device-group.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postEnterprisesEnterpriseSiteSliceDeviceGroup$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterprisesEnterpriseSiteSliceDeviceGroup(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {slice-id}
     */
    'slice-id': any;

    /**
     * key {device-group}
     */
    'device-group': any;
    body?: EnterprisesEnterpriseSiteSliceDeviceGroup
  }): Observable<void> {

    return this.postEnterprisesEnterpriseSiteSliceDeviceGroup$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteEnterprisesEnterpriseSiteSliceDeviceGroup
   */
  static readonly DeleteEnterprisesEnterpriseSiteSliceDeviceGroupPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/device-group/{device-group}';

  /**
   * DELETE /enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/device-group.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteEnterprisesEnterpriseSiteSliceDeviceGroup()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterprisesEnterpriseSiteSliceDeviceGroup$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {slice-id}
     */
    'slice-id': any;

    /**
     * key {device-group}
     */
    'device-group': any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteEnterprisesEnterpriseSiteSliceDeviceGroupPath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.path('slice-id', params['slice-id'], {});
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
   * DELETE /enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/device-group.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteEnterprisesEnterpriseSiteSliceDeviceGroup$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterprisesEnterpriseSiteSliceDeviceGroup(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {slice-id}
     */
    'slice-id': any;

    /**
     * key {device-group}
     */
    'device-group': any;
  }): Observable<void> {

    return this.deleteEnterprisesEnterpriseSiteSliceDeviceGroup$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postEnterprisesEnterpriseSiteSliceFilter
   */
  static readonly PostEnterprisesEnterpriseSiteSliceFilterPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/filter/{application}';

  /**
   * POST /enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/filter.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postEnterprisesEnterpriseSiteSliceFilter()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterprisesEnterpriseSiteSliceFilter$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {slice-id}
     */
    'slice-id': any;

    /**
     * key {application}
     */
    application: any;
    body?: EnterprisesEnterpriseSiteSliceFilter
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostEnterprisesEnterpriseSiteSliceFilterPath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.path('slice-id', params['slice-id'], {});
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
   * POST /enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/filter.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postEnterprisesEnterpriseSiteSliceFilter$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterprisesEnterpriseSiteSliceFilter(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {slice-id}
     */
    'slice-id': any;

    /**
     * key {application}
     */
    application: any;
    body?: EnterprisesEnterpriseSiteSliceFilter
  }): Observable<void> {

    return this.postEnterprisesEnterpriseSiteSliceFilter$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteEnterprisesEnterpriseSiteSliceFilter
   */
  static readonly DeleteEnterprisesEnterpriseSiteSliceFilterPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/filter/{application}';

  /**
   * DELETE /enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/filter.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteEnterprisesEnterpriseSiteSliceFilter()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterprisesEnterpriseSiteSliceFilter$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {slice-id}
     */
    'slice-id': any;

    /**
     * key {application}
     */
    application: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteEnterprisesEnterpriseSiteSliceFilterPath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.path('slice-id', params['slice-id'], {});
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
   * DELETE /enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/filter.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteEnterprisesEnterpriseSiteSliceFilter$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterprisesEnterpriseSiteSliceFilter(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {slice-id}
     */
    'slice-id': any;

    /**
     * key {application}
     */
    application: any;
  }): Observable<void> {

    return this.deleteEnterprisesEnterpriseSiteSliceFilter$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postEnterprisesEnterpriseSiteSliceMbr
   */
  static readonly PostEnterprisesEnterpriseSiteSliceMbrPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/mbr';

  /**
   * POST /enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/mbr.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postEnterprisesEnterpriseSiteSliceMbr()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterprisesEnterpriseSiteSliceMbr$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {slice-id}
     */
    'slice-id': any;
    body?: EnterprisesEnterpriseSiteSliceMbr
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostEnterprisesEnterpriseSiteSliceMbrPath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.path('slice-id', params['slice-id'], {});
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
   * POST /enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/mbr.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postEnterprisesEnterpriseSiteSliceMbr$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterprisesEnterpriseSiteSliceMbr(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {slice-id}
     */
    'slice-id': any;
    body?: EnterprisesEnterpriseSiteSliceMbr
  }): Observable<void> {

    return this.postEnterprisesEnterpriseSiteSliceMbr$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteEnterprisesEnterpriseSiteSliceMbr
   */
  static readonly DeleteEnterprisesEnterpriseSiteSliceMbrPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/mbr';

  /**
   * DELETE /enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/mbr.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteEnterprisesEnterpriseSiteSliceMbr()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterprisesEnterpriseSiteSliceMbr$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {slice-id}
     */
    'slice-id': any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteEnterprisesEnterpriseSiteSliceMbrPath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.path('slice-id', params['slice-id'], {});
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
   * DELETE /enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/mbr.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteEnterprisesEnterpriseSiteSliceMbr$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterprisesEnterpriseSiteSliceMbr(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {slice-id}
     */
    'slice-id': any;
  }): Observable<void> {

    return this.deleteEnterprisesEnterpriseSiteSliceMbr$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postEnterprisesEnterpriseSiteSlicePriorityTrafficRule
   */
  static readonly PostEnterprisesEnterpriseSiteSlicePriorityTrafficRulePath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/priority-traffic-rule/{priority-traffic-rule-id}';

  /**
   * POST /enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/priority-traffic-rule.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postEnterprisesEnterpriseSiteSlicePriorityTrafficRule()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterprisesEnterpriseSiteSlicePriorityTrafficRule$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {slice-id}
     */
    'slice-id': any;

    /**
     * key {priority-traffic-rule-id}
     */
    'priority-traffic-rule-id': any;
    body?: EnterprisesEnterpriseSiteSlicePriorityTrafficRule
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostEnterprisesEnterpriseSiteSlicePriorityTrafficRulePath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.path('slice-id', params['slice-id'], {});
      rb.path('priority-traffic-rule-id', params['priority-traffic-rule-id'], {});
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
   * POST /enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/priority-traffic-rule.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postEnterprisesEnterpriseSiteSlicePriorityTrafficRule$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterprisesEnterpriseSiteSlicePriorityTrafficRule(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {slice-id}
     */
    'slice-id': any;

    /**
     * key {priority-traffic-rule-id}
     */
    'priority-traffic-rule-id': any;
    body?: EnterprisesEnterpriseSiteSlicePriorityTrafficRule
  }): Observable<void> {

    return this.postEnterprisesEnterpriseSiteSlicePriorityTrafficRule$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteEnterprisesEnterpriseSiteSlicePriorityTrafficRule
   */
  static readonly DeleteEnterprisesEnterpriseSiteSlicePriorityTrafficRulePath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/priority-traffic-rule/{priority-traffic-rule-id}';

  /**
   * DELETE /enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/priority-traffic-rule.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteEnterprisesEnterpriseSiteSlicePriorityTrafficRule()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterprisesEnterpriseSiteSlicePriorityTrafficRule$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {slice-id}
     */
    'slice-id': any;

    /**
     * key {priority-traffic-rule-id}
     */
    'priority-traffic-rule-id': any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteEnterprisesEnterpriseSiteSlicePriorityTrafficRulePath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.path('slice-id', params['slice-id'], {});
      rb.path('priority-traffic-rule-id', params['priority-traffic-rule-id'], {});
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
   * DELETE /enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/priority-traffic-rule.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteEnterprisesEnterpriseSiteSlicePriorityTrafficRule$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterprisesEnterpriseSiteSlicePriorityTrafficRule(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {slice-id}
     */
    'slice-id': any;

    /**
     * key {priority-traffic-rule-id}
     */
    'priority-traffic-rule-id': any;
  }): Observable<void> {

    return this.deleteEnterprisesEnterpriseSiteSlicePriorityTrafficRule$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postEnterprisesEnterpriseSiteSmallCell
   */
  static readonly PostEnterprisesEnterpriseSiteSmallCellPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/small-cell/{small-cell-id}';

  /**
   * POST /enterprises/enterprise/{enterprise-id}/site/{site-id}/small-cell.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postEnterprisesEnterpriseSiteSmallCell()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterprisesEnterpriseSiteSmallCell$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {small-cell-id}
     */
    'small-cell-id': any;
    body?: EnterprisesEnterpriseSiteSmallCell
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostEnterprisesEnterpriseSiteSmallCellPath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
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
   * POST /enterprises/enterprise/{enterprise-id}/site/{site-id}/small-cell.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postEnterprisesEnterpriseSiteSmallCell$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterprisesEnterpriseSiteSmallCell(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {small-cell-id}
     */
    'small-cell-id': any;
    body?: EnterprisesEnterpriseSiteSmallCell
  }): Observable<void> {

    return this.postEnterprisesEnterpriseSiteSmallCell$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteEnterprisesEnterpriseSiteSmallCell
   */
  static readonly DeleteEnterprisesEnterpriseSiteSmallCellPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/small-cell/{small-cell-id}';

  /**
   * DELETE /enterprises/enterprise/{enterprise-id}/site/{site-id}/small-cell.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteEnterprisesEnterpriseSiteSmallCell()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterprisesEnterpriseSiteSmallCell$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {small-cell-id}
     */
    'small-cell-id': any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteEnterprisesEnterpriseSiteSmallCellPath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
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
   * DELETE /enterprises/enterprise/{enterprise-id}/site/{site-id}/small-cell.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteEnterprisesEnterpriseSiteSmallCell$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterprisesEnterpriseSiteSmallCell(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {small-cell-id}
     */
    'small-cell-id': any;
  }): Observable<void> {

    return this.deleteEnterprisesEnterpriseSiteSmallCell$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postEnterprisesEnterpriseSiteUpf
   */
  static readonly PostEnterprisesEnterpriseSiteUpfPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/upf/{upf-id}';

  /**
   * POST /enterprises/enterprise/{enterprise-id}/site/{site-id}/upf.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postEnterprisesEnterpriseSiteUpf()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterprisesEnterpriseSiteUpf$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {upf-id}
     */
    'upf-id': any;
    body?: EnterprisesEnterpriseSiteUpf
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostEnterprisesEnterpriseSiteUpfPath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.path('upf-id', params['upf-id'], {});
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
   * POST /enterprises/enterprise/{enterprise-id}/site/{site-id}/upf.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postEnterprisesEnterpriseSiteUpf$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterprisesEnterpriseSiteUpf(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {upf-id}
     */
    'upf-id': any;
    body?: EnterprisesEnterpriseSiteUpf
  }): Observable<void> {

    return this.postEnterprisesEnterpriseSiteUpf$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteEnterprisesEnterpriseSiteUpf
   */
  static readonly DeleteEnterprisesEnterpriseSiteUpfPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/upf/{upf-id}';

  /**
   * DELETE /enterprises/enterprise/{enterprise-id}/site/{site-id}/upf.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteEnterprisesEnterpriseSiteUpf()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterprisesEnterpriseSiteUpf$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {upf-id}
     */
    'upf-id': any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteEnterprisesEnterpriseSiteUpfPath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.path('upf-id', params['upf-id'], {});
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
   * DELETE /enterprises/enterprise/{enterprise-id}/site/{site-id}/upf.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteEnterprisesEnterpriseSiteUpf$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterprisesEnterpriseSiteUpf(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {upf-id}
     */
    'upf-id': any;
  }): Observable<void> {

    return this.deleteEnterprisesEnterpriseSiteUpf$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postEnterprisesEnterpriseTemplate
   */
  static readonly PostEnterprisesEnterpriseTemplatePath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/template/{template-id}';

  /**
   * POST /enterprises/enterprise/{enterprise-id}/template.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postEnterprisesEnterpriseTemplate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterprisesEnterpriseTemplate$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {template-id}
     */
    'template-id': any;
    body?: EnterprisesEnterpriseTemplate
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostEnterprisesEnterpriseTemplatePath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('template-id', params['template-id'], {});
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
   * POST /enterprises/enterprise/{enterprise-id}/template.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postEnterprisesEnterpriseTemplate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterprisesEnterpriseTemplate(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {template-id}
     */
    'template-id': any;
    body?: EnterprisesEnterpriseTemplate
  }): Observable<void> {

    return this.postEnterprisesEnterpriseTemplate$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteEnterprisesEnterpriseTemplate
   */
  static readonly DeleteEnterprisesEnterpriseTemplatePath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/template/{template-id}';

  /**
   * DELETE /enterprises/enterprise/{enterprise-id}/template.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteEnterprisesEnterpriseTemplate()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterprisesEnterpriseTemplate$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {template-id}
     */
    'template-id': any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteEnterprisesEnterpriseTemplatePath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('template-id', params['template-id'], {});
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
   * DELETE /enterprises/enterprise/{enterprise-id}/template.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteEnterprisesEnterpriseTemplate$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterprisesEnterpriseTemplate(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {template-id}
     */
    'template-id': any;
  }): Observable<void> {

    return this.deleteEnterprisesEnterpriseTemplate$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postEnterprisesEnterpriseTemplateMbr
   */
  static readonly PostEnterprisesEnterpriseTemplateMbrPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/template/{template-id}/mbr';

  /**
   * POST /enterprises/enterprise/{enterprise-id}/template/{template-id}/mbr.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postEnterprisesEnterpriseTemplateMbr()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterprisesEnterpriseTemplateMbr$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {template-id}
     */
    'template-id': any;
    body?: EnterprisesEnterpriseTemplateMbr
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostEnterprisesEnterpriseTemplateMbrPath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('template-id', params['template-id'], {});
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
   * POST /enterprises/enterprise/{enterprise-id}/template/{template-id}/mbr.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postEnterprisesEnterpriseTemplateMbr$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterprisesEnterpriseTemplateMbr(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {template-id}
     */
    'template-id': any;
    body?: EnterprisesEnterpriseTemplateMbr
  }): Observable<void> {

    return this.postEnterprisesEnterpriseTemplateMbr$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteEnterprisesEnterpriseTemplateMbr
   */
  static readonly DeleteEnterprisesEnterpriseTemplateMbrPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/template/{template-id}/mbr';

  /**
   * DELETE /enterprises/enterprise/{enterprise-id}/template/{template-id}/mbr.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteEnterprisesEnterpriseTemplateMbr()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterprisesEnterpriseTemplateMbr$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {template-id}
     */
    'template-id': any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteEnterprisesEnterpriseTemplateMbrPath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('template-id', params['template-id'], {});
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
   * DELETE /enterprises/enterprise/{enterprise-id}/template/{template-id}/mbr.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteEnterprisesEnterpriseTemplateMbr$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterprisesEnterpriseTemplateMbr(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {template-id}
     */
    'template-id': any;
  }): Observable<void> {

    return this.deleteEnterprisesEnterpriseTemplateMbr$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postEnterprisesEnterpriseTrafficClass
   */
  static readonly PostEnterprisesEnterpriseTrafficClassPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/traffic-class/{traffic-class-id}';

  /**
   * POST /enterprises/enterprise/{enterprise-id}/traffic-class.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postEnterprisesEnterpriseTrafficClass()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterprisesEnterpriseTrafficClass$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {traffic-class-id}
     */
    'traffic-class-id': any;
    body?: EnterprisesEnterpriseTrafficClass
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostEnterprisesEnterpriseTrafficClassPath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('traffic-class-id', params['traffic-class-id'], {});
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
   * POST /enterprises/enterprise/{enterprise-id}/traffic-class.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postEnterprisesEnterpriseTrafficClass$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postEnterprisesEnterpriseTrafficClass(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {traffic-class-id}
     */
    'traffic-class-id': any;
    body?: EnterprisesEnterpriseTrafficClass
  }): Observable<void> {

    return this.postEnterprisesEnterpriseTrafficClass$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteEnterprisesEnterpriseTrafficClass
   */
  static readonly DeleteEnterprisesEnterpriseTrafficClassPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/traffic-class/{traffic-class-id}';

  /**
   * DELETE /enterprises/enterprise/{enterprise-id}/traffic-class.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteEnterprisesEnterpriseTrafficClass()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterprisesEnterpriseTrafficClass$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {traffic-class-id}
     */
    'traffic-class-id': any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteEnterprisesEnterpriseTrafficClassPath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('traffic-class-id', params['traffic-class-id'], {});
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
   * DELETE /enterprises/enterprise/{enterprise-id}/traffic-class.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteEnterprisesEnterpriseTrafficClass$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEnterprisesEnterpriseTrafficClass(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {traffic-class-id}
     */
    'traffic-class-id': any;
  }): Observable<void> {

    return this.deleteEnterprisesEnterpriseTrafficClass$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
