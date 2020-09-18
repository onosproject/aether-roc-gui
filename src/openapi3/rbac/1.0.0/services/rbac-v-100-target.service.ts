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

import { RbacV100TargetRbac } from '../models/rbac-v-100-target-rbac';

@Injectable({
  providedIn: 'root',
})
export class RbacV100TargetService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getRbacV100TargetRbac
   */
  static readonly GetRbacV100TargetRbacPath = '/rbac/v1.0.0/{target}/rbac';

  /**
   * GET /rbac/v1.0.0/{target}/rbac Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getRbacV100TargetRbac()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRbacV100TargetRbac$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<StrictHttpResponse<RbacV100TargetRbac>> {

    const rb = new RequestBuilder(this.rootUrl, RbacV100TargetService.GetRbacV100TargetRbacPath, 'get');
    if (params) {

      rb.path('target', params.target, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RbacV100TargetRbac>;
      })
    );
  }

  /**
   * GET /rbac/v1.0.0/{target}/rbac Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getRbacV100TargetRbac$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRbacV100TargetRbac(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<RbacV100TargetRbac> {

    return this.getRbacV100TargetRbac$Response(params).pipe(
      map((r: StrictHttpResponse<RbacV100TargetRbac>) => r.body as RbacV100TargetRbac)
    );
  }

}
