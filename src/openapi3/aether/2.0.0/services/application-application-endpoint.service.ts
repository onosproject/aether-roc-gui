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
import {EnterpriseEnterpriseApplication} from "../models/enterprise-enterprise-application";
import {EnterpriseEnterpriseApplicationEndpoint} from "../models/enterprise-enterprise-application-endpoint";
import {EnterpriseEnterpriseApplicationEndpointMbr} from "../models/enterprise-enterprise-application-endpoint-mbr";


@Injectable({
  providedIn: 'root',
})
export class ApplicationApplicationEndpointService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getApplicationApplicationEndpoint
   */
  static readonly GetApplicationApplicationEndpointPath = '/aether/v2.0.0/{target}/application/application/{id}/endpoint/{endpoint-id}';

  /**
   * GET /application/application/{id}/endpoint.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getApplicationApplicationEndpoint()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApplicationApplicationEndpoint$Response(params: {

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
  }): Observable<StrictHttpResponse<EnterpriseEnterpriseApplicationEndpoint>> {

    const rb = new RequestBuilder(this.rootUrl, ApplicationApplicationEndpointService.GetApplicationApplicationEndpointPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
      rb.path('endpoint-id', params['endpoint-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterpriseEnterpriseApplicationEndpoint>;
      })
    );
  }

  /**
   * GET /application/application/{id}/endpoint.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getApplicationApplicationEndpoint$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApplicationApplicationEndpoint(params: {

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
  }): Observable<EnterpriseEnterpriseApplicationEndpoint> {

    return this.getApplicationApplicationEndpoint$Response(params).pipe(
      map((r: StrictHttpResponse<EnterpriseEnterpriseApplicationEndpoint>) => r.body as EnterpriseEnterpriseApplicationEndpoint)
    );
  }

  /**
   * Path part for operation getApplicationApplicationEndpointMbr
   */
  static readonly GetApplicationApplicationEndpointMbrPath = '/aether/v2.0.0/{target}/application/application/{id}/endpoint/{endpoint-id}/mbr';

  /**
   * GET /application/application/{id}/endpoint/{endpoint-id}/mbr.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getApplicationApplicationEndpointMbr()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApplicationApplicationEndpointMbr$Response(params: {

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
  }): Observable<StrictHttpResponse<EnterpriseEnterpriseApplicationEndpointMbr>> {

    const rb = new RequestBuilder(this.rootUrl, ApplicationApplicationEndpointService.GetApplicationApplicationEndpointMbrPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
      rb.path('endpoint-id', params['endpoint-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterpriseEnterpriseApplicationEndpointMbr>;
      })
    );
  }

  /**
   * GET /application/application/{id}/endpoint/{endpoint-id}/mbr.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getApplicationApplicationEndpointMbr$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApplicationApplicationEndpointMbr(params: {

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
  }): Observable<EnterpriseEnterpriseApplicationEndpointMbr> {

    return this.getApplicationApplicationEndpointMbr$Response(params).pipe(
      map((r: StrictHttpResponse<EnterpriseEnterpriseApplicationEndpointMbr>) => r.body as EnterpriseEnterpriseApplicationEndpointMbr)
    );
  }

}
