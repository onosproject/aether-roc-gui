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

import { SubscriberUeProfilesAccessProfile } from '../models/subscriber-ue-profiles-access-profile';

@Injectable({
  providedIn: 'root',
})
export class SubscriberUeProfilesAccessProfileService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getSubscriberUeProfilesAccessProfile
   */
  static readonly GetSubscriberUeProfilesAccessProfilePath = '/aether/v2.1.0/{target}/subscriber/ue/{id}/profiles/access-profile/{access-profile}';

  /**
   * GET /subscriber/ue/{id}/profiles/access-profile Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSubscriberUeProfilesAccessProfile()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSubscriberUeProfilesAccessProfile$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {access-profile}
     */
    'access-profile': any;
  }): Observable<StrictHttpResponse<SubscriberUeProfilesAccessProfile>> {

    const rb = new RequestBuilder(this.rootUrl, SubscriberUeProfilesAccessProfileService.GetSubscriberUeProfilesAccessProfilePath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
      rb.path('access-profile', params['access-profile'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SubscriberUeProfilesAccessProfile>;
      })
    );
  }

  /**
   * GET /subscriber/ue/{id}/profiles/access-profile Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSubscriberUeProfilesAccessProfile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSubscriberUeProfilesAccessProfile(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {access-profile}
     */
    'access-profile': any;
  }): Observable<SubscriberUeProfilesAccessProfile> {

    return this.getSubscriberUeProfilesAccessProfile$Response(params).pipe(
      map((r: StrictHttpResponse<SubscriberUeProfilesAccessProfile>) => r.body as SubscriberUeProfilesAccessProfile)
    );
  }

}
