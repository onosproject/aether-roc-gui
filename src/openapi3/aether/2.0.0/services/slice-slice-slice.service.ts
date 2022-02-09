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
import {EnterpriseEnterpriseSiteSliceMbr} from "../models/enterprise-enterprise-site-slice-mbr";


@Injectable({
  providedIn: 'root',
})
export class SliceSliceSliceService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getSliceSliceSliceMbr
   */
  static readonly GetSliceSliceSliceMbrPath = '/aether/v4.0.0/{target}/slice/slice/{id}/slice/mbr';

  /**
   * GET /slice/slice/{id}/slice/mbr.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSliceSliceSliceMbr()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSliceMbr$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<EnterpriseEnterpriseSiteSliceMbr>> {

    const rb = new RequestBuilder(this.rootUrl, SliceSliceSliceService.GetSliceSliceSliceMbrPath, 'get');
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
        return r as StrictHttpResponse<EnterpriseEnterpriseSiteSliceMbr>;
      })
    );
  }

  /**
   * GET /slice/{id}/slice/mbr.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSliceSliceSliceMbr$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSliceMbr(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<EnterpriseEnterpriseSiteSliceMbr> {

    return this.getSliceMbr$Response(params).pipe(
      map((r: StrictHttpResponse<EnterpriseEnterpriseSiteSliceMbr>) => r.body as EnterpriseEnterpriseSiteSliceMbr)
    );
  }

}
