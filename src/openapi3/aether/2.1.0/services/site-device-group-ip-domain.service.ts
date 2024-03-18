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
export class SiteDeviceGroupIpDomainService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getSiteDeviceGroupIpDomainValuesLeafref
   */
  static readonly GetSiteDeviceGroupIpDomainValuesLeafrefPath = '/aether/v2.1.x/{enterprise-id}/site/{site-id}/device-group/{device-group-id}/ip-domain/values';

  /**
   * GET /site/{site-id}/device-group/{device-group-id}/ip-domain/values Leafref.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSiteDeviceGroupIpDomainValuesLeafref()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSiteDeviceGroupIpDomainValuesLeafref$Response(params: {

    /**
     * enterprise-id (target in onos-config)
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {device-group-id}
     */
    'device-group-id': any;
  }): Observable<StrictHttpResponse<LeafRefOptions>> {

    const rb = new RequestBuilder(this.rootUrl, SiteDeviceGroupIpDomainService.GetSiteDeviceGroupIpDomainValuesLeafrefPath, 'get');
    if (params) {
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('site-id', params['site-id'], {});
      rb.path('device-group-id', params['device-group-id'], {});
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
   * GET /site/{site-id}/device-group/{device-group-id}/ip-domain/values Leafref.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSiteDeviceGroupIpDomainValuesLeafref$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSiteDeviceGroupIpDomainValuesLeafref(params: {

    /**
     * enterprise-id (target in onos-config)
     */
    'enterprise-id': any;

    /**
     * key {site-id}
     */
    'site-id': any;

    /**
     * key {device-group-id}
     */
    'device-group-id': any;
  }): Observable<LeafRefOptions> {

    return this.getSiteDeviceGroupIpDomainValuesLeafref$Response(params).pipe(
      map((r: StrictHttpResponse<LeafRefOptions>) => r.body as LeafRefOptions)
    );
  }

}