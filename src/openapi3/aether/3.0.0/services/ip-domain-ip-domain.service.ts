// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { IpDomainIpDomain } from '../models/ip-domain-ip-domain';

@Injectable({
  providedIn: 'root',
})
export class IpDomainIpDomainService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getIpDomainIpDomain
   */
  static readonly GetIpDomainIpDomainPath = '/aether/v3.0.0/{target}/ip-domain/ip-domain/{id}';

  /**
   * GET /ip-domain/ip-domain Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getIpDomainIpDomain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getIpDomainIpDomain$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<IpDomainIpDomain>> {

    const rb = new RequestBuilder(this.rootUrl, IpDomainIpDomainService.GetIpDomainIpDomainPath, 'get');
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
        return r as StrictHttpResponse<IpDomainIpDomain>;
      })
    );
  }

  /**
   * GET /ip-domain/ip-domain Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getIpDomainIpDomain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getIpDomainIpDomain(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<IpDomainIpDomain> {

    return this.getIpDomainIpDomain$Response(params).pipe(
      map((r: StrictHttpResponse<IpDomainIpDomain>) => r.body as IpDomainIpDomain)
    );
  }

}
