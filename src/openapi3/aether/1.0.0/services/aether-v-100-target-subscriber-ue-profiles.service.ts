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

import { AetherV100TargetSubscriberUeProfilesAccessProfile } from '../models/aether-v-100-target-subscriber-ue-profiles-access-profile';

@Injectable({
  providedIn: 'root',
})
export class AetherV100TargetSubscriberUeProfilesService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAetherV100TargetSubscriberUeProfilesAccessProfile
   */
  static readonly GetAetherV100TargetSubscriberUeProfilesAccessProfilePath = '/aether/v1.0.0/{target}/subscriber/ue/{ueid}/profiles/access-profile/{access-profile}';

  /**
   * GET /aether/v1.0.0/{target}/subscriber/ue/profiles/access-profile Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAetherV100TargetSubscriberUeProfilesAccessProfile()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAetherV100TargetSubscriberUeProfilesAccessProfile$Response(params: {

    /**
     * key for ue
     */
    ueid: any;

    /**
     * key for access-profile
     */
    'access-profile': any;

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<StrictHttpResponse<AetherV100TargetSubscriberUeProfilesAccessProfile>> {

    const rb = new RequestBuilder(this.rootUrl, AetherV100TargetSubscriberUeProfilesService.GetAetherV100TargetSubscriberUeProfilesAccessProfilePath, 'get');
    if (params) {

      rb.path('ueid', params.ueid, {});
      rb.path('access-profile', params['access-profile'], {});
      rb.path('target', params.target, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AetherV100TargetSubscriberUeProfilesAccessProfile>;
      })
    );
  }

  /**
   * GET /aether/v1.0.0/{target}/subscriber/ue/profiles/access-profile Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAetherV100TargetSubscriberUeProfilesAccessProfile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAetherV100TargetSubscriberUeProfilesAccessProfile(params: {

    /**
     * key for ue
     */
    ueid: any;

    /**
     * key for access-profile
     */
    'access-profile': any;

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<AetherV100TargetSubscriberUeProfilesAccessProfile> {

    return this.getAetherV100TargetSubscriberUeProfilesAccessProfile$Response(params).pipe(
      map((r: StrictHttpResponse<AetherV100TargetSubscriberUeProfilesAccessProfile>) => r.body as AetherV100TargetSubscriberUeProfilesAccessProfile)
    );
  }

}
