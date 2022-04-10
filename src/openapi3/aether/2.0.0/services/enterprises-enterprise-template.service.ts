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

import { EnterprisesEnterpriseTemplate } from '../models/enterprises-enterprise-template';
import { EnterprisesEnterpriseTemplateList } from '../models/enterprises-enterprise-template-list';
import { EnterprisesEnterpriseTemplateMbr } from '../models/enterprises-enterprise-template-mbr';

@Injectable({
  providedIn: 'root',
})
export class EnterprisesEnterpriseTemplateService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getEnterprisesEnterpriseTemplateList
   */
  static readonly GetEnterprisesEnterpriseTemplateListPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/template';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/template List.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseTemplateList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseTemplateList$Response(params: {

    /**
     * target (target in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseTemplateList>> {

    const rb = new RequestBuilder(this.rootUrl, EnterprisesEnterpriseTemplateService.GetEnterprisesEnterpriseTemplateListPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterprisesEnterpriseTemplateList>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/template List.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseTemplateList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseTemplateList(params: {

    /**
     * target (target in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;
  }): Observable<EnterprisesEnterpriseTemplateList> {

    return this.getEnterprisesEnterpriseTemplateList$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseTemplateList>) => r.body as EnterprisesEnterpriseTemplateList)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseTemplate
   */
  static readonly GetEnterprisesEnterpriseTemplatePath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/template/{template-id}';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/template Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseTemplate()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseTemplate$Response(params: {

    /**
     * target (target in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {template-id}
     */
    'template-id': any;
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseTemplate>> {

    const rb = new RequestBuilder(this.rootUrl, EnterprisesEnterpriseTemplateService.GetEnterprisesEnterpriseTemplatePath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('template-id', params['template-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterprisesEnterpriseTemplate>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/template Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseTemplate$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseTemplate(params: {

    /**
     * target (target in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {template-id}
     */
    'template-id': any;
  }): Observable<EnterprisesEnterpriseTemplate> {

    return this.getEnterprisesEnterpriseTemplate$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseTemplate>) => r.body as EnterprisesEnterpriseTemplate)
    );
  }

  /**
   * Path part for operation getEnterprisesEnterpriseTemplateMbr
   */
  static readonly GetEnterprisesEnterpriseTemplateMbrPath = '/aether/v2.0.x/{target}/enterprises/enterprise/{enterprise-id}/template/{template-id}/mbr';

  /**
   * GET /enterprises/enterprise/{enterprise-id}/template/{template-id}/mbr Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnterprisesEnterpriseTemplateMbr()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseTemplateMbr$Response(params: {

    /**
     * target (target in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {template-id}
     */
    'template-id': any;
  }): Observable<StrictHttpResponse<EnterprisesEnterpriseTemplateMbr>> {

    const rb = new RequestBuilder(this.rootUrl, EnterprisesEnterpriseTemplateService.GetEnterprisesEnterpriseTemplateMbrPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('enterprise-id', params['enterprise-id'], {});
      rb.path('template-id', params['template-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterprisesEnterpriseTemplateMbr>;
      })
    );
  }

  /**
   * GET /enterprises/enterprise/{enterprise-id}/template/{template-id}/mbr Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEnterprisesEnterpriseTemplateMbr$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnterprisesEnterpriseTemplateMbr(params: {

    /**
     * target (target in onos-config)
     */
    target: any;

    /**
     * key {enterprise-id}
     */
    'enterprise-id': any;

    /**
     * key {template-id}
     */
    'template-id': any;
  }): Observable<EnterprisesEnterpriseTemplateMbr> {

    return this.getEnterprisesEnterpriseTemplateMbr$Response(params).pipe(
      map((r: StrictHttpResponse<EnterprisesEnterpriseTemplateMbr>) => r.body as EnterprisesEnterpriseTemplateMbr)
    );
  }

}
