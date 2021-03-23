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

import { UpProfileUpProfile } from '../models/up-profile-up-profile';

@Injectable({
  providedIn: 'root',
})
export class UpProfileUpProfileService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getUpProfileUpProfile
   */
  static readonly GetUpProfileUpProfilePath = '/aether/v2.1.0/{target}/up-profile/up-profile/{id}';

  /**
   * GET /up-profile/up-profile Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUpProfileUpProfile()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUpProfileUpProfile$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<UpProfileUpProfile>> {

    const rb = new RequestBuilder(this.rootUrl, UpProfileUpProfileService.GetUpProfileUpProfilePath, 'get');
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
        return r as StrictHttpResponse<UpProfileUpProfile>;
      })
    );
  }

  /**
   * GET /up-profile/up-profile Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getUpProfileUpProfile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUpProfileUpProfile(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<UpProfileUpProfile> {

    return this.getUpProfileUpProfile$Response(params).pipe(
      map((r: StrictHttpResponse<UpProfileUpProfile>) => r.body as UpProfileUpProfile)
    );
  }

}
