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
export class ContainerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getConnectivityServices
   */
  static readonly GetConnectivityServicesPath = '/aether/v2.0.x/{target}/connectivity-services';

  /**
   * GET /connectivity-services Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getConnectivityServices()` instead.
   *
   * This method doesn't expect any request body.
   */
  getConnectivityServices$Response(params: {

    /**
     * target (target in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<ConnectivityServices>> {

    const rb = new RequestBuilder(this.rootUrl, ContainerService.GetConnectivityServicesPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ConnectivityServices>;
      })
    );
  }

  /**
   * GET /connectivity-services Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getConnectivityServices$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getConnectivityServices(params: {

    /**
     * target (target in onos-config)
     */
    target: any;
  }): Observable<ConnectivityServices> {

    return this.getConnectivityServices$Response(params).pipe(
      map((r: StrictHttpResponse<ConnectivityServices>) => r.body as ConnectivityServices)
    );
  }

  /**
   * Path part for operation getConnectivityServicesConnectivityService
   */
  static readonly GetConnectivityServicesConnectivityServicePath = '/aether/v2.0.x/{target}/connectivity-services/connectivity-service/{connectivity-service-id}';

  /**
   * GET /connectivity-services/connectivity-service Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getConnectivityServicesConnectivityService()` instead.
   *
   * This method doesn't expect any request body.
   */
  getConnectivityServicesConnectivityService$Response(params: {

    /**
     * target (target in onos-config)
     */
    target: any;

    /**
     * key {connectivity-service-id}
     */
    'connectivity-service-id': any;
  }): Observable<StrictHttpResponse<ConnectivityServicesConnectivityService>> {

    const rb = new RequestBuilder(this.rootUrl, ContainerService.GetConnectivityServicesConnectivityServicePath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('connectivity-service-id', params['connectivity-service-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ConnectivityServicesConnectivityService>;
      })
    );
  }

  /**
   * GET /connectivity-services/connectivity-service Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getConnectivityServicesConnectivityService$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getConnectivityServicesConnectivityService(params: {

    /**
     * target (target in onos-config)
     */
    target: any;

    /**
     * key {connectivity-service-id}
     */
    'connectivity-service-id': any;
  }): Observable<ConnectivityServicesConnectivityService> {

    return this.getConnectivityServicesConnectivityService$Response(params).pipe(
      map((r: StrictHttpResponse<ConnectivityServicesConnectivityService>) => r.body as ConnectivityServicesConnectivityService)
    );
  }

  /**
   * Path part for operation getEnterprises
   */
  static readonly GetEnterprisesPath = '/aether/v2.0.x/{target}/enterprises';

  /**
   * GET /enterprises Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprises()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprises$Response(params: {

    /**
     * target (target in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<Enterprises>> {

    const rb = new RequestBuilder(this.rootUrl, ContainerService.GetEnterprisesPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Enterprises>;
      })
    );
  }

  /**
   * GET /enterprises Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprises$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprises(params: {

    /**
     * target (target in onos-config)
     */
    target: any;
  }): Observable<Enterprises> {

    return this.getEnterprises$Response(params).pipe(
      map((r: StrictHttpResponse<Enterprises>) => r.body as Enterprises)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterprise
   */
  static readonly GetEnterprisesEnterprisePath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}';

  /**
   * GET /enterprises/enterprise Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterprise()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterprise$Response(params: {

    /**
     * target (target in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;
  }): Observable<StrictHttpResponse<EnterprisesEnterprise>> {

    const rb = new RequestBuilder(this.rootUrl, ContainerService.GetEnterprisesEnterprisePath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterprisesEnterprise>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterprise$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterprise(params: {

    /**
     * target (target in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;
  }): Observable<EnterprisesEnterprise> {

    return this.getEnterprisesEnterprise$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterprise>) => r.body as EnterprisesEnterprise)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseApplication
   */
  static readonly GetEnterprisesEnterpriseApplicationPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/application/{application-id}';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/application Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseApplication()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseApplication$Response(params: {

    /**
     * target (target in onos-config)
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
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseApplication>> {

    const rb = new RequestBuilder(this.rootUrl, ContainerService.GetEnterprisesEnterpriseApplicationPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('application-id', params['application-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterprisesEnterpriseApplication>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/application Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseApplication$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseApplication(params: {

    /**
     * target (target in onos-config)
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
  }): Observable<EnterprisesEnterpriseApplication> {

    return this.getEnterprisesEnterpriseApplication$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseApplication>) => r.body as EnterprisesEnterpriseApplication)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseApplicationEndpoint
   */
  static readonly GetEnterprisesEnterpriseApplicationEndpointPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/application/{application-id}/endpoint/{endpoint-id}';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/application/{application-id}/endpoint Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseApplicationEndpoint()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseApplicationEndpoint$Response(params: {

    /**
     * target (target in onos-config)
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
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseApplicationEndpoint>> {

    const rb = new RequestBuilder(this.rootUrl, ContainerService.GetEnterprisesEnterpriseApplicationEndpointPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('application-id', params['application-id'], {});
      rb.path('endpoint-id', params['endpoint-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterprisesEnterpriseApplicationEndpoint>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/application/{application-id}/endpoint Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseApplicationEndpoint$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseApplicationEndpoint(params: {

    /**
     * target (target in onos-config)
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
  }): Observable<EnterprisesEnterpriseApplicationEndpoint> {

    return this.getEnterprisesEnterpriseApplicationEndpoint$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseApplicationEndpoint>) => r.body as EnterprisesEnterpriseApplicationEndpoint)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseApplicationEndpointMbr
   */
  static readonly GetEnterprisesEnterpriseApplicationEndpointMbrPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/application/{application-id}/endpoint/{endpoint-id}/mbr';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/application/{application-id}/endpoint/{endpoint-id}/mbr Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseApplicationEndpointMbr()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseApplicationEndpointMbr$Response(params: {

    /**
     * target (target in onos-config)
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
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseApplicationEndpointMbr>> {

    const rb = new RequestBuilder(this.rootUrl, ContainerService.GetEnterprisesEnterpriseApplicationEndpointMbrPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('application-id', params['application-id'], {});
      rb.path('endpoint-id', params['endpoint-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterprisesEnterpriseApplicationEndpointMbr>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/application/{application-id}/endpoint/{endpoint-id}/mbr Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseApplicationEndpointMbr$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseApplicationEndpointMbr(params: {

    /**
     * target (target in onos-config)
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
  }): Observable<EnterprisesEnterpriseApplicationEndpointMbr> {

    return this.getEnterprisesEnterpriseApplicationEndpointMbr$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseApplicationEndpointMbr>) => r.body as EnterprisesEnterpriseApplicationEndpointMbr)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseConnectivityService
   */
  static readonly GetEnterprisesEnterpriseConnectivityServicePath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/connectivity-service/{connectivity-service}';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/connectivity-service Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseConnectivityService()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseConnectivityService$Response(params: {

    /**
     * target (target in onos-config)
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
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseConnectivityService>> {

    const rb = new RequestBuilder(this.rootUrl, ContainerService.GetEnterprisesEnterpriseConnectivityServicePath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('connectivity-service', params['connectivity-service'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterprisesEnterpriseConnectivityService>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/connectivity-service Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseConnectivityService$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseConnectivityService(params: {

    /**
     * target (target in onos-config)
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
  }): Observable<EnterprisesEnterpriseConnectivityService> {

    return this.getEnterprisesEnterpriseConnectivityService$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseConnectivityService>) => r.body as EnterprisesEnterpriseConnectivityService)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSite
   */
  static readonly GetEnterprisesEnterpriseSitePath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSite()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSite$Response(params: {

    /**
     * target (target in onos-config)
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
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSite>> {

    const rb = new RequestBuilder(this.rootUrl, ContainerService.GetEnterprisesEnterpriseSitePath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterprisesEnterpriseSite>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSite$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSite(params: {

    /**
     * target (target in onos-config)
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
  }): Observable<EnterprisesEnterpriseSite> {

    return this.getEnterprisesEnterpriseSite$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSite>) => r.body as EnterprisesEnterpriseSite)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteDeviceGroup
   */
  static readonly GetEnterprisesEnterpriseSiteDeviceGroupPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/device-group/{device-group-id}';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/device-group Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSiteDeviceGroup()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteDeviceGroup$Response(params: {

    /**
     * target (target in onos-config)
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
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteDeviceGroup>> {

    const rb = new RequestBuilder(this.rootUrl, ContainerService.GetEnterprisesEnterpriseSiteDeviceGroupPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.path('device-group-id', params['device-group-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteDeviceGroup>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/device-group Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSiteDeviceGroup$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteDeviceGroup(params: {

    /**
     * target (target in onos-config)
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
  }): Observable<EnterprisesEnterpriseSiteDeviceGroup> {

    return this.getEnterprisesEnterpriseSiteDeviceGroup$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteDeviceGroup>) => r.body as EnterprisesEnterpriseSiteDeviceGroup)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteDeviceGroupDevice
   */
  static readonly GetEnterprisesEnterpriseSiteDeviceGroupDevicePath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/device-group/{device-group-id}/device/{device-id}';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/device-group/{device-group-id}/device Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSiteDeviceGroupDevice()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteDeviceGroupDevice$Response(params: {

    /**
     * target (target in onos-config)
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
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteDeviceGroupDevice>> {

    const rb = new RequestBuilder(this.rootUrl, ContainerService.GetEnterprisesEnterpriseSiteDeviceGroupDevicePath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.path('device-group-id', params['device-group-id'], {});
      rb.path('device-id', params['device-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteDeviceGroupDevice>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/device-group/{device-group-id}/device Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSiteDeviceGroupDevice$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteDeviceGroupDevice(params: {

    /**
     * target (target in onos-config)
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
  }): Observable<EnterprisesEnterpriseSiteDeviceGroupDevice> {

    return this.getEnterprisesEnterpriseSiteDeviceGroupDevice$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteDeviceGroupDevice>) => r.body as EnterprisesEnterpriseSiteDeviceGroupDevice)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteDeviceGroupMbr
   */
  static readonly GetEnterprisesEnterpriseSiteDeviceGroupMbrPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/device-group/{device-group-id}/mbr';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/device-group/{device-group-id}/mbr Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSiteDeviceGroupMbr()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteDeviceGroupMbr$Response(params: {

    /**
     * target (target in onos-config)
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
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteDeviceGroupMbr>> {

    const rb = new RequestBuilder(this.rootUrl, ContainerService.GetEnterprisesEnterpriseSiteDeviceGroupMbrPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.path('device-group-id', params['device-group-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteDeviceGroupMbr>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/device-group/{device-group-id}/mbr Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSiteDeviceGroupMbr$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteDeviceGroupMbr(params: {

    /**
     * target (target in onos-config)
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
  }): Observable<EnterprisesEnterpriseSiteDeviceGroupMbr> {

    return this.getEnterprisesEnterpriseSiteDeviceGroupMbr$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteDeviceGroupMbr>) => r.body as EnterprisesEnterpriseSiteDeviceGroupMbr)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteDevice
   */
  static readonly GetEnterprisesEnterpriseSiteDevicePath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/device/{device-id}';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/device Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSiteDevice()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteDevice$Response(params: {

    /**
     * target (target in onos-config)
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
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteDevice>> {

    const rb = new RequestBuilder(this.rootUrl, ContainerService.GetEnterprisesEnterpriseSiteDevicePath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.path('device-id', params['device-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteDevice>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/device Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSiteDevice$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteDevice(params: {

    /**
     * target (target in onos-config)
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
  }): Observable<EnterprisesEnterpriseSiteDevice> {

    return this.getEnterprisesEnterpriseSiteDevice$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteDevice>) => r.body as EnterprisesEnterpriseSiteDevice)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteImsiDefinition
   */
  static readonly GetEnterprisesEnterpriseSiteImsiDefinitionPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/imsi-definition';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/imsi-definition Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSiteImsiDefinition()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteImsiDefinition$Response(params: {

    /**
     * target (target in onos-config)
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
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteImsiDefinition>> {

    const rb = new RequestBuilder(this.rootUrl, ContainerService.GetEnterprisesEnterpriseSiteImsiDefinitionPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteImsiDefinition>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/imsi-definition Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSiteImsiDefinition$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteImsiDefinition(params: {

    /**
     * target (target in onos-config)
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
  }): Observable<EnterprisesEnterpriseSiteImsiDefinition> {

    return this.getEnterprisesEnterpriseSiteImsiDefinition$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteImsiDefinition>) => r.body as EnterprisesEnterpriseSiteImsiDefinition)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteIpDomain
   */
  static readonly GetEnterprisesEnterpriseSiteIpDomainPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/ip-domain/{ip-domain-id}';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/ip-domain Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSiteIpDomain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteIpDomain$Response(params: {

    /**
     * target (target in onos-config)
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
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteIpDomain>> {

    const rb = new RequestBuilder(this.rootUrl, ContainerService.GetEnterprisesEnterpriseSiteIpDomainPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.path('ip-domain-id', params['ip-domain-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteIpDomain>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/ip-domain Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSiteIpDomain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteIpDomain(params: {

    /**
     * target (target in onos-config)
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
  }): Observable<EnterprisesEnterpriseSiteIpDomain> {

    return this.getEnterprisesEnterpriseSiteIpDomain$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteIpDomain>) => r.body as EnterprisesEnterpriseSiteIpDomain)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteMonitoring
   */
  static readonly GetEnterprisesEnterpriseSiteMonitoringPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/monitoring';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/monitoring Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSiteMonitoring()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteMonitoring$Response(params: {

    /**
     * target (target in onos-config)
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
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteMonitoring>> {

    const rb = new RequestBuilder(this.rootUrl, ContainerService.GetEnterprisesEnterpriseSiteMonitoringPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteMonitoring>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/monitoring Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSiteMonitoring$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteMonitoring(params: {

    /**
     * target (target in onos-config)
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
  }): Observable<EnterprisesEnterpriseSiteMonitoring> {

    return this.getEnterprisesEnterpriseSiteMonitoring$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteMonitoring>) => r.body as EnterprisesEnterpriseSiteMonitoring)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteMonitoringEdgeDevice
   */
  static readonly GetEnterprisesEnterpriseSiteMonitoringEdgeDevicePath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/monitoring/edge-device/{edge-device-id}';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/monitoring/edge-device Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSiteMonitoringEdgeDevice()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteMonitoringEdgeDevice$Response(params: {

    /**
     * target (target in onos-config)
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
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteMonitoringEdgeDevice>> {

    const rb = new RequestBuilder(this.rootUrl, ContainerService.GetEnterprisesEnterpriseSiteMonitoringEdgeDevicePath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.path('edge-device-id', params['edge-device-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteMonitoringEdgeDevice>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/monitoring/edge-device Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSiteMonitoringEdgeDevice$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteMonitoringEdgeDevice(params: {

    /**
     * target (target in onos-config)
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
  }): Observable<EnterprisesEnterpriseSiteMonitoringEdgeDevice> {

    return this.getEnterprisesEnterpriseSiteMonitoringEdgeDevice$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteMonitoringEdgeDevice>) => r.body as EnterprisesEnterpriseSiteMonitoringEdgeDevice)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteSimCard
   */
  static readonly GetEnterprisesEnterpriseSiteSimCardPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/sim-card/{sim-id}';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/sim-card Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSiteSimCard()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteSimCard$Response(params: {

    /**
     * target (target in onos-config)
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
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteSimCard>> {

    const rb = new RequestBuilder(this.rootUrl, ContainerService.GetEnterprisesEnterpriseSiteSimCardPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.path('sim-id', params['sim-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteSimCard>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/sim-card Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSiteSimCard$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteSimCard(params: {

    /**
     * target (target in onos-config)
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
  }): Observable<EnterprisesEnterpriseSiteSimCard> {

    return this.getEnterprisesEnterpriseSiteSimCard$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteSimCard>) => r.body as EnterprisesEnterpriseSiteSimCard)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteSlice
   */
  static readonly GetEnterprisesEnterpriseSiteSlicePath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/slice Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSiteSlice()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteSlice$Response(params: {

    /**
     * target (target in onos-config)
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
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteSlice>> {

    const rb = new RequestBuilder(this.rootUrl, ContainerService.GetEnterprisesEnterpriseSiteSlicePath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.path('slice-id', params['slice-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteSlice>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/slice Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSiteSlice$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteSlice(params: {

    /**
     * target (target in onos-config)
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
  }): Observable<EnterprisesEnterpriseSiteSlice> {

    return this.getEnterprisesEnterpriseSiteSlice$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteSlice>) => r.body as EnterprisesEnterpriseSiteSlice)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteSliceDeviceGroup
   */
  static readonly GetEnterprisesEnterpriseSiteSliceDeviceGroupPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/device-group/{device-group}';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/device-group Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSiteSliceDeviceGroup()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteSliceDeviceGroup$Response(params: {

    /**
     * target (target in onos-config)
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
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteSliceDeviceGroup>> {

    const rb = new RequestBuilder(this.rootUrl, ContainerService.GetEnterprisesEnterpriseSiteSliceDeviceGroupPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.path('slice-id', params['slice-id'], {});
      rb.path('device-group', params['device-group'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteSliceDeviceGroup>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/device-group Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSiteSliceDeviceGroup$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteSliceDeviceGroup(params: {

    /**
     * target (target in onos-config)
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
  }): Observable<EnterprisesEnterpriseSiteSliceDeviceGroup> {

    return this.getEnterprisesEnterpriseSiteSliceDeviceGroup$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteSliceDeviceGroup>) => r.body as EnterprisesEnterpriseSiteSliceDeviceGroup)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteSliceFilter
   */
  static readonly GetEnterprisesEnterpriseSiteSliceFilterPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/filter/{application}';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/filter Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSiteSliceFilter()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteSliceFilter$Response(params: {

    /**
     * target (target in onos-config)
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
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteSliceFilter>> {

    const rb = new RequestBuilder(this.rootUrl, ContainerService.GetEnterprisesEnterpriseSiteSliceFilterPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.path('slice-id', params['slice-id'], {});
      rb.path('application', params.application, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteSliceFilter>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/filter Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSiteSliceFilter$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteSliceFilter(params: {

    /**
     * target (target in onos-config)
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
  }): Observable<EnterprisesEnterpriseSiteSliceFilter> {

    return this.getEnterprisesEnterpriseSiteSliceFilter$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteSliceFilter>) => r.body as EnterprisesEnterpriseSiteSliceFilter)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteSliceMbr
   */
  static readonly GetEnterprisesEnterpriseSiteSliceMbrPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/mbr';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/mbr Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSiteSliceMbr()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteSliceMbr$Response(params: {

    /**
     * target (target in onos-config)
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
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteSliceMbr>> {

    const rb = new RequestBuilder(this.rootUrl, ContainerService.GetEnterprisesEnterpriseSiteSliceMbrPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.path('slice-id', params['slice-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteSliceMbr>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/mbr Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSiteSliceMbr$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteSliceMbr(params: {

    /**
     * target (target in onos-config)
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
  }): Observable<EnterprisesEnterpriseSiteSliceMbr> {

    return this.getEnterprisesEnterpriseSiteSliceMbr$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteSliceMbr>) => r.body as EnterprisesEnterpriseSiteSliceMbr)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteSlicePriorityTrafficRule
   */
  static readonly GetEnterprisesEnterpriseSiteSlicePriorityTrafficRulePath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/priority-traffic-rule/{priority-traffic-rule-id}';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/priority-traffic-rule Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSiteSlicePriorityTrafficRule()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteSlicePriorityTrafficRule$Response(params: {

    /**
     * target (target in onos-config)
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
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteSlicePriorityTrafficRule>> {

    const rb = new RequestBuilder(this.rootUrl, ContainerService.GetEnterprisesEnterpriseSiteSlicePriorityTrafficRulePath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.path('slice-id', params['slice-id'], {});
      rb.path('priority-traffic-rule-id', params['priority-traffic-rule-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteSlicePriorityTrafficRule>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/priority-traffic-rule Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSiteSlicePriorityTrafficRule$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteSlicePriorityTrafficRule(params: {

    /**
     * target (target in onos-config)
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
  }): Observable<EnterprisesEnterpriseSiteSlicePriorityTrafficRule> {

    return this.getEnterprisesEnterpriseSiteSlicePriorityTrafficRule$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteSlicePriorityTrafficRule>) => r.body as EnterprisesEnterpriseSiteSlicePriorityTrafficRule)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteSmallCell
   */
  static readonly GetEnterprisesEnterpriseSiteSmallCellPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/small-cell/{small-cell-id}';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/small-cell Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSiteSmallCell()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteSmallCell$Response(params: {

    /**
     * target (target in onos-config)
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
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteSmallCell>> {

    const rb = new RequestBuilder(this.rootUrl, ContainerService.GetEnterprisesEnterpriseSiteSmallCellPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.path('small-cell-id', params['small-cell-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteSmallCell>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/small-cell Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSiteSmallCell$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteSmallCell(params: {

    /**
     * target (target in onos-config)
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
  }): Observable<EnterprisesEnterpriseSiteSmallCell> {

    return this.getEnterprisesEnterpriseSiteSmallCell$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteSmallCell>) => r.body as EnterprisesEnterpriseSiteSmallCell)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteUpf
   */
  static readonly GetEnterprisesEnterpriseSiteUpfPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/upf/{upf-id}';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/upf Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSiteUpf()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteUpf$Response(params: {

    /**
     * target (target in onos-config)
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
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteUpf>> {

    const rb = new RequestBuilder(this.rootUrl, ContainerService.GetEnterprisesEnterpriseSiteUpfPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.path('upf-id', params['upf-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteUpf>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/upf Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSiteUpf$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteUpf(params: {

    /**
     * target (target in onos-config)
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
  }): Observable<EnterprisesEnterpriseSiteUpf> {

    return this.getEnterprisesEnterpriseSiteUpf$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteUpf>) => r.body as EnterprisesEnterpriseSiteUpf)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseTemplate
   */
  static readonly GetEnterprisesEnterpriseTemplatePath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/template/{template-id}';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/template Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseTemplate()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseTemplate$Response(params: {

    /**
     * target (target in onos-config)
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
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseTemplate>> {

    const rb = new RequestBuilder(this.rootUrl, ContainerService.GetEnterprisesEnterpriseTemplatePath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('template-id', params['template-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterprisesEnterpriseTemplate>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/template Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseTemplate$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseTemplate(params: {

    /**
     * target (target in onos-config)
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
  }): Observable<EnterprisesEnterpriseTemplate> {

    return this.getEnterprisesEnterpriseTemplate$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseTemplate>) => r.body as EnterprisesEnterpriseTemplate)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseTemplateMbr
   */
  static readonly GetEnterprisesEnterpriseTemplateMbrPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/template/{template-id}/mbr';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/template/{template-id}/mbr Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseTemplateMbr()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseTemplateMbr$Response(params: {

    /**
     * target (target in onos-config)
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
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseTemplateMbr>> {

    const rb = new RequestBuilder(this.rootUrl, ContainerService.GetEnterprisesEnterpriseTemplateMbrPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('template-id', params['template-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterprisesEnterpriseTemplateMbr>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/template/{template-id}/mbr Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseTemplateMbr$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseTemplateMbr(params: {

    /**
     * target (target in onos-config)
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
  }): Observable<EnterprisesEnterpriseTemplateMbr> {

    return this.getEnterprisesEnterpriseTemplateMbr$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseTemplateMbr>) => r.body as EnterprisesEnterpriseTemplateMbr)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseTrafficClass
   */
  static readonly GetEnterprisesEnterpriseTrafficClassPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/traffic-class/{traffic-class-id}';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/traffic-class Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseTrafficClass()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseTrafficClass$Response(params: {

    /**
     * target (target in onos-config)
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
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseTrafficClass>> {

    const rb = new RequestBuilder(this.rootUrl, ContainerService.GetEnterprisesEnterpriseTrafficClassPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('traffic-class-id', params['traffic-class-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterprisesEnterpriseTrafficClass>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/traffic-class Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseTrafficClass$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseTrafficClass(params: {

    /**
     * target (target in onos-config)
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
  }): Observable<EnterprisesEnterpriseTrafficClass> {

    return this.getEnterprisesEnterpriseTrafficClass$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseTrafficClass>) => r.body as EnterprisesEnterpriseTrafficClass)
    );
  }

}
