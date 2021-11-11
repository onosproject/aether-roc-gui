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

import { TemplateTemplateSliceMbr } from '../models/template-template-slice-mbr';

@Injectable({
  providedIn: 'root',
})
export class TemplateTemplateSliceService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getTemplateTemplateSliceMbr
   */
  static readonly GetTemplateTemplateSliceMbrPath = '/aether/v4.0.0/{target}/template/template/{id}/slice/mbr';

  /**
   * GET /template/template/{id}/slice/mbr.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTemplateTemplateSliceMbr()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTemplateTemplateSliceMbr$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<TemplateTemplateSliceMbr>> {

    const rb = new RequestBuilder(this.rootUrl, TemplateTemplateSliceService.GetTemplateTemplateSliceMbrPath, 'get');
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
        return r as StrictHttpResponse<TemplateTemplateSliceMbr>;
      })
    );
  }

  /**
   * GET /template/template/{id}/slice/mbr.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTemplateTemplateSliceMbr$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTemplateTemplateSliceMbr(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<TemplateTemplateSliceMbr> {

    return this.getTemplateTemplateSliceMbr$Response(params).pipe(
      map((r: StrictHttpResponse<TemplateTemplateSliceMbr>) => r.body as TemplateTemplateSliceMbr)
    );
  }

}
