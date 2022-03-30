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
<<<<<<< HEAD
     * target (device in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<Array<ConnectivityServicesConnectivityServiceList>>> {
=======
     * target (target in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<ConnectivityServicesConnectivityServiceList>> {
>>>>>>> e357b5d... Aether-3394 handle null values in responses

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
<<<<<<< HEAD
        return r as StrictHttpResponse<Array<ConnectivityServicesConnectivityServiceList>>;
=======
        return r as StrictHttpResponse<ConnectivityServicesConnectivityServiceList>;
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
     * target (device in onos-config)
     */
    target: any;
  }): Observable<Array<ConnectivityServicesConnectivityServiceList>> {

    return this.getConnectivityServicesConnectivityServiceList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ConnectivityServicesConnectivityServiceList>>) => r.body as Array<ConnectivityServicesConnectivityServiceList>)
=======
     * target (target in onos-config)
     */
    target: any;
  }): Observable<ConnectivityServicesConnectivityServiceList> {

    return this.getConnectivityServicesConnectivityServiceList$Response(params).pipe(
      map((r: StrictHttpResponse<ConnectivityServicesConnectivityServiceList>) => r.body as ConnectivityServicesConnectivityServiceList)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
     * target (device in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<Array<EnterprisesEnterpriseList>>> {
=======
     * target (target in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseList>> {
>>>>>>> e357b5d... Aether-3394 handle null values in responses

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
<<<<<<< HEAD
        return r as StrictHttpResponse<Array<EnterprisesEnterpriseList>>;
=======
        return r as StrictHttpResponse<EnterprisesEnterpriseList>;
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
     * target (device in onos-config)
     */
    target: any;
  }): Observable<Array<EnterprisesEnterpriseList>> {

    return this.getEnterprisesEnterpriseList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<EnterprisesEnterpriseList>>) => r.body as Array<EnterprisesEnterpriseList>)
=======
     * target (target in onos-config)
     */
    target: any;
  }): Observable<EnterprisesEnterpriseList> {

    return this.getEnterprisesEnterpriseList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseList>) => r.body as EnterprisesEnterpriseList)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
     * target (device in onos-config)
=======
     * target (target in onos-config)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;
<<<<<<< HEAD
  }): Observable<StrictHttpResponse<Array<EnterprisesEnterpriseApplicationList>>> {
=======
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseApplicationList>> {
>>>>>>> e357b5d... Aether-3394 handle null values in responses

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
<<<<<<< HEAD
        return r as StrictHttpResponse<Array<EnterprisesEnterpriseApplicationList>>;
=======
        return r as StrictHttpResponse<EnterprisesEnterpriseApplicationList>;
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
     * target (device in onos-config)
=======
     * target (target in onos-config)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;
<<<<<<< HEAD
  }): Observable<Array<EnterprisesEnterpriseApplicationList>> {

    return this.getEnterprisesEnterpriseApplicationList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<EnterprisesEnterpriseApplicationList>>) => r.body as Array<EnterprisesEnterpriseApplicationList>)
=======
  }): Observable<EnterprisesEnterpriseApplicationList> {

    return this.getEnterprisesEnterpriseApplicationList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseApplicationList>) => r.body as EnterprisesEnterpriseApplicationList)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
     * target (device in onos-config)
=======
     * target (target in onos-config)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
  }): Observable<StrictHttpResponse<Array<EnterprisesEnterpriseApplicationEndpointList>>> {
=======
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseApplicationEndpointList>> {
>>>>>>> e357b5d... Aether-3394 handle null values in responses

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
<<<<<<< HEAD
        return r as StrictHttpResponse<Array<EnterprisesEnterpriseApplicationEndpointList>>;
=======
        return r as StrictHttpResponse<EnterprisesEnterpriseApplicationEndpointList>;
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
     * target (device in onos-config)
=======
     * target (target in onos-config)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
  }): Observable<Array<EnterprisesEnterpriseApplicationEndpointList>> {

    return this.getEnterprisesEnterpriseApplicationEndpointList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<EnterprisesEnterpriseApplicationEndpointList>>) => r.body as Array<EnterprisesEnterpriseApplicationEndpointList>)
=======
  }): Observable<EnterprisesEnterpriseApplicationEndpointList> {

    return this.getEnterprisesEnterpriseApplicationEndpointList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseApplicationEndpointList>) => r.body as EnterprisesEnterpriseApplicationEndpointList)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
     * target (device in onos-config)
=======
     * target (target in onos-config)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;
