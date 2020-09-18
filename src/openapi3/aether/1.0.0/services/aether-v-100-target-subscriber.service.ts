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

import { AetherV100TargetSubscriberUe } from '../models/aether-v-100-target-subscriber-ue';

@Injectable({
  providedIn: 'root',
})
export class AetherV100TargetSubscriberService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAetherV100TargetSubscriberUe
   */
  static readonly GetAetherV100TargetSubscriberUePath = '/aether/v1.0.0/{target}/subscriber/ue/{ueid}';

  /**
   * GET /aether/v1.0.0/{target}/subscriber/ue Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAetherV100TargetSubscriberUe()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAetherV100TargetSubscriberUe$Response(params: {

    /**
     * key for ue
     */
    ueid: any;

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<StrictHttpResponse<AetherV100TargetSubscriberUe>> {

    const rb = new RequestBuilder(this.rootUrl, AetherV100TargetSubscriberService.GetAetherV100TargetSubscriberUePath, 'get');
    if (params) {

      rb.path('ueid', params.ueid, {});
      rb.path('target', params.target, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AetherV100TargetSubscriberUe>;
      })
    );
  }

  /**
   * GET /aether/v1.0.0/{target}/subscriber/ue Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAetherV100TargetSubscriberUe$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAetherV100TargetSubscriberUe(params: {

    /**
     * key for ue
     */
    ueid: any;

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<AetherV100TargetSubscriberUe> {

    return this.getAetherV100TargetSubscriberUe$Response(params).pipe(
      map((r: StrictHttpResponse<AetherV100TargetSubscriberUe>) => r.body as AetherV100TargetSubscriberUe)
    );
  }

}
