// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Rbac } from '../models/rbac';

@Injectable({
  providedIn: 'root',
})
export class Service extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getRbac
   */
  static readonly GetRbacPath = '/rbac/v1.0.0/{target}/rbac';

  /**
   * GET /rbac Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getRbac()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRbac$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<StrictHttpResponse<Rbac>> {

    const rb = new RequestBuilder(this.rootUrl, Service.GetRbacPath, 'get');
    if (params) {

      rb.path('target', params.target, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Rbac>;
      })
    );
  }

  /**
   * GET /rbac Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getRbac$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRbac(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<Rbac> {

    return this.getRbac$Response(params).pipe(
      map((r: StrictHttpResponse<Rbac>) => r.body as Rbac)
    );
  }

}
