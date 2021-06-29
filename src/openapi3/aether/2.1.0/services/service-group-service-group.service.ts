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

import { ServiceGroupServiceGroup } from '../models/service-group-service-group';

@Injectable({
  providedIn: 'root',
})
export class ServiceGroupServiceGroupService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getServiceGroupServiceGroup
   */
  static readonly GetServiceGroupServiceGroupPath = '/aether/v2.1.0/{target}/service-group/service-group/{id}';

  /**
   * GET /service-group/service-group Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getServiceGroupServiceGroup()` instead.
   *
   * This method doesn't expect any request body.
   */
  getServiceGroupServiceGroup$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<ServiceGroupServiceGroup>> {

    const rb = new RequestBuilder(this.rootUrl, ServiceGroupServiceGroupService.GetServiceGroupServiceGroupPath, 'get');
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
        return r as StrictHttpResponse<ServiceGroupServiceGroup>;
      })
    );
  }

  /**
   * GET /service-group/service-group Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getServiceGroupServiceGroup$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getServiceGroupServiceGroup(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<ServiceGroupServiceGroup> {

    return this.getServiceGroupServiceGroup$Response(params).pipe(
      map((r: StrictHttpResponse<ServiceGroupServiceGroup>) => r.body as ServiceGroupServiceGroup)
    );
  }

}
