// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { VcsVcsApplication } from '../models/vcs-vcs-application';

@Injectable({
  providedIn: 'root',
})
export class VcsVcsApplicationService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getVcsVcsApplication
   */
  static readonly GetVcsVcsApplicationPath = '/aether/v3.0.0/{target}/vcs/vcs/{id}/application/{application}';

  /**
   * GET /vcs/vcs/{id}/application.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getVcsVcsApplication()` instead.
   *
   * This method doesn't expect any request body.
   */
  getVcsVcsApplication$Response(params: {

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
  }): Observable<StrictHttpResponse<VcsVcsApplication>> {

    const rb = new RequestBuilder(this.rootUrl, VcsVcsApplicationService.GetVcsVcsApplicationPath, 'get');
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
        return r as StrictHttpResponse<VcsVcsApplication>;
      })
    );
  }

  /**
   * GET /vcs/vcs/{id}/application.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getVcsVcsApplication$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getVcsVcsApplication(params: {

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
  }): Observable<VcsVcsApplication> {

    return this.getVcsVcsApplication$Response(params).pipe(
      map((r: StrictHttpResponse<VcsVcsApplication>) => r.body as VcsVcsApplication)
    );
  }

}
