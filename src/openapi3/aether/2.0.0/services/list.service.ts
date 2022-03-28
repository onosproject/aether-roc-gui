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

import { ConnectivityServicesConnectivityServiceList } from '../models/connectivity-services-connectivity-service-list';
import { EnterprisesEnterpriseApplicationEndpointList } from '../models/enterprises-enterprise-application-endpoint-list';
import { EnterprisesEnterpriseApplicationList } from '../models/enterprises-enterprise-application-list';
import { EnterprisesEnterpriseConnectivityServiceList } from '../models/enterprises-enterprise-connectivity-service-list';
import { EnterprisesEnterpriseList } from '../models/enterprises-enterprise-list';
import { EnterprisesEnterpriseSiteDeviceGroupDeviceList } from '../models/enterprises-enterprise-site-device-group-device-list';
import { EnterprisesEnterpriseSiteDeviceGroupList } from '../models/enterprises-enterprise-site-device-group-list';
import { EnterprisesEnterpriseSiteDeviceList } from '../models/enterprises-enterprise-site-device-list';
import { EnterprisesEnterpriseSiteIpDomainList } from '../models/enterprises-enterprise-site-ip-domain-list';
import { EnterprisesEnterpriseSiteList } from '../models/enterprises-enterprise-site-list';
import { EnterprisesEnterpriseSiteMonitoringEdgeDeviceList } from '../models/enterprises-enterprise-site-monitoring-edge-device-list';
import { EnterprisesEnterpriseSiteSimCardList } from '../models/enterprises-enterprise-site-sim-card-list';
import { EnterprisesEnterpriseSiteSliceDeviceGroupList } from '../models/enterprises-enterprise-site-slice-device-group-list';
import { EnterprisesEnterpriseSiteSliceFilterList } from '../models/enterprises-enterprise-site-slice-filter-list';
import { EnterprisesEnterpriseSiteSliceList } from '../models/enterprises-enterprise-site-slice-list';
import { EnterprisesEnterpriseSiteSlicePriorityTrafficRuleList } from '../models/enterprises-enterprise-site-slice-priority-traffic-rule-list';
import { EnterprisesEnterpriseSiteSmallCellList } from '../models/enterprises-enterprise-site-small-cell-list';
import { EnterprisesEnterpriseSiteUpfList } from '../models/enterprises-enterprise-site-upf-list';
import { EnterprisesEnterpriseTemplateList } from '../models/enterprises-enterprise-template-list';
import { EnterprisesEnterpriseTrafficClassList } from '../models/enterprises-enterprise-traffic-class-list';

