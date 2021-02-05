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

import { PatchBody } from '../models/patch-body';

@Injectable({
  providedIn: 'root',
})
export class ApiService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation patchTopLevel
   */
  static readonly PatchTopLevelPath = '/aether-roc-api';

  /**
   * PATCH at the top level of aether-roc-api.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `patchTopLevel()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  patchTopLevel$Response(params?: {
    body?: PatchBody
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PatchTopLevelPath, 'patch');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * PATCH at the top level of aether-roc-api.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `patchTopLevel$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  patchTopLevel(params?: {
    body?: PatchBody
  }): Observable<void> {

    return this.patchTopLevel$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
