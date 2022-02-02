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
import {EnterpriseEnterpriseSiteSlice} from "../models/enterprise-enterprise-site-slice";

@Injectable({
  providedIn: 'root',
})
export class SliceSliceService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getSliceSlice
   */
  static readonly GetSliceSlicePath = '/aether/v2.0.0/{target}/enterprises/enterprise/{ent_id}/site/{site_id}/slice/{id}';

  /**
   * GET /slice/slice.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSliceSlice()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSliceSlice$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

      /**
       * key {ent-id}
       */
      ent_id: any;

      /**
       * key {ent-id}
       */
      site_id: any;
  }): Observable<StrictHttpResponse<EnterpriseEnterpriseSiteSlice>> {

    const rb = new RequestBuilder(this.rootUrl, SliceSliceService.GetSliceSlicePath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
        rb.path('ent_id', params['ent_id'], {});
        rb.path('site_id', params['site_id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterpriseEnterpriseSiteSlice>;
      })
    );
  }

  /**
   * GET /slice/slice.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSliceSlice$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSliceSlice(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

      /**
       * key {ent-id}
       */
      ent_id: any;

      /**
       * key {ent-id}
       */
      site_id: any;
  }): Observable<EnterpriseEnterpriseSiteSlice> {

    return this.getSliceSlice$Response(params).pipe(
      map((r: StrictHttpResponse<EnterpriseEnterpriseSiteSlice>) => r.body as EnterpriseEnterpriseSiteSlice)
    );
  }

  /**
   * Path part for operation getSliceSliceSlice
   */
  static readonly GetSliceSliceSlicePath = '/aether/v4.0.0/{target}/slice/slice/{id}/slice';

  /**
   * GET /slice/slice/{id}/slice.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSliceSliceSlice()` instead.
   *
   * This method doesn't expect any request body.
   */
  // getSliceSliceSlice$Response(params: {
  //
  //   /**
  //    * target (device in onos-config)
  //    */
  //   target: any;
  //
  //   /**
  //    * key {id}
  //    */
  //   id: any;
  // }): Observable<StrictHttpResponse<EnterpriseEnterpriseSiteSliceSlice>> {
  //
  //   const rb = new RequestBuilder(this.rootUrl, SliceSliceService.GetSliceSliceSlicePath, 'get');
  //   if (params) {
  //     rb.path('target', params.target, {});
  //     rb.path('id', params.id, {});
  //   }
  //
  //   return this.http.request(rb.build({
  //     responseType: 'json',
  //     accept: 'application/json'
  //   })).pipe(
  //     filter((r: any) => r instanceof HttpResponse),
  //     map((r: HttpResponse<any>) => {
  //       return r as StrictHttpResponse<EnterpriseEnterpriseSiteSliceSlice>;
  //     })
  //   );
  // }

  /**
   * GET /slice/slice/{id}/slice.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSliceSliceSlice$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  // getSliceSliceSlice(params: {
  //
  //   /**
  //    * target (device in onos-config)
  //    */
  //   target: any;
  //
  //   /**
  //    * key {id}
  //    */
  //   id: any;
  // }): Observable<EnterpriseEnterpriseSiteSliceSlice> {
  //
  //   return this.getSliceSliceSlice$Response(params).pipe(
  //     map((r: StrictHttpResponse<EnterpriseEnterpriseSiteSliceSlice>) => r.body as EnterpriseEnterpriseSiteSliceSlice)
  //   );
  // }

}
