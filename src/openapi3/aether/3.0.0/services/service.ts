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

import { ApList } from '../models/ap-list';
import { Application } from '../models/application';
import { ConnectivityService } from '../models/connectivity-service';
import { DeviceGroup } from '../models/device-group';
import { DeviceModelList } from '../models/device-model-list';
import { Enterprise } from '../models/enterprise';
import { IpDomain } from '../models/ip-domain';
import { Network } from '../models/network';
import { Site } from '../models/site';
import { Template } from '../models/template';
import { TrafficClass } from '../models/traffic-class';
import { Upf } from '../models/upf';
import { Vcs } from '../models/vcs';

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
   * Path part for operation getApList
   */
  static readonly GetApListPath = '/aether/v3.0.0/{target}/ap-list';

  /**
   * GET /ap-list Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getApList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApList$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<ApList>> {

    const rb = new RequestBuilder(this.rootUrl, Service.GetApListPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ApList>;
      })
    );
  }

  /**
   * GET /ap-list Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getApList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApList(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<ApList> {

    return this.getApList$Response(params).pipe(
      map((r: StrictHttpResponse<ApList>) => r.body as ApList)
    );
  }

  /**
   * Path part for operation getApplication
   */
  static readonly GetApplicationPath = '/aether/v3.0.0/{target}/application';

  /**
   * GET /application Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getApplication()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApplication$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<Application>> {

    const rb = new RequestBuilder(this.rootUrl, Service.GetApplicationPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Application>;
      })
    );
  }

  /**
   * GET /application Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getApplication$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApplication(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<Application> {

    return this.getApplication$Response(params).pipe(
      map((r: StrictHttpResponse<Application>) => r.body as Application)
    );
  }

  /**
   * Path part for operation getConnectivityService
   */
  static readonly GetConnectivityServicePath = '/aether/v3.0.0/{target}/connectivity-service';

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
   * Path part for operation getDeviceGroup
   */
  static readonly GetDeviceGroupPath = '/aether/v3.0.0/{target}/device-group';

  /**
   * GET /device-group Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDeviceGroup()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDeviceGroup$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<DeviceGroup>> {

    const rb = new RequestBuilder(this.rootUrl, Service.GetDeviceGroupPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<DeviceGroup>;
      })
    );
  }

  /**
   * GET /device-group Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDeviceGroup$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDeviceGroup(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<DeviceGroup> {

    return this.getDeviceGroup$Response(params).pipe(
      map((r: StrictHttpResponse<DeviceGroup>) => r.body as DeviceGroup)
    );
  }

  /**
   * Path part for operation getDeviceModelList
   */
  static readonly GetDeviceModelListPath = '/aether/v3.0.0/{target}/device-model-list';

  /**
   * GET /device-model-list Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDeviceModelList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDeviceModelList$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<DeviceModelList>> {

    const rb = new RequestBuilder(this.rootUrl, Service.GetDeviceModelListPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<DeviceModelList>;
      })
    );
  }

  /**
   * GET /device-model-list Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDeviceModelList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDeviceModelList(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<DeviceModelList> {

    return this.getDeviceModelList$Response(params).pipe(
      map((r: StrictHttpResponse<DeviceModelList>) => r.body as DeviceModelList)
    );
  }

  /**
   * Path part for operation getEnterprise
   */
  static readonly GetEnterprisePath = '/aether/v3.0.0/{target}/enterprise';

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
   * Path part for operation getIpDomain
   */
  static readonly GetIpDomainPath = '/aether/v3.0.0/{target}/ip-domain';

  /**
   * GET /ip-domain Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getIpDomain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getIpDomain$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<IpDomain>> {

    const rb = new RequestBuilder(this.rootUrl, Service.GetIpDomainPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<IpDomain>;
      })
    );
  }

  /**
   * GET /ip-domain Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getIpDomain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getIpDomain(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<IpDomain> {

    return this.getIpDomain$Response(params).pipe(
      map((r: StrictHttpResponse<IpDomain>) => r.body as IpDomain)
    );
  }

  /**
   * Path part for operation getNetwork
   */
  static readonly GetNetworkPath = '/aether/v3.0.0/{target}/network';

  /**
   * GET /network Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getNetwork()` instead.
   *
   * This method doesn't expect any request body.
   */
  getNetwork$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<Network>> {

    const rb = new RequestBuilder(this.rootUrl, Service.GetNetworkPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Network>;
      })
    );
  }

  /**
   * GET /network Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getNetwork$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getNetwork(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<Network> {

    return this.getNetwork$Response(params).pipe(
      map((r: StrictHttpResponse<Network>) => r.body as Network)
    );
  }

  /**
   * Path part for operation getSite
   */
  static readonly GetSitePath = '/aether/v3.0.0/{target}/site';

  /**
   * GET /site Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSite()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSite$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<Site>> {

    const rb = new RequestBuilder(this.rootUrl, Service.GetSitePath, 'get');
    if (params) {
      rb.path('target', params.target, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Site>;
      })
    );
  }

  /**
   * GET /site Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSite$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSite(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<Site> {

    return this.getSite$Response(params).pipe(
      map((r: StrictHttpResponse<Site>) => r.body as Site)
    );
  }

  /**
   * Path part for operation getTemplate
   */
  static readonly GetTemplatePath = '/aether/v3.0.0/{target}/template';

  /**
   * GET /template Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTemplate()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTemplate$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<Template>> {

    const rb = new RequestBuilder(this.rootUrl, Service.GetTemplatePath, 'get');
    if (params) {
      rb.path('target', params.target, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Template>;
      })
    );
  }

  /**
   * GET /template Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTemplate$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTemplate(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<Template> {

    return this.getTemplate$Response(params).pipe(
      map((r: StrictHttpResponse<Template>) => r.body as Template)
    );
  }

  /**
   * Path part for operation getTrafficClass
   */
  static readonly GetTrafficClassPath = '/aether/v3.0.0/{target}/traffic-class';

  /**
   * GET /traffic-class Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTrafficClass()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTrafficClass$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<TrafficClass>> {

    const rb = new RequestBuilder(this.rootUrl, Service.GetTrafficClassPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TrafficClass>;
      })
    );
  }

  /**
   * GET /traffic-class Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTrafficClass$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTrafficClass(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<TrafficClass> {

    return this.getTrafficClass$Response(params).pipe(
      map((r: StrictHttpResponse<TrafficClass>) => r.body as TrafficClass)
    );
  }

  /**
   * Path part for operation getUpf
   */
  static readonly GetUpfPath = '/aether/v3.0.0/{target}/upf';

  /**
   * GET /upf Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUpf()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUpf$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<Upf>> {

    const rb = new RequestBuilder(this.rootUrl, Service.GetUpfPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Upf>;
      })
    );
  }

  /**
   * GET /upf Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getUpf$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUpf(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<Upf> {

    return this.getUpf$Response(params).pipe(
      map((r: StrictHttpResponse<Upf>) => r.body as Upf)
    );
  }

  /**
   * Path part for operation getVcs
   */
  static readonly GetVcsPath = '/aether/v3.0.0/{target}/vcs';

  /**
   * GET /vcs Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getVcs()` instead.
   *
   * This method doesn't expect any request body.
   */
  getVcs$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<Vcs>> {

    const rb = new RequestBuilder(this.rootUrl, Service.GetVcsPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Vcs>;
      })
    );
  }

  /**
   * GET /vcs Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getVcs$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getVcs(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<Vcs> {

    return this.getVcs$Response(params).pipe(
      map((r: StrictHttpResponse<Vcs>) => r.body as Vcs)
    );
  }

}
