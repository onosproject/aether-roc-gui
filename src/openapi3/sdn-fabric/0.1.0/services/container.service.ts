// Code generated by openapi-gen. DO NOT EDIT.
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

import { DhcpServer } from '../models/dhcp-server';
import { Route } from '../models/route';
import { Switch } from '../models/switch';
import { SwitchModel } from '../models/switch-model';
import { SwitchModelAttribute } from '../models/switch-model-attribute';
import { SwitchModelPort } from '../models/switch-model-port';
import { SwitchAttribute } from '../models/switch-attribute';
import { SwitchManagement } from '../models/switch-management';
import { SwitchPort } from '../models/switch-port';
import { SwitchPortState } from '../models/switch-port-state';
import { SwitchPortVlans } from '../models/switch-port-vlans';
import { SwitchState } from '../models/switch-state';
import { SwitchSwitchPair } from '../models/switch-switch-pair';
import { SwitchSwitchPairPairingPort } from '../models/switch-switch-pair-pairing-port';
import { SwitchVlan } from '../models/switch-vlan';

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
   * Path part for operation getDhcpServer
   */
  static readonly GetDhcpServerPath = '/sdn-fabric/v0.1.x/{fabric-id}/dhcp-server/{dhcp-id}';

  /**
   * GET /dhcp-server Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDhcpServer()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDhcpServer$Response(params: {

    /**
     * fabric-id (target in onos-config)
     */
    'fabric-id': any;

    /**
     * key {dhcp-id}
     */
    'dhcp-id': any;
  }): Observable<StrictHttpResponse<DhcpServer>> {

    const rb = new RequestBuilder(this.rootUrl, ContainerService.GetDhcpServerPath, 'get');
    if (params) {
      rb.path('fabric-id', params['fabric-id'], {});
      rb.path('dhcp-id', params['dhcp-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<DhcpServer>;
      })
    );
  }

  /**
   * GET /dhcp-server Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDhcpServer$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDhcpServer(params: {

    /**
     * fabric-id (target in onos-config)
     */
    'fabric-id': any;

    /**
     * key {dhcp-id}
     */
    'dhcp-id': any;
  }): Observable<DhcpServer> {

    return this.getDhcpServer$Response(params).pipe(
      map((r: StrictHttpResponse<DhcpServer>) => r.body as DhcpServer)
    );
  }

  /**
   * Path part for operation getRoute
   */
  static readonly GetRoutePath = '/sdn-fabric/v0.1.x/{fabric-id}/route/{route-id}';

  /**
   * GET /route Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getRoute()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRoute$Response(params: {

    /**
     * fabric-id (target in onos-config)
     */
    'fabric-id': any;

    /**
     * key {route-id}
     */
    'route-id': any;
  }): Observable<StrictHttpResponse<Route>> {

    const rb = new RequestBuilder(this.rootUrl, ContainerService.GetRoutePath, 'get');
    if (params) {
      rb.path('fabric-id', params['fabric-id'], {});
      rb.path('route-id', params['route-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Route>;
      })
    );
  }

  /**
   * GET /route Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getRoute$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRoute(params: {

    /**
     * fabric-id (target in onos-config)
     */
    'fabric-id': any;

    /**
     * key {route-id}
     */
    'route-id': any;
  }): Observable<Route> {

    return this.getRoute$Response(params).pipe(
      map((r: StrictHttpResponse<Route>) => r.body as Route)
    );
  }

  /**
   * Path part for operation getSwitchModel
   */
  static readonly GetSwitchModelPath = '/sdn-fabric/v0.1.x/{fabric-id}/switch-model/{switch-model-id}';

  /**
   * GET /switch-model Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSwitchModel()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSwitchModel$Response(params: {

    /**
     * fabric-id (target in onos-config)
     */
    'fabric-id': any;

    /**
     * key {switch-model-id}
     */
    'switch-model-id': any;
  }): Observable<StrictHttpResponse<SwitchModel>> {

    const rb = new RequestBuilder(this.rootUrl, ContainerService.GetSwitchModelPath, 'get');
    if (params) {
      rb.path('fabric-id', params['fabric-id'], {});
      rb.path('switch-model-id', params['switch-model-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SwitchModel>;
      })
    );
  }

  /**
   * GET /switch-model Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSwitchModel$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSwitchModel(params: {

    /**
     * fabric-id (target in onos-config)
     */
    'fabric-id': any;

    /**
     * key {switch-model-id}
     */
    'switch-model-id': any;
  }): Observable<SwitchModel> {

    return this.getSwitchModel$Response(params).pipe(
      map((r: StrictHttpResponse<SwitchModel>) => r.body as SwitchModel)
    );
  }

  /**
   * Path part for operation getSwitchModelAttribute
   */
  static readonly GetSwitchModelAttributePath = '/sdn-fabric/v0.1.x/{fabric-id}/switch-model/{switch-model-id}/attribute/{attribute-key}';

  /**
   * GET /switch-model/{switch-model-id}/attribute Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSwitchModelAttribute()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSwitchModelAttribute$Response(params: {

    /**
     * fabric-id (target in onos-config)
     */
    'fabric-id': any;

    /**
     * key {switch-model-id}
     */
    'switch-model-id': any;

    /**
     * key {attribute-key}
     */
    'attribute-key': any;
  }): Observable<StrictHttpResponse<SwitchModelAttribute>> {

    const rb = new RequestBuilder(this.rootUrl, ContainerService.GetSwitchModelAttributePath, 'get');
    if (params) {
      rb.path('fabric-id', params['fabric-id'], {});
      rb.path('switch-model-id', params['switch-model-id'], {});
      rb.path('attribute-key', params['attribute-key'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SwitchModelAttribute>;
      })
    );
  }

  /**
   * GET /switch-model/{switch-model-id}/attribute Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSwitchModelAttribute$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSwitchModelAttribute(params: {

    /**
     * fabric-id (target in onos-config)
     */
    'fabric-id': any;

    /**
     * key {switch-model-id}
     */
    'switch-model-id': any;

    /**
     * key {attribute-key}
     */
    'attribute-key': any;
  }): Observable<SwitchModelAttribute> {

    return this.getSwitchModelAttribute$Response(params).pipe(
      map((r: StrictHttpResponse<SwitchModelAttribute>) => r.body as SwitchModelAttribute)
    );
  }

  /**
   * Path part for operation getSwitchModelPort
   */
  static readonly GetSwitchModelPortPath = '/sdn-fabric/v0.1.x/{fabric-id}/switch-model/{switch-model-id}/port/{cage-number}/{channel-number}';

  /**
   * GET /switch-model/{switch-model-id}/port Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSwitchModelPort()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSwitchModelPort$Response(params: {

    /**
     * fabric-id (target in onos-config)
     */
    'fabric-id': any;

    /**
     * key {switch-model-id}
     */
    'switch-model-id': any;

    /**
     * key {cage-number}
     */
    'cage-number': any;

    /**
     * key {channel-number}
     */
    'channel-number': any;
  }): Observable<StrictHttpResponse<SwitchModelPort>> {

    const rb = new RequestBuilder(this.rootUrl, ContainerService.GetSwitchModelPortPath, 'get');
    if (params) {
      rb.path('fabric-id', params['fabric-id'], {});
      rb.path('switch-model-id', params['switch-model-id'], {});
      rb.path('cage-number', params['cage-number'], {});
      rb.path('channel-number', params['channel-number'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SwitchModelPort>;
      })
    );
  }

  /**
   * GET /switch-model/{switch-model-id}/port Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSwitchModelPort$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSwitchModelPort(params: {

    /**
     * fabric-id (target in onos-config)
     */
    'fabric-id': any;

    /**
     * key {switch-model-id}
     */
    'switch-model-id': any;

    /**
     * key {cage-number}
     */
    'cage-number': any;

    /**
     * key {channel-number}
     */
    'channel-number': any;
  }): Observable<SwitchModelPort> {

    return this.getSwitchModelPort$Response(params).pipe(
      map((r: StrictHttpResponse<SwitchModelPort>) => r.body as SwitchModelPort)
    );
  }

  /**
   * Path part for operation getSwitch
   */
  static readonly GetSwitchPath = '/sdn-fabric/v0.1.x/{fabric-id}/switch/{switch-id}';

  /**
   * GET /switch Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSwitch()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSwitch$Response(params: {

    /**
     * fabric-id (target in onos-config)
     */
    'fabric-id': any;

    /**
     * key {switch-id}
     */
    'switch-id': any;
  }): Observable<StrictHttpResponse<Switch>> {

    const rb = new RequestBuilder(this.rootUrl, ContainerService.GetSwitchPath, 'get');
    if (params) {
      rb.path('fabric-id', params['fabric-id'], {});
      rb.path('switch-id', params['switch-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Switch>;
      })
    );
  }

  /**
   * GET /switch Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSwitch$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSwitch(params: {

    /**
     * fabric-id (target in onos-config)
     */
    'fabric-id': any;

    /**
     * key {switch-id}
     */
    'switch-id': any;
  }): Observable<Switch> {

    return this.getSwitch$Response(params).pipe(
      map((r: StrictHttpResponse<Switch>) => r.body as Switch)
    );
  }

  /**
   * Path part for operation getSwitchAttribute
   */
  static readonly GetSwitchAttributePath = '/sdn-fabric/v0.1.x/{fabric-id}/switch/{switch-id}/attribute/{attribute-key}';

  /**
   * GET /switch/{switch-id}/attribute Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSwitchAttribute()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSwitchAttribute$Response(params: {

    /**
     * fabric-id (target in onos-config)
     */
    'fabric-id': any;

    /**
     * key {switch-id}
     */
    'switch-id': any;

    /**
     * key {attribute-key}
     */
    'attribute-key': any;
  }): Observable<StrictHttpResponse<SwitchAttribute>> {

    const rb = new RequestBuilder(this.rootUrl, ContainerService.GetSwitchAttributePath, 'get');
    if (params) {
      rb.path('fabric-id', params['fabric-id'], {});
      rb.path('switch-id', params['switch-id'], {});
      rb.path('attribute-key', params['attribute-key'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SwitchAttribute>;
      })
    );
  }

  /**
   * GET /switch/{switch-id}/attribute Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSwitchAttribute$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSwitchAttribute(params: {

    /**
     * fabric-id (target in onos-config)
     */
    'fabric-id': any;

    /**
     * key {switch-id}
     */
    'switch-id': any;

    /**
     * key {attribute-key}
     */
    'attribute-key': any;
  }): Observable<SwitchAttribute> {

    return this.getSwitchAttribute$Response(params).pipe(
      map((r: StrictHttpResponse<SwitchAttribute>) => r.body as SwitchAttribute)
    );
  }

  /**
   * Path part for operation getSwitchManagement
   */
  static readonly GetSwitchManagementPath = '/sdn-fabric/v0.1.x/{fabric-id}/switch/{switch-id}/management';

  /**
   * GET /switch/{switch-id}/management Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSwitchManagement()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSwitchManagement$Response(params: {

    /**
     * fabric-id (target in onos-config)
     */
    'fabric-id': any;

    /**
     * key {switch-id}
     */
    'switch-id': any;
  }): Observable<StrictHttpResponse<SwitchManagement>> {

    const rb = new RequestBuilder(this.rootUrl, ContainerService.GetSwitchManagementPath, 'get');
    if (params) {
      rb.path('fabric-id', params['fabric-id'], {});
      rb.path('switch-id', params['switch-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SwitchManagement>;
      })
    );
  }

  /**
   * GET /switch/{switch-id}/management Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSwitchManagement$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSwitchManagement(params: {

    /**
     * fabric-id (target in onos-config)
     */
    'fabric-id': any;

    /**
     * key {switch-id}
     */
    'switch-id': any;
  }): Observable<SwitchManagement> {

    return this.getSwitchManagement$Response(params).pipe(
      map((r: StrictHttpResponse<SwitchManagement>) => r.body as SwitchManagement)
    );
  }

  /**
   * Path part for operation getSwitchPort
   */
  static readonly GetSwitchPortPath = '/sdn-fabric/v0.1.x/{fabric-id}/switch/{switch-id}/port/{cage-number}/{channel-number}';

  /**
   * GET /switch/{switch-id}/port Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSwitchPort()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSwitchPort$Response(params: {

    /**
     * fabric-id (target in onos-config)
     */
    'fabric-id': any;

    /**
     * key {switch-id}
     */
    'switch-id': any;

    /**
     * key {cage-number}
     */
    'cage-number': any;

    /**
     * key {channel-number}
     */
    'channel-number': any;
  }): Observable<StrictHttpResponse<SwitchPort>> {

    const rb = new RequestBuilder(this.rootUrl, ContainerService.GetSwitchPortPath, 'get');
    if (params) {
      rb.path('fabric-id', params['fabric-id'], {});
      rb.path('switch-id', params['switch-id'], {});
      rb.path('cage-number', params['cage-number'], {});
      rb.path('channel-number', params['channel-number'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SwitchPort>;
      })
    );
  }

  /**
   * GET /switch/{switch-id}/port Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSwitchPort$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSwitchPort(params: {

    /**
     * fabric-id (target in onos-config)
     */
    'fabric-id': any;

    /**
     * key {switch-id}
     */
    'switch-id': any;

    /**
     * key {cage-number}
     */
    'cage-number': any;

    /**
     * key {channel-number}
     */
    'channel-number': any;
  }): Observable<SwitchPort> {

    return this.getSwitchPort$Response(params).pipe(
      map((r: StrictHttpResponse<SwitchPort>) => r.body as SwitchPort)
    );
  }

  /**
   * Path part for operation getSwitchPortState
   */
  static readonly GetSwitchPortStatePath = '/sdn-fabric/v0.1.x/{fabric-id}/switch/{switch-id}/port/{cage-number}/{channel-number}/state';

  /**
   * GET /switch/{switch-id}/port/{cage-number}/{channel-number}/state Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSwitchPortState()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSwitchPortState$Response(params: {

    /**
     * fabric-id (target in onos-config)
     */
    'fabric-id': any;

    /**
     * key {switch-id}
     */
    'switch-id': any;

    /**
     * key {cage-number}
     */
    'cage-number': any;

    /**
     * key {channel-number}
     */
    'channel-number': any;
  }): Observable<StrictHttpResponse<SwitchPortState>> {

    const rb = new RequestBuilder(this.rootUrl, ContainerService.GetSwitchPortStatePath, 'get');
    if (params) {
      rb.path('fabric-id', params['fabric-id'], {});
      rb.path('switch-id', params['switch-id'], {});
      rb.path('cage-number', params['cage-number'], {});
      rb.path('channel-number', params['channel-number'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SwitchPortState>;
      })
    );
  }

  /**
   * GET /switch/{switch-id}/port/{cage-number}/{channel-number}/state Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSwitchPortState$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSwitchPortState(params: {

    /**
     * fabric-id (target in onos-config)
     */
    'fabric-id': any;

    /**
     * key {switch-id}
     */
    'switch-id': any;

    /**
     * key {cage-number}
     */
    'cage-number': any;

    /**
     * key {channel-number}
     */
    'channel-number': any;
  }): Observable<SwitchPortState> {

    return this.getSwitchPortState$Response(params).pipe(
      map((r: StrictHttpResponse<SwitchPortState>) => r.body as SwitchPortState)
    );
  }

  /**
   * Path part for operation getSwitchPortVlans
   */
  static readonly GetSwitchPortVlansPath = '/sdn-fabric/v0.1.x/{fabric-id}/switch/{switch-id}/port/{cage-number}/{channel-number}/vlans';

  /**
   * GET /switch/{switch-id}/port/{cage-number}/{channel-number}/vlans Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSwitchPortVlans()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSwitchPortVlans$Response(params: {

    /**
     * fabric-id (target in onos-config)
     */
    'fabric-id': any;

    /**
     * key {switch-id}
     */
    'switch-id': any;

    /**
     * key {cage-number}
     */
    'cage-number': any;

    /**
     * key {channel-number}
     */
    'channel-number': any;
  }): Observable<StrictHttpResponse<SwitchPortVlans>> {

    const rb = new RequestBuilder(this.rootUrl, ContainerService.GetSwitchPortVlansPath, 'get');
    if (params) {
      rb.path('fabric-id', params['fabric-id'], {});
      rb.path('switch-id', params['switch-id'], {});
      rb.path('cage-number', params['cage-number'], {});
      rb.path('channel-number', params['channel-number'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SwitchPortVlans>;
      })
    );
  }

  /**
   * GET /switch/{switch-id}/port/{cage-number}/{channel-number}/vlans Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSwitchPortVlans$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSwitchPortVlans(params: {

    /**
     * fabric-id (target in onos-config)
     */
    'fabric-id': any;

    /**
     * key {switch-id}
     */
    'switch-id': any;

    /**
     * key {cage-number}
     */
    'cage-number': any;

    /**
     * key {channel-number}
     */
    'channel-number': any;
  }): Observable<SwitchPortVlans> {

    return this.getSwitchPortVlans$Response(params).pipe(
      map((r: StrictHttpResponse<SwitchPortVlans>) => r.body as SwitchPortVlans)
    );
  }

  /**
   * Path part for operation getSwitchState
   */
  static readonly GetSwitchStatePath = '/sdn-fabric/v0.1.x/{fabric-id}/switch/{switch-id}/state';

  /**
   * GET /switch/{switch-id}/state Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSwitchState()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSwitchState$Response(params: {

    /**
     * fabric-id (target in onos-config)
     */
    'fabric-id': any;

    /**
     * key {switch-id}
     */
    'switch-id': any;
  }): Observable<StrictHttpResponse<SwitchState>> {

    const rb = new RequestBuilder(this.rootUrl, ContainerService.GetSwitchStatePath, 'get');
    if (params) {
      rb.path('fabric-id', params['fabric-id'], {});
      rb.path('switch-id', params['switch-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SwitchState>;
      })
    );
  }

  /**
   * GET /switch/{switch-id}/state Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSwitchState$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSwitchState(params: {

    /**
     * fabric-id (target in onos-config)
     */
    'fabric-id': any;

    /**
     * key {switch-id}
     */
    'switch-id': any;
  }): Observable<SwitchState> {

    return this.getSwitchState$Response(params).pipe(
      map((r: StrictHttpResponse<SwitchState>) => r.body as SwitchState)
    );
  }

  /**
   * Path part for operation getSwitchSwitchPair
   */
  static readonly GetSwitchSwitchPairPath = '/sdn-fabric/v0.1.x/{fabric-id}/switch/{switch-id}/switch-pair';

  /**
   * GET /switch/{switch-id}/switch-pair Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSwitchSwitchPair()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSwitchSwitchPair$Response(params: {

    /**
     * fabric-id (target in onos-config)
     */
    'fabric-id': any;

    /**
     * key {switch-id}
     */
    'switch-id': any;
  }): Observable<StrictHttpResponse<SwitchSwitchPair>> {

    const rb = new RequestBuilder(this.rootUrl, ContainerService.GetSwitchSwitchPairPath, 'get');
    if (params) {
      rb.path('fabric-id', params['fabric-id'], {});
      rb.path('switch-id', params['switch-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SwitchSwitchPair>;
      })
    );
  }

  /**
   * GET /switch/{switch-id}/switch-pair Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSwitchSwitchPair$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSwitchSwitchPair(params: {

    /**
     * fabric-id (target in onos-config)
     */
    'fabric-id': any;

    /**
     * key {switch-id}
     */
    'switch-id': any;
  }): Observable<SwitchSwitchPair> {

    return this.getSwitchSwitchPair$Response(params).pipe(
      map((r: StrictHttpResponse<SwitchSwitchPair>) => r.body as SwitchSwitchPair)
    );
  }

  /**
   * Path part for operation getSwitchSwitchPairPairingPort
   */
  static readonly GetSwitchSwitchPairPairingPortPath = '/sdn-fabric/v0.1.x/{fabric-id}/switch/{switch-id}/switch-pair/pairing-port/{cage-number}/{channel-number}';

  /**
   * GET /switch/{switch-id}/switch-pair/pairing-port Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSwitchSwitchPairPairingPort()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSwitchSwitchPairPairingPort$Response(params: {

    /**
     * fabric-id (target in onos-config)
     */
    'fabric-id': any;

    /**
     * key {switch-id}
     */
    'switch-id': any;

    /**
     * key {cage-number}
     */
    'cage-number': any;

    /**
     * key {channel-number}
     */
    'channel-number': any;
  }): Observable<StrictHttpResponse<SwitchSwitchPairPairingPort>> {

    const rb = new RequestBuilder(this.rootUrl, ContainerService.GetSwitchSwitchPairPairingPortPath, 'get');
    if (params) {
      rb.path('fabric-id', params['fabric-id'], {});
      rb.path('switch-id', params['switch-id'], {});
      rb.path('cage-number', params['cage-number'], {});
      rb.path('channel-number', params['channel-number'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SwitchSwitchPairPairingPort>;
      })
    );
  }

  /**
   * GET /switch/{switch-id}/switch-pair/pairing-port Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSwitchSwitchPairPairingPort$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSwitchSwitchPairPairingPort(params: {

    /**
     * fabric-id (target in onos-config)
     */
    'fabric-id': any;

    /**
     * key {switch-id}
     */
    'switch-id': any;

    /**
     * key {cage-number}
     */
    'cage-number': any;

    /**
     * key {channel-number}
     */
    'channel-number': any;
  }): Observable<SwitchSwitchPairPairingPort> {

    return this.getSwitchSwitchPairPairingPort$Response(params).pipe(
      map((r: StrictHttpResponse<SwitchSwitchPairPairingPort>) => r.body as SwitchSwitchPairPairingPort)
    );
  }

  /**
   * Path part for operation getSwitchVlan
   */
  static readonly GetSwitchVlanPath = '/sdn-fabric/v0.1.x/{fabric-id}/switch/{switch-id}/vlan/{vlan-id}';

  /**
   * GET /switch/{switch-id}/vlan Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSwitchVlan()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSwitchVlan$Response(params: {

    /**
     * fabric-id (target in onos-config)
     */
    'fabric-id': any;

    /**
     * key {switch-id}
     */
    'switch-id': any;

    /**
     * key {vlan-id}
     */
    'vlan-id': any;
  }): Observable<StrictHttpResponse<SwitchVlan>> {

    const rb = new RequestBuilder(this.rootUrl, ContainerService.GetSwitchVlanPath, 'get');
    if (params) {
      rb.path('fabric-id', params['fabric-id'], {});
      rb.path('switch-id', params['switch-id'], {});
      rb.path('vlan-id', params['vlan-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SwitchVlan>;
      })
    );
  }

  /**
   * GET /switch/{switch-id}/vlan Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSwitchVlan$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSwitchVlan(params: {

    /**
     * fabric-id (target in onos-config)
     */
    'fabric-id': any;

    /**
     * key {switch-id}
     */
    'switch-id': any;

    /**
     * key {vlan-id}
     */
    'vlan-id': any;
  }): Observable<SwitchVlan> {

    return this.getSwitchVlan$Response(params).pipe(
      map((r: StrictHttpResponse<SwitchVlan>) => r.body as SwitchVlan)
    );
  }

}
