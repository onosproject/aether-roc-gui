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

import { ApnProfileApnProfile } from '../models/apn-profile-apn-profile';

@Injectable({
  providedIn: 'root',
})
export class ApnProfileApnProfileService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getApnProfileApnProfile
   */
  static readonly GetApnProfileApnProfilePath = '/aether/v2.0.0/{target}/apn-profile/apn-profile/{id}';

  /**
   * GET /apn-profile/apn-profile Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getApnProfileApnProfile()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApnProfileApnProfile$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<ApnProfileApnProfile>> {

    const rb = new RequestBuilder(this.rootUrl, ApnProfileApnProfileService.GetApnProfileApnProfilePath, 'get');
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
        return r as StrictHttpResponse<ApnProfileApnProfile>;
      })
    );
  }

  /**
   * GET /apn-profile/apn-profile Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getApnProfileApnProfile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApnProfileApnProfile(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<ApnProfileApnProfile> {

    return this.getApnProfileApnProfile$Response(params).pipe(
      map((r: StrictHttpResponse<ApnProfileApnProfile>) => r.body as ApnProfileApnProfile)
    );
  }

}