<<<<<<< HEAD
  }): Observable<StrictHttpResponse<Array<EnterprisesEnterpriseConnectivityServiceList>>> {
=======
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseConnectivityServiceList>> {
>>>>>>> e357b5d... Aether-3394 handle null values in responses

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
<<<<<<< HEAD
        return r as StrictHttpResponse<Array<EnterprisesEnterpriseConnectivityServiceList>>;
=======
        return r as StrictHttpResponse<EnterprisesEnterpriseConnectivityServiceList>;
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
     * target (device in onos-config)
=======
     * target (target in onos-config)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;
<<<<<<< HEAD
  }): Observable<Array<EnterprisesEnterpriseConnectivityServiceList>> {

    return this.getEnterprisesEnterpriseConnectivityServiceList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<EnterprisesEnterpriseConnectivityServiceList>>) => r.body as Array<EnterprisesEnterpriseConnectivityServiceList>)
=======
  }): Observable<EnterprisesEnterpriseConnectivityServiceList> {

    return this.getEnterprisesEnterpriseConnectivityServiceList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseConnectivityServiceList>) => r.body as EnterprisesEnterpriseConnectivityServiceList)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
     * target (device in onos-config)
=======
     * target (target in onos-config)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;
<<<<<<< HEAD
  }): Observable<StrictHttpResponse<Array<EnterprisesEnterpriseSiteList>>> {
=======
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteList>> {
>>>>>>> e357b5d... Aether-3394 handle null values in responses

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
<<<<<<< HEAD
        return r as StrictHttpResponse<Array<EnterprisesEnterpriseSiteList>>;
=======
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteList>;
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
     * target (device in onos-config)
=======
     * target (target in onos-config)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;
<<<<<<< HEAD
  }): Observable<Array<EnterprisesEnterpriseSiteList>> {

    return this.getEnterprisesEnterpriseSiteList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<EnterprisesEnterpriseSiteList>>) => r.body as Array<EnterprisesEnterpriseSiteList>)
=======
  }): Observable<EnterprisesEnterpriseSiteList> {

    return this.getEnterprisesEnterpriseSiteList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteList>) => r.body as EnterprisesEnterpriseSiteList)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
     * target (device in onos-config)
=======
     * target (target in onos-config)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
  }): Observable<StrictHttpResponse<Array<EnterprisesEnterpriseSiteDeviceList>>> {
=======
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteDeviceList>> {
>>>>>>> e357b5d... Aether-3394 handle null values in responses

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
<<<<<<< HEAD
        return r as StrictHttpResponse<Array<EnterprisesEnterpriseSiteDeviceList>>;
=======
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteDeviceList>;
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
     * target (device in onos-config)
=======
     * target (target in onos-config)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
  }): Observable<Array<EnterprisesEnterpriseSiteDeviceList>> {

    return this.getEnterprisesEnterpriseSiteDeviceList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<EnterprisesEnterpriseSiteDeviceList>>) => r.body as Array<EnterprisesEnterpriseSiteDeviceList>)
=======
  }): Observable<EnterprisesEnterpriseSiteDeviceList> {

    return this.getEnterprisesEnterpriseSiteDeviceList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteDeviceList>) => r.body as EnterprisesEnterpriseSiteDeviceList)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
     * target (device in onos-config)
=======
     * target (target in onos-config)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
  }): Observable<StrictHttpResponse<Array<EnterprisesEnterpriseSiteDeviceGroupList>>> {
=======
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteDeviceGroupList>> {
>>>>>>> e357b5d... Aether-3394 handle null values in responses

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
<<<<<<< HEAD
        return r as StrictHttpResponse<Array<EnterprisesEnterpriseSiteDeviceGroupList>>;
=======
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteDeviceGroupList>;
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
     * target (device in onos-config)
=======
     * target (target in onos-config)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
  }): Observable<Array<EnterprisesEnterpriseSiteDeviceGroupList>> {

    return this.getEnterprisesEnterpriseSiteDeviceGroupList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<EnterprisesEnterpriseSiteDeviceGroupList>>) => r.body as Array<EnterprisesEnterpriseSiteDeviceGroupList>)
=======
  }): Observable<EnterprisesEnterpriseSiteDeviceGroupList> {

    return this.getEnterprisesEnterpriseSiteDeviceGroupList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteDeviceGroupList>) => r.body as EnterprisesEnterpriseSiteDeviceGroupList)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
     * target (device in onos-config)