@Injectable({
  providedIn: 'root',
})
export class ListService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getConnectivityServicesConnectivityServiceList
   */
  static readonly GetConnectivityServicesConnectivityServiceListPath = '/aether/v2.0.x/{target}/connectivity-services/connectivity-service';

  /**
   * GET /connectivity-services/connectivity-service List.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getConnectivityServicesConnectivityServiceList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getConnectivityServicesConnectivityServiceList$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<Array<ConnectivityServicesConnectivityServiceList>>> {

    const rb = new RequestBuilder(this.rootUrl, ListService.GetConnectivityServicesConnectivityServiceListPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ConnectivityServicesConnectivityServiceList>>;
      })
    );
  }

  /**
   * GET /connectivity-services/connectivity-service List.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getConnectivityServicesConnectivityServiceList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getConnectivityServicesConnectivityServiceList(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<Array<ConnectivityServicesConnectivityServiceList>> {

    return this.getConnectivityServicesConnectivityServiceList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ConnectivityServicesConnectivityServiceList>>) => r.body as Array<ConnectivityServicesConnectivityServiceList>)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseList
   */
  static readonly GetEnterprisesEnterpriseListPath = '/aether/v2.0.x/{target}/enterprises/enterprise';

  /**
   * GET /enterprises/enterprise List.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseList$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<Array<EnterprisesEnterpriseList>>> {

    const rb = new RequestBuilder(this.rootUrl, ListService.GetEnterprisesEnterpriseListPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<EnterprisesEnterpriseList>>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise List.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseList(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<Array<EnterprisesEnterpriseList>> {

    return this.getEnterprisesEnterpriseList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<EnterprisesEnterpriseList>>) => r.body as Array<EnterprisesEnterpriseList>)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseApplicationList
   */
  static readonly GetEnterprisesEnterpriseApplicationListPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/application';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/application List.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseApplicationList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseApplicationList$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;
  }): Observable<StrictHttpResponse<Array<EnterprisesEnterpriseApplicationList>>> {

    const rb = new RequestBuilder(this.rootUrl, ListService.GetEnterprisesEnterpriseApplicationListPath, 'get');
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
        return r as StrictHttpResponse<Array<EnterprisesEnterpriseApplicationList>>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/application List.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseApplicationList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseApplicationList(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;
  }): Observable<Array<EnterprisesEnterpriseApplicationList>> {

    return this.getEnterprisesEnterpriseApplicationList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<EnterprisesEnterpriseApplicationList>>) => r.body as Array<EnterprisesEnterpriseApplicationList>)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseApplicationEndpointList
   */
  static readonly GetEnterprisesEnterpriseApplicationEndpointListPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/application/{application-id}/endpoint';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/application/{application-id}/endpoint List.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseApplicationEndpointList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseApplicationEndpointList$Response(params: {

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
  }): Observable<StrictHttpResponse<Array<EnterprisesEnterpriseApplicationEndpointList>>> {

    const rb = new RequestBuilder(this.rootUrl, ListService.GetEnterprisesEnterpriseApplicationEndpointListPath, 'get');
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
        return r as StrictHttpResponse<Array<EnterprisesEnterpriseApplicationEndpointList>>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/application/{application-id}/endpoint List.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseApplicationEndpointList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseApplicationEndpointList(params: {

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
  }): Observable<Array<EnterprisesEnterpriseApplicationEndpointList>> {

    return this.getEnterprisesEnterpriseApplicationEndpointList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<EnterprisesEnterpriseApplicationEndpointList>>) => r.body as Array<EnterprisesEnterpriseApplicationEndpointList>)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseConnectivityServiceList
   */
  static readonly GetEnterprisesEnterpriseConnectivityServiceListPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/connectivity-service';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/connectivity-service List.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseConnectivityServiceList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseConnectivityServiceList$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;
  }): Observable<StrictHttpResponse<Array<EnterprisesEnterpriseConnectivityServiceList>>> {

    const rb = new RequestBuilder(this.rootUrl, ListService.GetEnterprisesEnterpriseConnectivityServiceListPath, 'get');
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
        return r as StrictHttpResponse<Array<EnterprisesEnterpriseConnectivityServiceList>>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/connectivity-service List.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseConnectivityServiceList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseConnectivityServiceList(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;
  }): Observable<Array<EnterprisesEnterpriseConnectivityServiceList>> {

    return this.getEnterprisesEnterpriseConnectivityServiceList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<EnterprisesEnterpriseConnectivityServiceList>>) => r.body as Array<EnterprisesEnterpriseConnectivityServiceList>)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteList
   */
  static readonly GetEnterprisesEnterpriseSiteListPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site List.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSiteList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteList$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;
  }): Observable<StrictHttpResponse<Array<EnterprisesEnterpriseSiteList>>> {

    const rb = new RequestBuilder(this.rootUrl, ListService.GetEnterprisesEnterpriseSiteListPath, 'get');
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
        return r as StrictHttpResponse<Array<EnterprisesEnterpriseSiteList>>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site List.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSiteList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteList(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;
  }): Observable<Array<EnterprisesEnterpriseSiteList>> {

    return this.getEnterprisesEnterpriseSiteList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<EnterprisesEnterpriseSiteList>>) => r.body as Array<EnterprisesEnterpriseSiteList>)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteDeviceList
   */
  static readonly GetEnterprisesEnterpriseSiteDeviceListPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/device';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/device List.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSiteDeviceList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteDeviceList$Response(params: {

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
  }): Observable<StrictHttpResponse<Array<EnterprisesEnterpriseSiteDeviceList>>> {

    const rb = new RequestBuilder(this.rootUrl, ListService.GetEnterprisesEnterpriseSiteDeviceListPath, 'get');
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
        return r as StrictHttpResponse<Array<EnterprisesEnterpriseSiteDeviceList>>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/device List.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSiteDeviceList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteDeviceList(params: {

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
  }): Observable<Array<EnterprisesEnterpriseSiteDeviceList>> {

    return this.getEnterprisesEnterpriseSiteDeviceList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<EnterprisesEnterpriseSiteDeviceList>>) => r.body as Array<EnterprisesEnterpriseSiteDeviceList>)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteDeviceGroupList
   */
  static readonly GetEnterprisesEnterpriseSiteDeviceGroupListPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/device-group';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/device-group List.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSiteDeviceGroupList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteDeviceGroupList$Response(params: {

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
  }): Observable<StrictHttpResponse<Array<EnterprisesEnterpriseSiteDeviceGroupList>>> {

    const rb = new RequestBuilder(this.rootUrl, ListService.GetEnterprisesEnterpriseSiteDeviceGroupListPath, 'get');
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
        return r as StrictHttpResponse<Array<EnterprisesEnterpriseSiteDeviceGroupList>>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/device-group List.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSiteDeviceGroupList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteDeviceGroupList(params: {

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
  }): Observable<Array<EnterprisesEnterpriseSiteDeviceGroupList>> {

    return this.getEnterprisesEnterpriseSiteDeviceGroupList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<EnterprisesEnterpriseSiteDeviceGroupList>>) => r.body as Array<EnterprisesEnterpriseSiteDeviceGroupList>)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteDeviceGroupDeviceList
   */
  static readonly GetEnterprisesEnterpriseSiteDeviceGroupDeviceListPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/device-group/{device-group-id}/device';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/device-group/{device-group-id}/device List.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSiteDeviceGroupDeviceList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteDeviceGroupDeviceList$Response(params: {

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
  }): Observable<StrictHttpResponse<Array<EnterprisesEnterpriseSiteDeviceGroupDeviceList>>> {

    const rb = new RequestBuilder(this.rootUrl, ListService.GetEnterprisesEnterpriseSiteDeviceGroupDeviceListPath, 'get');
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
        return r as StrictHttpResponse<Array<EnterprisesEnterpriseSiteDeviceGroupDeviceList>>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/device-group/{device-group-id}/device List.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSiteDeviceGroupDeviceList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteDeviceGroupDeviceList(params: {

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
  }): Observable<Array<EnterprisesEnterpriseSiteDeviceGroupDeviceList>> {

    return this.getEnterprisesEnterpriseSiteDeviceGroupDeviceList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<EnterprisesEnterpriseSiteDeviceGroupDeviceList>>) => r.body as Array<EnterprisesEnterpriseSiteDeviceGroupDeviceList>)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteIpDomainList
   */
  static readonly GetEnterprisesEnterpriseSiteIpDomainListPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/ip-domain';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/ip-domain List.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSiteIpDomainList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteIpDomainList$Response(params: {

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
  }): Observable<StrictHttpResponse<Array<EnterprisesEnterpriseSiteIpDomainList>>> {

    const rb = new RequestBuilder(this.rootUrl, ListService.GetEnterprisesEnterpriseSiteIpDomainListPath, 'get');
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
        return r as StrictHttpResponse<Array<EnterprisesEnterpriseSiteIpDomainList>>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/ip-domain List.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSiteIpDomainList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteIpDomainList(params: {

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
  }): Observable<Array<EnterprisesEnterpriseSiteIpDomainList>> {

    return this.getEnterprisesEnterpriseSiteIpDomainList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<EnterprisesEnterpriseSiteIpDomainList>>) => r.body as Array<EnterprisesEnterpriseSiteIpDomainList>)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteMonitoringEdgeDeviceList
   */
  static readonly GetEnterprisesEnterpriseSiteMonitoringEdgeDeviceListPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/monitoring/edge-device';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/monitoring/edge-device List.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSiteMonitoringEdgeDeviceList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteMonitoringEdgeDeviceList$Response(params: {

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
  }): Observable<StrictHttpResponse<Array<EnterprisesEnterpriseSiteMonitoringEdgeDeviceList>>> {

    const rb = new RequestBuilder(this.rootUrl, ListService.GetEnterprisesEnterpriseSiteMonitoringEdgeDeviceListPath, 'get');
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
        return r as StrictHttpResponse<Array<EnterprisesEnterpriseSiteMonitoringEdgeDeviceList>>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/monitoring/edge-device List.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSiteMonitoringEdgeDeviceList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteMonitoringEdgeDeviceList(params: {

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
  }): Observable<Array<EnterprisesEnterpriseSiteMonitoringEdgeDeviceList>> {

    return this.getEnterprisesEnterpriseSiteMonitoringEdgeDeviceList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<EnterprisesEnterpriseSiteMonitoringEdgeDeviceList>>) => r.body as Array<EnterprisesEnterpriseSiteMonitoringEdgeDeviceList>)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteSimCardList
   */
  static readonly GetEnterprisesEnterpriseSiteSimCardListPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/sim-card';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/sim-card List.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSiteSimCardList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteSimCardList$Response(params: {

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
  }): Observable<StrictHttpResponse<Array<EnterprisesEnterpriseSiteSimCardList>>> {

    const rb = new RequestBuilder(this.rootUrl, ListService.GetEnterprisesEnterpriseSiteSimCardListPath, 'get');
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
        return r as StrictHttpResponse<Array<EnterprisesEnterpriseSiteSimCardList>>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/sim-card List.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSiteSimCardList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteSimCardList(params: {

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
  }): Observable<Array<EnterprisesEnterpriseSiteSimCardList>> {

    return this.getEnterprisesEnterpriseSiteSimCardList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<EnterprisesEnterpriseSiteSimCardList>>) => r.body as Array<EnterprisesEnterpriseSiteSimCardList>)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteSliceList
   */
  static readonly GetEnterprisesEnterpriseSiteSliceListPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/slice';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/slice List.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSiteSliceList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteSliceList$Response(params: {

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
  }): Observable<StrictHttpResponse<Array<EnterprisesEnterpriseSiteSliceList>>> {

    const rb = new RequestBuilder(this.rootUrl, ListService.GetEnterprisesEnterpriseSiteSliceListPath, 'get');
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
        return r as StrictHttpResponse<Array<EnterprisesEnterpriseSiteSliceList>>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/slice List.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSiteSliceList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteSliceList(params: {

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
  }): Observable<Array<EnterprisesEnterpriseSiteSliceList>> {

    return this.getEnterprisesEnterpriseSiteSliceList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<EnterprisesEnterpriseSiteSliceList>>) => r.body as Array<EnterprisesEnterpriseSiteSliceList>)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteSliceDeviceGroupList
   */
  static readonly GetEnterprisesEnterpriseSiteSliceDeviceGroupListPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/device-group';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/device-group List.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSiteSliceDeviceGroupList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteSliceDeviceGroupList$Response(params: {

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
  }): Observable<StrictHttpResponse<Array<EnterprisesEnterpriseSiteSliceDeviceGroupList>>> {

    const rb = new RequestBuilder(this.rootUrl, ListService.GetEnterprisesEnterpriseSiteSliceDeviceGroupListPath, 'get');
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
        return r as StrictHttpResponse<Array<EnterprisesEnterpriseSiteSliceDeviceGroupList>>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/device-group List.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSiteSliceDeviceGroupList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteSliceDeviceGroupList(params: {

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
  }): Observable<Array<EnterprisesEnterpriseSiteSliceDeviceGroupList>> {

    return this.getEnterprisesEnterpriseSiteSliceDeviceGroupList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<EnterprisesEnterpriseSiteSliceDeviceGroupList>>) => r.body as Array<EnterprisesEnterpriseSiteSliceDeviceGroupList>)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteSliceFilterList
   */
  static readonly GetEnterprisesEnterpriseSiteSliceFilterListPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/filter';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/filter List.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSiteSliceFilterList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteSliceFilterList$Response(params: {

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
  }): Observable<StrictHttpResponse<Array<EnterprisesEnterpriseSiteSliceFilterList>>> {

    const rb = new RequestBuilder(this.rootUrl, ListService.GetEnterprisesEnterpriseSiteSliceFilterListPath, 'get');
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
        return r as StrictHttpResponse<Array<EnterprisesEnterpriseSiteSliceFilterList>>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/filter List.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSiteSliceFilterList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteSliceFilterList(params: {

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
  }): Observable<Array<EnterprisesEnterpriseSiteSliceFilterList>> {

    return this.getEnterprisesEnterpriseSiteSliceFilterList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<EnterprisesEnterpriseSiteSliceFilterList>>) => r.body as Array<EnterprisesEnterpriseSiteSliceFilterList>)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteSlicePriorityTrafficRuleList
   */
  static readonly GetEnterprisesEnterpriseSiteSlicePriorityTrafficRuleListPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/priority-traffic-rule';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/priority-traffic-rule List.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSiteSlicePriorityTrafficRuleList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteSlicePriorityTrafficRuleList$Response(params: {

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
  }): Observable<StrictHttpResponse<Array<EnterprisesEnterpriseSiteSlicePriorityTrafficRuleList>>> {

    const rb = new RequestBuilder(this.rootUrl, ListService.GetEnterprisesEnterpriseSiteSlicePriorityTrafficRuleListPath, 'get');
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
        return r as StrictHttpResponse<Array<EnterprisesEnterpriseSiteSlicePriorityTrafficRuleList>>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/slice/{slice-id}/priority-traffic-rule List.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSiteSlicePriorityTrafficRuleList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteSlicePriorityTrafficRuleList(params: {

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
  }): Observable<Array<EnterprisesEnterpriseSiteSlicePriorityTrafficRuleList>> {

    return this.getEnterprisesEnterpriseSiteSlicePriorityTrafficRuleList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<EnterprisesEnterpriseSiteSlicePriorityTrafficRuleList>>) => r.body as Array<EnterprisesEnterpriseSiteSlicePriorityTrafficRuleList>)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteSmallCellList
   */
  static readonly GetEnterprisesEnterpriseSiteSmallCellListPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/small-cell';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/small-cell List.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSiteSmallCellList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteSmallCellList$Response(params: {

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
  }): Observable<StrictHttpResponse<Array<EnterprisesEnterpriseSiteSmallCellList>>> {

    const rb = new RequestBuilder(this.rootUrl, ListService.GetEnterprisesEnterpriseSiteSmallCellListPath, 'get');
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
        return r as StrictHttpResponse<Array<EnterprisesEnterpriseSiteSmallCellList>>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/small-cell List.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSiteSmallCellList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteSmallCellList(params: {

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
  }): Observable<Array<EnterprisesEnterpriseSiteSmallCellList>> {

    return this.getEnterprisesEnterpriseSiteSmallCellList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<EnterprisesEnterpriseSiteSmallCellList>>) => r.body as Array<EnterprisesEnterpriseSiteSmallCellList>)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseSiteUpfList
   */
  static readonly GetEnterprisesEnterpriseSiteUpfListPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/site/{site-id}/upf';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/upf List.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseSiteUpfList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteUpfList$Response(params: {

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
  }): Observable<StrictHttpResponse<Array<EnterprisesEnterpriseSiteUpfList>>> {

    const rb = new RequestBuilder(this.rootUrl, ListService.GetEnterprisesEnterpriseSiteUpfListPath, 'get');
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
        return r as StrictHttpResponse<Array<EnterprisesEnterpriseSiteUpfList>>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/site/{site-id}/upf List.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseSiteUpfList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseSiteUpfList(params: {

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
  }): Observable<Array<EnterprisesEnterpriseSiteUpfList>> {

    return this.getEnterprisesEnterpriseSiteUpfList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<EnterprisesEnterpriseSiteUpfList>>) => r.body as Array<EnterprisesEnterpriseSiteUpfList>)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseTemplateList
   */
  static readonly GetEnterprisesEnterpriseTemplateListPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/template';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/template List.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseTemplateList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseTemplateList$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;
  }): Observable<StrictHttpResponse<Array<EnterprisesEnterpriseTemplateList>>> {

    const rb = new RequestBuilder(this.rootUrl, ListService.GetEnterprisesEnterpriseTemplateListPath, 'get');
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
        return r as StrictHttpResponse<Array<EnterprisesEnterpriseTemplateList>>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/template List.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseTemplateList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseTemplateList(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;
  }): Observable<Array<EnterprisesEnterpriseTemplateList>> {

    return this.getEnterprisesEnterpriseTemplateList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<EnterprisesEnterpriseTemplateList>>) => r.body as Array<EnterprisesEnterpriseTemplateList>)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseTrafficClassList
   */
  static readonly GetEnterprisesEnterpriseTrafficClassListPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/traffic-class';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/traffic-class List.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseTrafficClassList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseTrafficClassList$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;
  }): Observable<StrictHttpResponse<Array<EnterprisesEnterpriseTrafficClassList>>> {

    const rb = new RequestBuilder(this.rootUrl, ListService.GetEnterprisesEnterpriseTrafficClassListPath, 'get');
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
        return r as StrictHttpResponse<Array<EnterprisesEnterpriseTrafficClassList>>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/traffic-class List.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseTrafficClassList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseTrafficClassList(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;
  }): Observable<Array<EnterprisesEnterpriseTrafficClassList>> {

    return this.getEnterprisesEnterpriseTrafficClassList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<EnterprisesEnterpriseTrafficClassList>>) => r.body as Array<EnterprisesEnterpriseTrafficClassList>)
    );
  }

}
