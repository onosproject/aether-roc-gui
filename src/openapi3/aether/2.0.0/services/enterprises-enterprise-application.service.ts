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

import { EnterprisesEnterpriseApplication } from '../models/enterprises-enterprise-application';
import { EnterprisesEnterpriseApplicationList } from '../models/enterprises-enterprise-application-list';

@Injectable({
  providedIn: 'root',
})
export class EnterprisesEnterpriseApplicationService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
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

    const rb = new RequestBuilder(this.rootUrl, EnterprisesEnterpriseApplicationService.GetEnterprisesEnterpriseApplicationListPath, 'get');
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
   * Path part for operation getEnterprisesEnterpriseApplication
   */
  static readonly GetEnterprisesEnterpriseApplicationPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/application/{application-id}';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/application Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseApplication()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseApplication$Response(params: {

    /**
     * target (target in onos-config)
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
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseApplication>> {

    const rb = new RequestBuilder(this.rootUrl, EnterprisesEnterpriseApplicationService.GetEnterprisesEnterpriseApplicationPath, 'get');
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
        return r as StrictHttpResponse<EnterprisesEnterpriseApplication>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/application Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseApplication$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseApplication(params: {

    /**
     * target (target in onos-config)
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
  }): Observable<EnterprisesEnterpriseApplication> {

    return this.getEnterprisesEnterpriseApplication$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseApplication>) => r.body as EnterprisesEnterpriseApplication)
    );
  }

}
