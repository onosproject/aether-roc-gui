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

import { EnterprisesEnterpriseTrafficClass } from '../models/enterprises-enterprise-traffic-class';
import { EnterprisesEnterpriseTrafficClassList } from '../models/enterprises-enterprise-traffic-class-list';

@Injectable({
  providedIn: 'root',
})
export class EnterprisesEnterpriseTrafficClassService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getEnterprisesEnterpriseTrafficClassList
   */
  static readonly GetEnterprisesEnterpriseTrafficClassListPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/traffic-class';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/traffic-class List.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseTrafficClassList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseTrafficClassList$Response(params: {

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
  }): Observable<StrictHttpResponse<Array<EnterprisesEnterpriseTrafficClassList>>> {
=======
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseTrafficClassList>> {
>>>>>>> e357b5d... Aether-3394 handle null values in responses

    const rb = new RequestBuilder(this.rootUrl, EnterprisesEnterpriseTrafficClassService.GetEnterprisesEnterpriseTrafficClassListPath, 'get');
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
        return r as StrictHttpResponse<Array<EnterprisesEnterpriseTrafficClassList>>;
=======
        return r as StrictHttpResponse<EnterprisesEnterpriseTrafficClassList>;
>>>>>>> e357b5d... Aether-3394 handle null values in responses
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/traffic-class List.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseTrafficClassList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseTrafficClassList(params: {

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
  }): Observable<Array<EnterprisesEnterpriseTrafficClassList>> {

    return this.getEnterprisesEnterpriseTrafficClassList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<EnterprisesEnterpriseTrafficClassList>>) => r.body as Array<EnterprisesEnterpriseTrafficClassList>)
=======
  }): Observable<EnterprisesEnterpriseTrafficClassList> {

    return this.getEnterprisesEnterpriseTrafficClassList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseTrafficClassList>) => r.body as EnterprisesEnterpriseTrafficClassList)
>>>>>>> e357b5d... Aether-3394 handle null values in responses
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseTrafficClass
   */
  static readonly GetEnterprisesEnterpriseTrafficClassPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/traffic-class/{traffic-class-id}';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/traffic-class Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseTrafficClass()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseTrafficClass$Response(params: {

    /**
     * target (target in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {traffic-class-id}
     */
    'traffic-class-id': any;
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseTrafficClass>> {

    const rb = new RequestBuilder(this.rootUrl, EnterprisesEnterpriseTrafficClassService.GetEnterprisesEnterpriseTrafficClassPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('traffic-class-id', params['traffic-class-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterprisesEnterpriseTrafficClass>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/traffic-class Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseTrafficClass$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseTrafficClass(params: {

    /**
     * target (target in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {traffic-class-id}
     */
    'traffic-class-id': any;
  }): Observable<EnterprisesEnterpriseTrafficClass> {

    return this.getEnterprisesEnterpriseTrafficClass$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseTrafficClass>) => r.body as EnterprisesEnterpriseTrafficClass)
    );
  }

}
