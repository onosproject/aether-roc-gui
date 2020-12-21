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

import { SubscriberUe } from '../models/subscriber-ue';
import { SubscriberUeProfiles } from '../models/subscriber-ue-profiles';
import { SubscriberUeServingPlmn } from '../models/subscriber-ue-serving-plmn';

@Injectable({
  providedIn: 'root',
})
export class SubscriberUeService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getSubscriberUe
   */
  static readonly GetSubscriberUePath = '/aether/v2.0.0/{target}/subscriber/ue/{id}';

  /**
   * GET /subscriber/ue Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSubscriberUe()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSubscriberUe$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

  }): Observable<StrictHttpResponse<SubscriberUe>> {

    const rb = new RequestBuilder(this.rootUrl, SubscriberUeService.GetSubscriberUePath, 'get');
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
        return r as StrictHttpResponse<SubscriberUe>;
      })
    );
  }

  /**
   * GET /subscriber/ue Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSubscriberUe$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSubscriberUe(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

  }): Observable<SubscriberUe> {

    return this.getSubscriberUe$Response(params).pipe(
      map((r: StrictHttpResponse<SubscriberUe>) => r.body as SubscriberUe)
    );
  }

  /**
   * Path part for operation getSubscriberUeProfiles
   */
  static readonly GetSubscriberUeProfilesPath = '/aether/v2.0.0/{target}/subscriber/ue/{id}/profiles';

  /**
   * GET /subscriber/ue/{id}/profiles Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSubscriberUeProfiles()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSubscriberUeProfiles$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

  }): Observable<StrictHttpResponse<SubscriberUeProfiles>> {

    const rb = new RequestBuilder(this.rootUrl, SubscriberUeService.GetSubscriberUeProfilesPath, 'get');
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
        return r as StrictHttpResponse<SubscriberUeProfiles>;
      })
    );
  }

  /**
   * GET /subscriber/ue/{id}/profiles Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSubscriberUeProfiles$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSubscriberUeProfiles(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

  }): Observable<SubscriberUeProfiles> {

    return this.getSubscriberUeProfiles$Response(params).pipe(
      map((r: StrictHttpResponse<SubscriberUeProfiles>) => r.body as SubscriberUeProfiles)
    );
  }

  /**
   * Path part for operation getSubscriberUeServingPlmn
   */
  static readonly GetSubscriberUeServingPlmnPath = '/aether/v2.0.0/{target}/subscriber/ue/{id}/serving-plmn';

  /**
   * GET /subscriber/ue/{id}/serving-plmn Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSubscriberUeServingPlmn()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSubscriberUeServingPlmn$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

  }): Observable<StrictHttpResponse<SubscriberUeServingPlmn>> {

    const rb = new RequestBuilder(this.rootUrl, SubscriberUeService.GetSubscriberUeServingPlmnPath, 'get');
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
        return r as StrictHttpResponse<SubscriberUeServingPlmn>;
      })
    );
  }

  /**
   * GET /subscriber/ue/{id}/serving-plmn Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSubscriberUeServingPlmn$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSubscriberUeServingPlmn(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

  }): Observable<SubscriberUeServingPlmn> {

    return this.getSubscriberUeServingPlmn$Response(params).pipe(
      map((r: StrictHttpResponse<SubscriberUeServingPlmn>) => r.body as SubscriberUeServingPlmn)
    );
  }

}
