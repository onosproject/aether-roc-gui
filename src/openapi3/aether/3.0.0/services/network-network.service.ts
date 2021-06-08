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

import { NetworkNetwork } from '../models/network-network';

@Injectable({
  providedIn: 'root',
})
export class NetworkNetworkService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getNetworkNetwork
   */
  static readonly GetNetworkNetworkPath = '/aether/v3.0.0/{target}/network/network/{id}';

  /**
   * GET /network/network Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getNetworkNetwork()` instead.
   *
   * This method doesn't expect any request body.
   */
  getNetworkNetwork$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<NetworkNetwork>> {

    const rb = new RequestBuilder(this.rootUrl, NetworkNetworkService.GetNetworkNetworkPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<NetworkNetwork>;
      })
    );
  }

  /**
   * GET /network/network Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getNetworkNetwork$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getNetworkNetwork(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<NetworkNetwork> {

    return this.getNetworkNetwork$Response(params).pipe(
      map((r: StrictHttpResponse<NetworkNetwork>) => r.body as NetworkNetwork)
    );
  }

}
