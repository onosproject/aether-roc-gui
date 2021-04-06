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

import { SecurityProfileSecurityProfile } from '../models/security-profile-security-profile';

@Injectable({
  providedIn: 'root',
})
export class SecurityProfileSecurityProfileService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getSecurityProfileSecurityProfile
   */
  static readonly GetSecurityProfileSecurityProfilePath = '/aether/v2.1.0/{target}/security-profile/security-profile/{id}';

  /**
   * GET /security-profile/security-profile Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSecurityProfileSecurityProfile()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSecurityProfileSecurityProfile$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<SecurityProfileSecurityProfile>> {

    const rb = new RequestBuilder(this.rootUrl, SecurityProfileSecurityProfileService.GetSecurityProfileSecurityProfilePath, 'get');
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
        return r as StrictHttpResponse<SecurityProfileSecurityProfile>;
      })
    );
  }

  /**
   * GET /security-profile/security-profile Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSecurityProfileSecurityProfile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSecurityProfileSecurityProfile(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<SecurityProfileSecurityProfile> {

    return this.getSecurityProfileSecurityProfile$Response(params).pipe(
      map((r: StrictHttpResponse<SecurityProfileSecurityProfile>) => r.body as SecurityProfileSecurityProfile)
    );
  }

}
