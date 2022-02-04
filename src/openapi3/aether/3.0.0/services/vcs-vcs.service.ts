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

import { VcsVcs } from '../models/vcs-vcs';

@Injectable({
  providedIn: 'root',
})
export class VcsVcsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getVcsVcs
   */
  static readonly GetVcsVcsPath = '/aether/v3.0.0/{target}/slice/slice/{id}';

  /**
   * GET /slice/slice.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getVcsVcs()` instead.
   *
   * This method doesn't expect any request body.
   */
  getVcsVcs$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<VcsVcs>> {

    const rb = new RequestBuilder(this.rootUrl, VcsVcsService.GetVcsVcsPath, 'get');
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
        return r as StrictHttpResponse<VcsVcs>;
      })
    );
  }

  /**
   * GET /slice/slice.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getVcsVcs$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getVcsVcs(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<VcsVcs> {

    return this.getVcsVcs$Response(params).pipe(
      map((r: StrictHttpResponse<VcsVcs>) => r.body as VcsVcs)
    );
  }

}
