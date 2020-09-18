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

import { AetherV100TargetQosProfileQosProfile } from '../models/aether-v-100-target-qos-profile-qos-profile';

@Injectable({
  providedIn: 'root',
})
export class AetherV100TargetQosProfileService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAetherV100TargetQosProfileQosProfile
   */
  static readonly GetAetherV100TargetQosProfileQosProfilePath = '/aether/v1.0.0/{target}/qos-profile/qos-profile/{id}';

  /**
   * GET /aether/v1.0.0/{target}/qos-profile/qos-profile Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAetherV100TargetQosProfileQosProfile()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAetherV100TargetQosProfileQosProfile$Response(params: {

    /**
     * key for qos-profile
     */
    id: any;

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<StrictHttpResponse<AetherV100TargetQosProfileQosProfile>> {

    const rb = new RequestBuilder(this.rootUrl, AetherV100TargetQosProfileService.GetAetherV100TargetQosProfileQosProfilePath, 'get');
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
        return r as StrictHttpResponse<AetherV100TargetQosProfileQosProfile>;
      })
    );
  }

  /**
   * GET /aether/v1.0.0/{target}/qos-profile/qos-profile Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAetherV100TargetQosProfileQosProfile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAetherV100TargetQosProfileQosProfile(params: {

    /**
     * key for qos-profile
     */
    id: any;

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<AetherV100TargetQosProfileQosProfile> {

    return this.getAetherV100TargetQosProfileQosProfile$Response(params).pipe(
      map((r: StrictHttpResponse<AetherV100TargetQosProfileQosProfile>) => r.body as AetherV100TargetQosProfileQosProfile)
    );
  }

}
