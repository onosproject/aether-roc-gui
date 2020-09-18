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

import { AetherV100TargetAccessProfileAccessProfile } from '../models/aether-v-100-target-access-profile-access-profile';

@Injectable({
  providedIn: 'root',
})
export class AetherV100TargetAccessProfileService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAetherV100TargetAccessProfileAccessProfile
   */
  static readonly GetAetherV100TargetAccessProfileAccessProfilePath = '/aether/v1.0.0/{target}/access-profile/access-profile/{id}';

  /**
   * GET /aether/v1.0.0/{target}/access-profile/access-profile Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAetherV100TargetAccessProfileAccessProfile()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAetherV100TargetAccessProfileAccessProfile$Response(params: {

    /**
     * key for access-profile
     */
    id: any;

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<StrictHttpResponse<AetherV100TargetAccessProfileAccessProfile>> {

    const rb = new RequestBuilder(this.rootUrl, AetherV100TargetAccessProfileService.GetAetherV100TargetAccessProfileAccessProfilePath, 'get');
    if (params) {

      rb.path('id', params.id, {});
      rb.path('target', params.target, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AetherV100TargetAccessProfileAccessProfile>;
      })
    );
  }

  /**
   * GET /aether/v1.0.0/{target}/access-profile/access-profile Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAetherV100TargetAccessProfileAccessProfile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAetherV100TargetAccessProfileAccessProfile(params: {

    /**
     * key for access-profile
     */
    id: any;

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<AetherV100TargetAccessProfileAccessProfile> {

    return this.getAetherV100TargetAccessProfileAccessProfile$Response(params).pipe(
      map((r: StrictHttpResponse<AetherV100TargetAccessProfileAccessProfile>) => r.body as AetherV100TargetAccessProfileAccessProfile)
    );
  }

}
