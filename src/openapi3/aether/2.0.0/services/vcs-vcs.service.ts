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
import {EnterpriseEnterpriseSiteUpf} from "../models/enterprise-enterprise-site-upf";
import {EnterpriseEnterpriseSiteVcs} from "../models/enterprise-enterprise-site-vcs";
import {EnterpriseEnterpriseSiteVcsSlice} from "../models/enterprise-enterprise-site-vcs-slice";

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
  static readonly GetVcsVcsPath = '/aether/v2.0.0/{target}/enterprises/enterprise/{ent_id}/site/{site_id}/vcs/{id}';

  /**
   * GET /vcs/vcs.
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

      /**
       * key {ent-id}
       */
      ent_id: any;

      /**
       * key {ent-id}
       */
      site_id: any;
  }): Observable<StrictHttpResponse<EnterpriseEnterpriseSiteVcs>> {

    const rb = new RequestBuilder(this.rootUrl, VcsVcsService.GetVcsVcsPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
        rb.path('ent_id', params['ent_id'], {});
        rb.path('site_id', params['site_id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterpriseEnterpriseSiteVcs>;
      })
    );
  }

  /**
   * GET /vcs/vcs.
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

      /**
       * key {ent-id}
       */
      ent_id: any;

      /**
       * key {ent-id}
       */
      site_id: any;
  }): Observable<EnterpriseEnterpriseSiteVcs> {

    return this.getVcsVcs$Response(params).pipe(
      map((r: StrictHttpResponse<EnterpriseEnterpriseSiteVcs>) => r.body as EnterpriseEnterpriseSiteVcs)
    );
  }

  /**
   * Path part for operation getVcsVcsSlice
   */
  static readonly GetVcsVcsSlicePath = '/aether/v4.0.0/{target}/vcs/vcs/{id}/slice';

  /**
   * GET /vcs/vcs/{id}/slice.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getVcsVcsSlice()` instead.
   *
   * This method doesn't expect any request body.
   */
  getVcsVcsSlice$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<EnterpriseEnterpriseSiteVcsSlice>> {

    const rb = new RequestBuilder(this.rootUrl, VcsVcsService.GetVcsVcsSlicePath, 'get');
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
        return r as StrictHttpResponse<EnterpriseEnterpriseSiteVcsSlice>;
      })
    );
  }

  /**
   * GET /vcs/vcs/{id}/slice.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getVcsVcsSlice$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getVcsVcsSlice(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<EnterpriseEnterpriseSiteVcsSlice> {

    return this.getVcsVcsSlice$Response(params).pipe(
      map((r: StrictHttpResponse<EnterpriseEnterpriseSiteVcsSlice>) => r.body as EnterpriseEnterpriseSiteVcsSlice)
    );
  }

}
