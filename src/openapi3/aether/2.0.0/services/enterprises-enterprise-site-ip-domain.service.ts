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

import { EnterprisesEnterpriseSiteIpDomain } from '../models/enterprises-enterprise-site-ip-domain';
import { EnterprisesEnterpriseSiteIpDomainList } from '../models/enterprises-enterprise-site-ip-domain-list';

@Injectable({
  providedIn: 'root',
})
export class EnterprisesEnterpriseSiteIpDomainService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
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

    const rb = new RequestBuilder(this.rootUrl, EnterprisesEnterpriseSiteIpDomainService.GetEnterprisesEnterpriseSiteIpDomainListPath, 'get');
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

    const rb = new RequestBuilder(this.rootUrl, EnterprisesEnterpriseSiteIpDomainService.GetEnterprisesEnterpriseSiteIpDomainPath, 'get');
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

}
