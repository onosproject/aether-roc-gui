// Code generated by openapi-gen. DO NOT EDIT.
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

import { LeafRefOptions } from '../models/leaf-ref-options';

@Injectable({
  providedIn: 'root',
})
export class SiteSliceUpfService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getSiteSliceUpfValuesLeafref
   */
  static readonly GetSiteSliceUpfValuesLeafrefPath = '/aether/v2.1.x/{enterprise-id}/site/{site-id}/slice/{slice-id}/upf/values';

  /**
   * GET /site/{site-id}/slice/{slice-id}/upf/values Leafref.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSiteSliceUpfValuesLeafref()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSiteSliceUpfValuesLeafref$Response(params: {

    /**
     * enterprise-id (target in onos-config)
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {slice-id}
     */
    'slice-id': any;
  }): Observable<StrictHttpResponse<LeafRefOptions>> {

    const rb = new RequestBuilder(this.rootUrl, SiteSliceUpfService.GetSiteSliceUpfValuesLeafrefPath, 'get');
    if (params) {
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.path('slice-id', params['slice-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<LeafRefOptions>;
      })
    );
  }

  /**
   * GET /site/{site-id}/slice/{slice-id}/upf/values Leafref.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSiteSliceUpfValuesLeafref$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSiteSliceUpfValuesLeafref(params: {

    /**
     * enterprise-id (target in onos-config)
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {slice-id}
     */
    'slice-id': any;
  }): Observable<LeafRefOptions> {

    return this.getSiteSliceUpfValuesLeafref$Response(params).pipe(
      map((r: StrictHttpResponse<LeafRefOptions>) => r.body as LeafRefOptions)
    );
  }

}
