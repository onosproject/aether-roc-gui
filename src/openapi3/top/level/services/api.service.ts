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
import { TargetsNames } from '../models/targets-names';

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

  /**
   * Path part for operation targetsTopLevel
   */
  static readonly TargetsTopLevelPath = '/targets';

  /**
   * GET /targets A list of just target names.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `targetsTopLevel()` instead.
   *
   * This method doesn't expect any request body.
   */
  targetsTopLevel$Response(params?: {
  }): Observable<StrictHttpResponse<TargetsNames>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.TargetsTopLevelPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TargetsNames>;
      })
    );
  }

  /**
   * GET /targets A list of just target names.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `targetsTopLevel$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  targetsTopLevel(params?: {
  }): Observable<TargetsNames> {

    return this.targetsTopLevel$Response(params).pipe(
      map((r: StrictHttpResponse<TargetsNames>) => r.body as TargetsNames)
    );
  }

  /**
   * Path part for operation sdcorePushConfigTopLevel
   */
  static readonly SdcorePushConfigTopLevelPath = '/sdcore/synchronize/{service}';

  /**
   * POST /sdcore/synchronize/{service}.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sdcorePushConfigTopLevel()` instead.
   *
   * This method doesn't expect any request body.
   */
  sdcorePushConfigTopLevel$Response(params: {

    /**
     * sdcore service name e.g. sdcore-adapter-v4
     */
    service: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.SdcorePushConfigTopLevelPath, 'post');
    if (params) {
      rb.path('service', params.service, {});
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
   * POST /sdcore/synchronize/{service}.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `sdcorePushConfigTopLevel$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  sdcorePushConfigTopLevel(params: {

    /**
     * sdcore service name e.g. sdcore-adapter-v4
     */
    service: any;
  }): Observable<void> {

    return this.sdcorePushConfigTopLevel$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation specTopLevel
   */
  static readonly SpecTopLevelPath = '/spec';

  /**
   * GET /spec The Top Level Spec in YAML format. Same as aether-top-level-openapi3.yaml.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `specTopLevel()` instead.
   *
   * This method doesn't expect any request body.
   */
  specTopLevel$Response(params?: {
  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.SpecTopLevelPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: 'application/yaml'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * GET /spec The Top Level Spec in YAML format. Same as aether-top-level-openapi3.yaml.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `specTopLevel$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  specTopLevel(params?: {
  }): Observable<string> {

    return this.specTopLevel$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation specAether200
   */
  static readonly SpecAether200Path = '/spec/aether-2.0.0-openapi3.yaml';

  /**
   * GET /spec/aether-2.0.0-openapi3.yaml The Aether 2.0.0 spec.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `specAether200()` instead.
   *
   * This method doesn't expect any request body.
   */
  specAether200$Response(params?: {
  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.SpecAether200Path, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: 'application/yaml'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * GET /spec/aether-2.0.0-openapi3.yaml The Aether 2.0.0 spec.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `specAether200$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  specAether200(params?: {
  }): Observable<string> {

    return this.specAether200$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation specAether400
   */
  static readonly SpecAether400Path = '/spec/aether-4.0.0-openapi3.yaml';

  /**
   * GET /spec/aether-4.0.0-openapi3.yaml The Aether 4.0.0 spec.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `specAether400()` instead.
   *
   * This method doesn't expect any request body.
   */
  specAether400$Response(params?: {
  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.SpecAether400Path, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: 'application/yaml'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * GET /spec/aether-4.0.0-openapi3.yaml The Aether 4.0.0 spec.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `specAether400$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  specAether400(params?: {
  }): Observable<string> {

    return this.specAether400$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation specAetherAppGtwy
   */
  static readonly SpecAetherAppGtwyPath = '/spec/aether-app-gtwy-openapi3.yaml';

  /**
   * GET /spec/aether-app-gtwy-openapi3.yaml The Aether Application Gateway spec.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `specAetherAppGtwy()` instead.
   *
   * This method doesn't expect any request body.
   */
  specAetherAppGtwy$Response(params?: {
  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.SpecAetherAppGtwyPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: 'application/yaml'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * GET /spec/aether-app-gtwy-openapi3.yaml The Aether Application Gateway spec.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `specAetherAppGtwy$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  specAetherAppGtwy(params?: {
  }): Observable<string> {

    return this.specAetherAppGtwy$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

}
