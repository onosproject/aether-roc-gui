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
   * Path part for operation getEnterprisesEnterpriseTrafficClass
   */
  static readonly GetEnterprisesEnterpriseTrafficClassPath = '/aether/v2.0.0/{target}/enterprises/enterprise/{enterprise-id}/traffic-class/{traffic-class-id}';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/traffic-class.
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
     * target (device in onos-config)
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
   * GET /enterprises/enterprise/{enterprise-id}/traffic-class.
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
     * target (device in onos-config)
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
