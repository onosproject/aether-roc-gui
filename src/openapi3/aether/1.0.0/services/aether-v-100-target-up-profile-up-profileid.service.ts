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

import { AetherV100TargetUpProfileUpProfile } from '../models/aether-v-100-target-up-profile-up-profile';

@Injectable({
  providedIn: 'root',
})
export class AetherV100TargetUpProfileUpProfileidService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAetherV100TargetUpProfileUpProfile
   */
  static readonly GetAetherV100TargetUpProfileUpProfilePath = '/aether/v1.0.0/{target}/up-profile/up-profile/{id}';

  /**
   * GET /aether/v1.0.0/{target}/up-profile/up-profile Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAetherV100TargetUpProfileUpProfile()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAetherV100TargetUpProfileUpProfile$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<AetherV100TargetUpProfileUpProfile>> {

    const rb = new RequestBuilder(this.rootUrl, AetherV100TargetUpProfileUpProfileidService.GetAetherV100TargetUpProfileUpProfilePath, 'get');
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
        return r as StrictHttpResponse<AetherV100TargetUpProfileUpProfile>;
      })
    );
  }

  /**
   * GET /aether/v1.0.0/{target}/up-profile/up-profile Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAetherV100TargetUpProfileUpProfile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAetherV100TargetUpProfileUpProfile(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<AetherV100TargetUpProfileUpProfile> {

    return this.getAetherV100TargetUpProfileUpProfile$Response(params).pipe(
      map((r: StrictHttpResponse<AetherV100TargetUpProfileUpProfile>) => r.body as AetherV100TargetUpProfileUpProfile)
    );
  }

}
