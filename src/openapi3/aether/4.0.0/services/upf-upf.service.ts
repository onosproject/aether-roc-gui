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

import { UpfUpf } from '../models/upf-upf';

@Injectable({
  providedIn: 'root',
})
export class UpfUpfService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getUpfUpf
   */
  static readonly GetUpfUpfPath = '/aether/v4.0.0/{target}/upf/upf/{id}';

  /**
   * GET /upf/upf.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUpfUpf()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUpfUpf$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<UpfUpf>> {

    const rb = new RequestBuilder(this.rootUrl, UpfUpfService.GetUpfUpfPath, 'get');
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
        return r as StrictHttpResponse<UpfUpf>;
      })
    );
  }

  /**
   * GET /upf/upf.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getUpfUpf$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUpfUpf(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<UpfUpf> {

    return this.getUpfUpf$Response(params).pipe(
      map((r: StrictHttpResponse<UpfUpf>) => r.body as UpfUpf)
    );
  }

}