=======
     * target (target in onos-config)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
  }): Observable<StrictHttpResponse<Array<EnterprisesEnterpriseSiteDeviceGroupDeviceList>>> {
=======
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteDeviceGroupDeviceList>> {
>>>>>>> e357b5d... Aether-3394 handle null values in responses

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
<<<<<<< HEAD
        return r as StrictHttpResponse<Array<EnterprisesEnterpriseSiteDeviceGroupDeviceList>>;
=======
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteDeviceGroupDeviceList>;
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
     * target (device in onos-config)
=======
     * target (target in onos-config)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
  }): Observable<Array<EnterprisesEnterpriseSiteDeviceGroupDeviceList>> {

    return this.getEnterprisesEnterpriseSiteDeviceGroupDeviceList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<EnterprisesEnterpriseSiteDeviceGroupDeviceList>>) => r.body as Array<EnterprisesEnterpriseSiteDeviceGroupDeviceList>)
=======
  }): Observable<EnterprisesEnterpriseSiteDeviceGroupDeviceList> {

    return this.getEnterprisesEnterpriseSiteDeviceGroupDeviceList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteDeviceGroupDeviceList>) => r.body as EnterprisesEnterpriseSiteDeviceGroupDeviceList)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
     * target (device in onos-config)
=======
     * target (target in onos-config)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
  }): Observable<StrictHttpResponse<Array<EnterprisesEnterpriseSiteIpDomainList>>> {
=======
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteIpDomainList>> {
>>>>>>> e357b5d... Aether-3394 handle null values in responses

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
<<<<<<< HEAD
        return r as StrictHttpResponse<Array<EnterprisesEnterpriseSiteIpDomainList>>;
=======
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteIpDomainList>;
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
     * target (device in onos-config)
=======
     * target (target in onos-config)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
  }): Observable<Array<EnterprisesEnterpriseSiteIpDomainList>> {

    return this.getEnterprisesEnterpriseSiteIpDomainList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<EnterprisesEnterpriseSiteIpDomainList>>) => r.body as Array<EnterprisesEnterpriseSiteIpDomainList>)
=======
  }): Observable<EnterprisesEnterpriseSiteIpDomainList> {

    return this.getEnterprisesEnterpriseSiteIpDomainList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteIpDomainList>) => r.body as EnterprisesEnterpriseSiteIpDomainList)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
     * target (device in onos-config)
=======
     * target (target in onos-config)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
  }): Observable<StrictHttpResponse<Array<EnterprisesEnterpriseSiteMonitoringEdgeDeviceList>>> {
=======
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteMonitoringEdgeDeviceList>> {
>>>>>>> e357b5d... Aether-3394 handle null values in responses

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
<<<<<<< HEAD
        return r as StrictHttpResponse<Array<EnterprisesEnterpriseSiteMonitoringEdgeDeviceList>>;
=======
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteMonitoringEdgeDeviceList>;
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
     * target (device in onos-config)
=======
     * target (target in onos-config)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
  }): Observable<Array<EnterprisesEnterpriseSiteMonitoringEdgeDeviceList>> {

    return this.getEnterprisesEnterpriseSiteMonitoringEdgeDeviceList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<EnterprisesEnterpriseSiteMonitoringEdgeDeviceList>>) => r.body as Array<EnterprisesEnterpriseSiteMonitoringEdgeDeviceList>)
=======
  }): Observable<EnterprisesEnterpriseSiteMonitoringEdgeDeviceList> {

    return this.getEnterprisesEnterpriseSiteMonitoringEdgeDeviceList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteMonitoringEdgeDeviceList>) => r.body as EnterprisesEnterpriseSiteMonitoringEdgeDeviceList)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
     * target (device in onos-config)
=======
     * target (target in onos-config)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
  }): Observable<StrictHttpResponse<Array<EnterprisesEnterpriseSiteSimCardList>>> {
=======
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteSimCardList>> {
>>>>>>> e357b5d... Aether-3394 handle null values in responses

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
<<<<<<< HEAD
        return r as StrictHttpResponse<Array<EnterprisesEnterpriseSiteSimCardList>>;
=======
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteSimCardList>;
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
     * target (device in onos-config)
=======
     * target (target in onos-config)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
  }): Observable<Array<EnterprisesEnterpriseSiteSimCardList>> {

    return this.getEnterprisesEnterpriseSiteSimCardList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<EnterprisesEnterpriseSiteSimCardList>>) => r.body as Array<EnterprisesEnterpriseSiteSimCardList>)
=======
  }): Observable<EnterprisesEnterpriseSiteSimCardList> {

    return this.getEnterprisesEnterpriseSiteSimCardList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteSimCardList>) => r.body as EnterprisesEnterpriseSiteSimCardList)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
     * target (device in onos-config)
