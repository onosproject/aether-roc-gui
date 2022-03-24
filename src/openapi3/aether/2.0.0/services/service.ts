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
import { Enterprises } from '../models/enterprises';

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
     * target (device in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<ConnectivityServices>> {

    const rb = new RequestBuilder(this.rootUrl, Service.GetConnectivityServicesPath, 'get');
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
     * target (device in onos-config)
     */
    target: any;
  }): Observable<ConnectivityServices> {

    return this.getConnectivityServices$Response(params).pipe(
      map((r: StrictHttpResponse<ConnectivityServices>) => r.body as ConnectivityServices)
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
     * target (device in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<Enterprises>> {

    const rb = new RequestBuilder(this.rootUrl, Service.GetEnterprisesPath, 'get');
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
     * target (device in onos-config)
     */
    target: any;
  }): Observable<Enterprises> {

    return this.getEnterprises$Response(params).pipe(
      map((r: StrictHttpResponse<Enterprises>) => r.body as Enterprises)
    );
  }

}
