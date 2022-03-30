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
   * Path part for operation getEnterprisesEnterprise
   */
  static readonly GetEnterprisesEnterprisePath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}';

  /**
   * GET /enterprises/enterprise Container.
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
     * target (target in onos-config)
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
   * GET /enterprises/enterprise Container.
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
     * target (target in onos-config)
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

}
