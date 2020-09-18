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

import { AetherV100TargetQosProfileQosProfileApnAmbr } from '../models/aether-v-100-target-qos-profile-qos-profile-apn-ambr';

@Injectable({
  providedIn: 'root',
})
export class AetherV100TargetQosProfileQosProfileService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAetherV100TargetQosProfileQosProfileApnAmbr
   */
  static readonly GetAetherV100TargetQosProfileQosProfileApnAmbrPath = '/aether/v1.0.0/{target}/qos-profile/qos-profile/{id}/apn-ambr';

  /**
   * GET /aether/v1.0.0/{target}/qos-profile/qos-profile/{id}/apn-ambr Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAetherV100TargetQosProfileQosProfileApnAmbr()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAetherV100TargetQosProfileQosProfileApnAmbr$Response(params: {

    /**
     * key for qos-profile
     */
    id: any;

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<StrictHttpResponse<AetherV100TargetQosProfileQosProfileApnAmbr>> {

    const rb = new RequestBuilder(this.rootUrl, AetherV100TargetQosProfileQosProfileService.GetAetherV100TargetQosProfileQosProfileApnAmbrPath, 'get');
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
        return r as StrictHttpResponse<AetherV100TargetQosProfileQosProfileApnAmbr>;
      })
    );
  }

  /**
   * GET /aether/v1.0.0/{target}/qos-profile/qos-profile/{id}/apn-ambr Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAetherV100TargetQosProfileQosProfileApnAmbr$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAetherV100TargetQosProfileQosProfileApnAmbr(params: {

    /**
     * key for qos-profile
     */
    id: any;

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<AetherV100TargetQosProfileQosProfileApnAmbr> {

    return this.getAetherV100TargetQosProfileQosProfileApnAmbr$Response(params).pipe(
      map((r: StrictHttpResponse<AetherV100TargetQosProfileQosProfileApnAmbr>) => r.body as AetherV100TargetQosProfileQosProfileApnAmbr)
    );
  }

}