=======
     * target (target in onos-config)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
  }): Observable<StrictHttpResponse<Array<EnterprisesEnterpriseSiteSliceList>>> {
=======
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteSliceList>> {
>>>>>>> e357b5d... Aether-3394 handle null values in responses

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
<<<<<<< HEAD
        return r as StrictHttpResponse<Array<EnterprisesEnterpriseSiteSliceList>>;
=======
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteSliceList>;
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
     * target (device in onos-config)
=======
     * target (target in onos-config)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
  }): Observable<Array<EnterprisesEnterpriseSiteSliceList>> {

    return this.getEnterprisesEnterpriseSiteSliceList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<EnterprisesEnterpriseSiteSliceList>>) => r.body as Array<EnterprisesEnterpriseSiteSliceList>)
=======
  }): Observable<EnterprisesEnterpriseSiteSliceList> {

    return this.getEnterprisesEnterpriseSiteSliceList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteSliceList>) => r.body as EnterprisesEnterpriseSiteSliceList)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
     * target (device in onos-config)
=======
     * target (target in onos-config)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
  }): Observable<StrictHttpResponse<Array<EnterprisesEnterpriseSiteSliceDeviceGroupList>>> {
=======
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteSliceDeviceGroupList>> {
>>>>>>> e357b5d... Aether-3394 handle null values in responses

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
<<<<<<< HEAD
        return r as StrictHttpResponse<Array<EnterprisesEnterpriseSiteSliceDeviceGroupList>>;
=======
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteSliceDeviceGroupList>;
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
     * target (device in onos-config)
=======
     * target (target in onos-config)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
  }): Observable<Array<EnterprisesEnterpriseSiteSliceDeviceGroupList>> {

    return this.getEnterprisesEnterpriseSiteSliceDeviceGroupList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<EnterprisesEnterpriseSiteSliceDeviceGroupList>>) => r.body as Array<EnterprisesEnterpriseSiteSliceDeviceGroupList>)
=======
  }): Observable<EnterprisesEnterpriseSiteSliceDeviceGroupList> {

    return this.getEnterprisesEnterpriseSiteSliceDeviceGroupList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteSliceDeviceGroupList>) => r.body as EnterprisesEnterpriseSiteSliceDeviceGroupList)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
     * target (device in onos-config)
=======
     * target (target in onos-config)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
  }): Observable<StrictHttpResponse<Array<EnterprisesEnterpriseSiteSliceFilterList>>> {
=======
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteSliceFilterList>> {
>>>>>>> e357b5d... Aether-3394 handle null values in responses

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
<<<<<<< HEAD
        return r as StrictHttpResponse<Array<EnterprisesEnterpriseSiteSliceFilterList>>;
=======
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteSliceFilterList>;
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
     * target (device in onos-config)
=======
     * target (target in onos-config)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
  }): Observable<Array<EnterprisesEnterpriseSiteSliceFilterList>> {

    return this.getEnterprisesEnterpriseSiteSliceFilterList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<EnterprisesEnterpriseSiteSliceFilterList>>) => r.body as Array<EnterprisesEnterpriseSiteSliceFilterList>)
=======
  }): Observable<EnterprisesEnterpriseSiteSliceFilterList> {

    return this.getEnterprisesEnterpriseSiteSliceFilterList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteSliceFilterList>) => r.body as EnterprisesEnterpriseSiteSliceFilterList)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
     * target (device in onos-config)
=======
     * target (target in onos-config)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
  }): Observable<StrictHttpResponse<Array<EnterprisesEnterpriseSiteSlicePriorityTrafficRuleList>>> {
=======
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteSlicePriorityTrafficRuleList>> {
>>>>>>> e357b5d... Aether-3394 handle null values in responses

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
<<<<<<< HEAD
        return r as StrictHttpResponse<Array<EnterprisesEnterpriseSiteSlicePriorityTrafficRuleList>>;
=======
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteSlicePriorityTrafficRuleList>;
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
     * target (device in onos-config)
=======
     * target (target in onos-config)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
  }): Observable<Array<EnterprisesEnterpriseSiteSlicePriorityTrafficRuleList>> {

    return this.getEnterprisesEnterpriseSiteSlicePriorityTrafficRuleList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<EnterprisesEnterpriseSiteSlicePriorityTrafficRuleList>>) => r.body as Array<EnterprisesEnterpriseSiteSlicePriorityTrafficRuleList>)
=======
  }): Observable<EnterprisesEnterpriseSiteSlicePriorityTrafficRuleList> {

    return this.getEnterprisesEnterpriseSiteSlicePriorityTrafficRuleList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteSlicePriorityTrafficRuleList>) => r.body as EnterprisesEnterpriseSiteSlicePriorityTrafficRuleList)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
     * target (device in onos-config)
