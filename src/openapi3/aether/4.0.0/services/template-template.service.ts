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

import { TemplateTemplate } from '../models/template-template';
import { TemplateTemplateSlice } from '../models/template-template-slice';

@Injectable({
  providedIn: 'root',
})
export class TemplateTemplateService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getTemplateTemplate
   */
  static readonly GetTemplateTemplatePath = '/aether/v4.0.0/{target}/template/template/{id}';

  /**
   * GET /template/template.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTemplateTemplate()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTemplateTemplate$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<TemplateTemplate>> {

    const rb = new RequestBuilder(this.rootUrl, TemplateTemplateService.GetTemplateTemplatePath, 'get');
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
        return r as StrictHttpResponse<TemplateTemplate>;
      })
    );
  }

  /**
   * GET /template/template.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTemplateTemplate$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTemplateTemplate(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<TemplateTemplate> {

    return this.getTemplateTemplate$Response(params).pipe(
      map((r: StrictHttpResponse<TemplateTemplate>) => r.body as TemplateTemplate)
    );
  }

  /**
   * Path part for operation getTemplateTemplateSlice
   */
  static readonly GetTemplateTemplateSlicePath = '/aether/v4.0.0/{target}/template/template/{id}/slice';

  /**
   * GET /template/template/{id}/slice.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTemplateTemplateSlice()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTemplateTemplateSlice$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<TemplateTemplateSlice>> {

    const rb = new RequestBuilder(this.rootUrl, TemplateTemplateService.GetTemplateTemplateSlicePath, 'get');
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
        return r as StrictHttpResponse<TemplateTemplateSlice>;
      })
    );
  }

  /**
   * GET /template/template/{id}/slice.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTemplateTemplateSlice$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTemplateTemplateSlice(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<TemplateTemplateSlice> {

    return this.getTemplateTemplateSlice$Response(params).pipe(
      map((r: StrictHttpResponse<TemplateTemplateSlice>) => r.body as TemplateTemplateSlice)
    );
  }

}
