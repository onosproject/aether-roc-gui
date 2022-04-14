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

import { Template } from '../models/template';
import { TemplateList } from '../models/template-list';
import { TemplateMbr } from '../models/template-mbr';

@Injectable({
  providedIn: 'root',
})
export class TemplateService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getTemplateList
   */
  static readonly GetTemplateListPath = '/aether/v2.1.x/{enterprise-id}/template';

  /**
   * GET /template List.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTemplateList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTemplateList$Response(params: {

    /**
     * enterprise-id (target in onos-config)
     */
    'enterprise-id': any;
  }): Observable<StrictHttpResponse<TemplateList>> {

    const rb = new RequestBuilder(this.rootUrl, TemplateService.GetTemplateListPath, 'get');
    if (params) {
      rb.path('enterprise-id', params['enterprise-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TemplateList>;
      })
    );
  }

  /**
   * GET /template List.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTemplateList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTemplateList(params: {

    /**
     * enterprise-id (target in onos-config)
     */
    'enterprise-id': any;
  }): Observable<TemplateList> {

    return this.getTemplateList$Response(params).pipe(
      map((r: StrictHttpResponse<TemplateList>) => r.body as TemplateList)
    );
  }

  /**
   * Path part for operation getTemplate
   */
  static readonly GetTemplatePath = '/aether/v2.1.x/{enterprise-id}/template/{template-id}';

  /**
   * GET /template Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTemplate()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTemplate$Response(params: {

    /**
     * enterprise-id (target in onos-config)
     */
    'enterprise-id': any;

    /**
     * key {template-id}
     */
    'template-id': any;
  }): Observable<StrictHttpResponse<Template>> {

    const rb = new RequestBuilder(this.rootUrl, TemplateService.GetTemplatePath, 'get');
    if (params) {
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('template-id', params['template-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Template>;
      })
    );
  }

  /**
   * GET /template Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTemplate$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTemplate(params: {

    /**
     * enterprise-id (target in onos-config)
     */
    'enterprise-id': any;

    /**
     * key {template-id}
     */
    'template-id': any;
  }): Observable<Template> {

    return this.getTemplate$Response(params).pipe(
      map((r: StrictHttpResponse<Template>) => r.body as Template)
    );
  }

  /**
   * Path part for operation getTemplateMbr
   */
  static readonly GetTemplateMbrPath = '/aether/v2.1.x/{enterprise-id}/template/{template-id}/mbr';

  /**
   * GET /template/{template-id}/mbr Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTemplateMbr()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTemplateMbr$Response(params: {

    /**
     * enterprise-id (target in onos-config)
     */
    'enterprise-id': any;

    /**
     * key {template-id}
     */
    'template-id': any;
  }): Observable<StrictHttpResponse<TemplateMbr>> {

    const rb = new RequestBuilder(this.rootUrl, TemplateService.GetTemplateMbrPath, 'get');
    if (params) {
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('template-id', params['template-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TemplateMbr>;
      })
    );
  }

  /**
   * GET /template/{template-id}/mbr Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTemplateMbr$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTemplateMbr(params: {

    /**
     * enterprise-id (target in onos-config)
     */
    'enterprise-id': any;

    /**
     * key {template-id}
     */
    'template-id': any;
  }): Observable<TemplateMbr> {

    return this.getTemplateMbr$Response(params).pipe(
      map((r: StrictHttpResponse<TemplateMbr>) => r.body as TemplateMbr)
    );
  }

}
