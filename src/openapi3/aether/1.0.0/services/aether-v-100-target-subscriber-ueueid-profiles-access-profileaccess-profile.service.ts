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

import { AetherV100TargetSubscriberUeueidProfilesAccessProfile } from '../models/aether-v-100-target-subscriber-ueueid-profiles-access-profile';

@Injectable({
  providedIn: 'root',
})
export class AetherV100TargetSubscriberUeueidProfilesAccessProfileaccessProfileService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAetherV100TargetSubscriberUeueidProfilesAccessProfile
   */
  static readonly GetAetherV100TargetSubscriberUeueidProfilesAccessProfilePath = '/aether/v1.0.0/{target}/subscriber/ue/{ueid}/profiles/access-profile/{access-profile}';

  /**
   * GET /aether/v1.0.0/{target}/subscriber/ue/{ueid}/profiles/access-profile Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAetherV100TargetSubscriberUeueidProfilesAccessProfile()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAetherV100TargetSubscriberUeueidProfilesAccessProfile$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {ueid}
     */
    ueid: any;

    /**
     * key {access-profile}
     */
    'access-profile': any;

  }): Observable<StrictHttpResponse<AetherV100TargetSubscriberUeueidProfilesAccessProfile>> {

    const rb = new RequestBuilder(this.rootUrl, AetherV100TargetSubscriberUeueidProfilesAccessProfileaccessProfileService.GetAetherV100TargetSubscriberUeueidProfilesAccessProfilePath, 'get');
    if (params) {

      rb.path('target', params.target, {});
      rb.path('ueid', params.ueid, {});
      rb.path('access-profile', params['access-profile'], {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AetherV100TargetSubscriberUeueidProfilesAccessProfile>;
      })
    );
  }

  /**
   * GET /aether/v1.0.0/{target}/subscriber/ue/{ueid}/profiles/access-profile Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAetherV100TargetSubscriberUeueidProfilesAccessProfile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAetherV100TargetSubscriberUeueidProfilesAccessProfile(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {ueid}
     */
    ueid: any;

    /**
     * key {access-profile}
     */
    'access-profile': any;

  }): Observable<AetherV100TargetSubscriberUeueidProfilesAccessProfile> {

    return this.getAetherV100TargetSubscriberUeueidProfilesAccessProfile$Response(params).pipe(
      map((r: StrictHttpResponse<AetherV100TargetSubscriberUeueidProfilesAccessProfile>) => r.body as AetherV100TargetSubscriberUeueidProfilesAccessProfile)
    );
  }

}
