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

import { EnterpriseEnterprise } from '../models/enterprise-enterprise';

@Injectable({
  providedIn: 'root',
})
export class EnterpriseEnterpriseService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getEnterpriseEnterprise
   */
  static readonly GetEnterpriseEnterprisePath = '/aether/v4.0.0/{target}/enterprise/enterprise/{id}';

  /**
   * GET /enterprise/enterprise.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterpriseEnterprise()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterpriseEnterprise$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<EnterpriseEnterprise>> {

    const rb = new RequestBuilder(this.rootUrl, EnterpriseEnterpriseService.GetEnterpriseEnterprisePath, 'get');
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
        return r as StrictHttpResponse<EnterpriseEnterprise>;
      })
    );
  }

  /**
   * GET /enterprise/enterprise.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterpriseEnterprise$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterpriseEnterprise(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<EnterpriseEnterprise> {

    return this.getEnterpriseEnterprise$Response(params).pipe(
      map((r: StrictHttpResponse<EnterpriseEnterprise>) => r.body as EnterpriseEnterprise)
    );
  }

}
