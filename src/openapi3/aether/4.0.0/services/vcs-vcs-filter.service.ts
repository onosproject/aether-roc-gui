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

import { VcsVcsFilter } from '../models/vcs-vcs-filter';

@Injectable({
  providedIn: 'root',
})
export class VcsVcsFilterService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getVcsVcsFilter
   */
  static readonly GetVcsVcsFilterPath = '/aether/v4.0.0/{target}/vcs/vcs/{id}/filter/{application}';

  /**
   * GET /vcs/vcs/{id}/filter.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getVcsVcsFilter()` instead.
   *
   * This method doesn't expect any request body.
   */
  getVcsVcsFilter$Response(params: {

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
  }): Observable<StrictHttpResponse<VcsVcsFilter>> {

    const rb = new RequestBuilder(this.rootUrl, VcsVcsFilterService.GetVcsVcsFilterPath, 'get');
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
        return r as StrictHttpResponse<VcsVcsFilter>;
      })
    );
  }

  /**
   * GET /vcs/vcs/{id}/filter.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getVcsVcsFilter$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getVcsVcsFilter(params: {

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
  }): Observable<VcsVcsFilter> {

    return this.getVcsVcsFilter$Response(params).pipe(
      map((r: StrictHttpResponse<VcsVcsFilter>) => r.body as VcsVcsFilter)
    );
  }

}
