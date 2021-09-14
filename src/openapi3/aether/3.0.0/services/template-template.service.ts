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

import { TemplateTemplate } from '../models/template-template';

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
  static readonly GetTemplateTemplatePath = '/aether/v3.0.0/{target}/template/template/{id}';

  /**
   * GET /template/template Generated from YANG model.
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
   * GET /template/template Generated from YANG model.
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

}
