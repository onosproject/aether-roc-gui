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

import { EnterprisesEnterprise } from '../models/enterprises-enterprise';
import { EnterprisesEnterpriseList } from '../models/enterprises-enterprise-list';

@Injectable({
  providedIn: 'root',
})
export class EnterprisesEnterpriseService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getEnterprisesEnterprise
   */
  static readonly GetEnterprisesEnterprisePath = '/aether/v2.0.0/{target}/enterprises/enterprise/{enterprise-id}';

  /**
   * GET /enterprises/enterprise.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterprise()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterprise$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;
  }): Observable<StrictHttpResponse<EnterprisesEnterprise>> {

    const rb = new RequestBuilder(this.rootUrl, EnterprisesEnterpriseService.GetEnterprisesEnterprisePath, 'get');
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
        return r as StrictHttpResponse<EnterprisesEnterprise>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterprise$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterprise(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;
  }): Observable<EnterprisesEnterprise> {

    return this.getEnterprisesEnterprise$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterprise>) => r.body as EnterprisesEnterprise)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseList
   */
  static readonly GetEnterprisesEnterpriseListPath = '/aether/v2.0.0/{target}/enterprises/enterprise';

  /**
   * GET /enterprises/enterprise.
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
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseList>> {

    const rb = new RequestBuilder(this.rootUrl, EnterprisesEnterpriseService.GetEnterprisesEnterpriseListPath, 'get');
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
   * GET /enterprises/enterprise.
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
  }): Observable<EnterprisesEnterpriseList> {

    return this.getEnterprisesEnterpriseList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseList>) => r.body as EnterprisesEnterpriseList)
    );
  }

}