=======
     * target (target in onos-config)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
  }): Observable<StrictHttpResponse<Array<EnterprisesEnterpriseSiteSmallCellList>>> {
=======
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteSmallCellList>> {
>>>>>>> e357b5d... Aether-3394 handle null values in responses

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
<<<<<<< HEAD
        return r as StrictHttpResponse<Array<EnterprisesEnterpriseSiteSmallCellList>>;
=======
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteSmallCellList>;
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
     * target (device in onos-config)
=======
     * target (target in onos-config)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
  }): Observable<Array<EnterprisesEnterpriseSiteSmallCellList>> {

    return this.getEnterprisesEnterpriseSiteSmallCellList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<EnterprisesEnterpriseSiteSmallCellList>>) => r.body as Array<EnterprisesEnterpriseSiteSmallCellList>)
=======
  }): Observable<EnterprisesEnterpriseSiteSmallCellList> {

    return this.getEnterprisesEnterpriseSiteSmallCellList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteSmallCellList>) => r.body as EnterprisesEnterpriseSiteSmallCellList)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
     * target (device in onos-config)
=======
     * target (target in onos-config)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
  }): Observable<StrictHttpResponse<Array<EnterprisesEnterpriseSiteUpfList>>> {
=======
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseSiteUpfList>> {
>>>>>>> e357b5d... Aether-3394 handle null values in responses

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
<<<<<<< HEAD
        return r as StrictHttpResponse<Array<EnterprisesEnterpriseSiteUpfList>>;
=======
        return r as StrictHttpResponse<EnterprisesEnterpriseSiteUpfList>;
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
     * target (device in onos-config)
=======
     * target (target in onos-config)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
  }): Observable<Array<EnterprisesEnterpriseSiteUpfList>> {

    return this.getEnterprisesEnterpriseSiteUpfList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<EnterprisesEnterpriseSiteUpfList>>) => r.body as Array<EnterprisesEnterpriseSiteUpfList>)
=======
  }): Observable<EnterprisesEnterpriseSiteUpfList> {

    return this.getEnterprisesEnterpriseSiteUpfList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseSiteUpfList>) => r.body as EnterprisesEnterpriseSiteUpfList)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
     * target (device in onos-config)
=======
     * target (target in onos-config)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;
<<<<<<< HEAD
  }): Observable<StrictHttpResponse<Array<EnterprisesEnterpriseTemplateList>>> {
=======
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseTemplateList>> {
>>>>>>> e357b5d... Aether-3394 handle null values in responses

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
<<<<<<< HEAD
        return r as StrictHttpResponse<Array<EnterprisesEnterpriseTemplateList>>;
=======
        return r as StrictHttpResponse<EnterprisesEnterpriseTemplateList>;
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
     * target (device in onos-config)
=======
     * target (target in onos-config)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;
<<<<<<< HEAD
  }): Observable<Array<EnterprisesEnterpriseTemplateList>> {

    return this.getEnterprisesEnterpriseTemplateList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<EnterprisesEnterpriseTemplateList>>) => r.body as Array<EnterprisesEnterpriseTemplateList>)
=======
  }): Observable<EnterprisesEnterpriseTemplateList> {

    return this.getEnterprisesEnterpriseTemplateList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseTemplateList>) => r.body as EnterprisesEnterpriseTemplateList)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
     * target (device in onos-config)
=======
     * target (target in onos-config)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;
<<<<<<< HEAD
  }): Observable<StrictHttpResponse<Array<EnterprisesEnterpriseTrafficClassList>>> {
=======
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseTrafficClassList>> {
>>>>>>> e357b5d... Aether-3394 handle null values in responses

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
<<<<<<< HEAD
        return r as StrictHttpResponse<Array<EnterprisesEnterpriseTrafficClassList>>;
=======
        return r as StrictHttpResponse<EnterprisesEnterpriseTrafficClassList>;
>>>>>>> e357b5d... Aether-3394 handle null values in responses
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
<<<<<<< HEAD
     * target (device in onos-config)
=======
     * target (target in onos-config)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;
<<<<<<< HEAD
  }): Observable<Array<EnterprisesEnterpriseTrafficClassList>> {

    return this.getEnterprisesEnterpriseTrafficClassList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<EnterprisesEnterpriseTrafficClassList>>) => r.body as Array<EnterprisesEnterpriseTrafficClassList>)
=======
  }): Observable<EnterprisesEnterpriseTrafficClassList> {

    return this.getEnterprisesEnterpriseTrafficClassList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseTrafficClassList>) => r.body as EnterprisesEnterpriseTrafficClassList)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
    );
  }

}
