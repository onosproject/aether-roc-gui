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
import {EnterpriseEnterpriseSiteSliceDeviceGroup} from "../models/enterprise-enterprise-site-slice-device-group";
import {EnterpriseEnterpriseSiteSliceFilter} from "../models/enterprise-enterprise-site-slice-filter";


@Injectable({
  providedIn: 'root',
})
export class SliceSliceFilterService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getSliceSliceFilter
   */
  static readonly GetSliceSliceFilterPath = '/aether/v4.0.0/{target}/slice/slice/{id}/filter/{application}';

  /**
   * GET /slice/slice/{id}/filter.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSliceSliceFilter()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSliceSliceFilter$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {application}
     */
    application: any;
  }): Observable<StrictHttpResponse<EnterpriseEnterpriseSiteSliceFilter>> {

    const rb = new RequestBuilder(this.rootUrl, SliceSliceFilterService.GetSliceSliceFilterPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
      rb.path('application', params.application, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterpriseEnterpriseSiteSliceFilter>;
      })
    );
  }

  /**
   * GET /slice/slice/{id}/filter.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSliceSliceFilter$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSliceSliceFilter(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {application}
     */
    application: any;
  }): Observable<EnterpriseEnterpriseSiteSliceFilter> {

    return this.getSliceSliceFilter$Response(params).pipe(
      map((r: StrictHttpResponse<EnterpriseEnterpriseSiteSliceFilter>) => r.body as EnterpriseEnterpriseSiteSliceFilter)
    );
  }

}
