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
     * target (target in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<ConnectivityServicesConnectivityServiceList>> {

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
        return r as StrictHttpResponse<ConnectivityServicesConnectivityServiceList>;
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
     * target (target in onos-config)
     */
    target: any;
  }): Observable<ConnectivityServicesConnectivityServiceList> {

    return this.getConnectivityServicesConnectivityServiceList$Response(params).pipe(
      map((r: StrictHttpResponse<ConnectivityServicesConnectivityServiceList>) => r.body as ConnectivityServicesConnectivityServiceList)
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
     * target (target in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseList>> {

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
        return r as StrictHttpResponse<EnterprisesEnterpriseList>;
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
     * target (target in onos-config)
     */
    target: any;
  }): Observable<EnterprisesEnterpriseList> {

    return this.getEnterprisesEnterpriseList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseList>) => r.body as EnterprisesEnterpriseList)
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
     * target (target in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseApplicationList>> {

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
        return r as StrictHttpResponse<EnterprisesEnterpriseApplicationList>;
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
     * target (target in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;
  }): Observable<EnterprisesEnterpriseApplicationList> {

    return this.getEnterprisesEnterpriseApplicationList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseApplicationList>) => r.body as EnterprisesEnterpriseApplicationList)
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
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseApplicationEndpointList>> {

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
        return r as StrictHttpResponse<EnterprisesEnterpriseApplicationEndpointList>;
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
  }): Observable<EnterprisesEnterpriseApplicationEndpointList> {

    return this.getEnterprisesEnterpriseApplicationEndpointList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseApplicationEndpointList>) => r.body as EnterprisesEnterpriseApplicationEndpointList)
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
     * target (target in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseConnectivityServiceList>> {

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
        return r as StrictHttpResponse<EnterprisesEnterpriseConnectivityServiceList>;
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
     * target (target in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;
  }): Observable<EnterprisesEnterpriseConnectivityServiceList> {

    return this.getEnterprisesEnterpriseConnectivityServiceList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseConnectivityServiceList>) => r.body as EnterprisesEnterpriseConnectivityServiceList)
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
     * target (target in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteList>> {

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
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteList>;
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
     * target (target in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;
  }): Observable<EnterprisesEnterpriseSiteList> {

    return this.getEnterprisesEnterpriseSiteList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteList>) => r.body as EnterprisesEnterpriseSiteList)
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
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteDeviceList>> {

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
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteDeviceList>;
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
  }): Observable<EnterprisesEnterpriseSiteDeviceList> {

    return this.getEnterprisesEnterpriseSiteDeviceList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteDeviceList>) => r.body as EnterprisesEnterpriseSiteDeviceList)
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
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteDeviceGroupList>> {

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
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteDeviceGroupList>;
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
  }): Observable<EnterprisesEnterpriseSiteDeviceGroupList> {

    return this.getEnterprisesEnterpriseSiteDeviceGroupList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteDeviceGroupList>) => r.body as EnterprisesEnterpriseSiteDeviceGroupList)
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
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteDeviceGroupDeviceList>> {

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
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteDeviceGroupDeviceList>;
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
  }): Observable<EnterprisesEnterpriseSiteDeviceGroupDeviceList> {

    return this.getEnterprisesEnterpriseSiteDeviceGroupDeviceList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteDeviceGroupDeviceList>) => r.body as EnterprisesEnterpriseSiteDeviceGroupDeviceList)
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
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteIpDomainList>> {

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
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteIpDomainList>;
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
  }): Observable<EnterprisesEnterpriseSiteIpDomainList> {

    return this.getEnterprisesEnterpriseSiteIpDomainList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteIpDomainList>) => r.body as EnterprisesEnterpriseSiteIpDomainList)
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
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteMonitoringEdgeDeviceList>> {

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
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteMonitoringEdgeDeviceList>;
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
  }): Observable<EnterprisesEnterpriseSiteMonitoringEdgeDeviceList> {

    return this.getEnterprisesEnterpriseSiteMonitoringEdgeDeviceList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteMonitoringEdgeDeviceList>) => r.body as EnterprisesEnterpriseSiteMonitoringEdgeDeviceList)
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
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteSimCardList>> {

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
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteSimCardList>;
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
  }): Observable<EnterprisesEnterpriseSiteSimCardList> {

    return this.getEnterprisesEnterpriseSiteSimCardList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteSimCardList>) => r.body as EnterprisesEnterpriseSiteSimCardList)
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
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteSliceList>> {

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
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteSliceList>;
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
  }): Observable<EnterprisesEnterpriseSiteSliceList> {

    return this.getEnterprisesEnterpriseSiteSliceList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteSliceList>) => r.body as EnterprisesEnterpriseSiteSliceList)
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
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteSliceDeviceGroupList>> {

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
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteSliceDeviceGroupList>;
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
  }): Observable<EnterprisesEnterpriseSiteSliceDeviceGroupList> {

    return this.getEnterprisesEnterpriseSiteSliceDeviceGroupList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteSliceDeviceGroupList>) => r.body as EnterprisesEnterpriseSiteSliceDeviceGroupList)
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
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteSliceFilterList>> {

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
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteSliceFilterList>;
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
  }): Observable<EnterprisesEnterpriseSiteSliceFilterList> {

    return this.getEnterprisesEnterpriseSiteSliceFilterList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteSliceFilterList>) => r.body as EnterprisesEnterpriseSiteSliceFilterList)
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
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteSlicePriorityTrafficRuleList>> {

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
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteSlicePriorityTrafficRuleList>;
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
  }): Observable<EnterprisesEnterpriseSiteSlicePriorityTrafficRuleList> {

    return this.getEnterprisesEnterpriseSiteSlicePriorityTrafficRuleList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteSlicePriorityTrafficRuleList>) => r.body as EnterprisesEnterpriseSiteSlicePriorityTrafficRuleList)
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
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteSmallCellList>> {

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
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteSmallCellList>;
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
  }): Observable<EnterprisesEnterpriseSiteSmallCellList> {

    return this.getEnterprisesEnterpriseSiteSmallCellList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteSmallCellList>) => r.body as EnterprisesEnterpriseSiteSmallCellList)
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
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteUpfList>> {

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
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteUpfList>;
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
  }): Observable<EnterprisesEnterpriseSiteUpfList> {

    return this.getEnterprisesEnterpriseSiteUpfList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteUpfList>) => r.body as EnterprisesEnterpriseSiteUpfList)
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
     * target (target in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseTemplateList>> {

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
        return r as StrictHttpResponse<EnterprisesEnterpriseTemplateList>;
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
     * target (target in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;
  }): Observable<EnterprisesEnterpriseTemplateList> {

    return this.getEnterprisesEnterpriseTemplateList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseTemplateList>) => r.body as EnterprisesEnterpriseTemplateList)
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
     * target (target in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseTrafficClassList>> {

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
        return r as StrictHttpResponse<EnterprisesEnterpriseTrafficClassList>;
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
     * target (target in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;
  }): Observable<EnterprisesEnterpriseTrafficClassList> {

    return this.getEnterprisesEnterpriseTrafficClassList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseTrafficClassList>) => r.body as EnterprisesEnterpriseTrafficClassList)
    );
  }

}
