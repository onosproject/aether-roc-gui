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
import {EnterpriseEnterpriseTrafficClass} from "../models/enterprise-enterprise-traffic-class";
import {EnterpriseEnterpriseSiteUpf} from "../models/enterprise-enterprise-site-upf";

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
  static readonly GetUpfUpfPath = '/aether/v2.0.0/{target}/enterprises/enterprise/{ent_id}/site/{site_id}/upf/{id}';

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

      /**
       * key {ent-id}
       */
      ent_id: any;

      /**
       * key {ent-id}
       */
      site_id: any;
  }): Observable<StrictHttpResponse<EnterpriseEnterpriseSiteUpf>> {
    console.log(this.rootUrl, UpfUpfService.GetUpfUpfPath, 'get',"this.rootUrl, UpfUpfService.GetUpfUpfPath, 'get'")
    const rb = new RequestBuilder(this.rootUrl, UpfUpfService.GetUpfUpfPath, 'get');
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
        return r as StrictHttpResponse<EnterpriseEnterpriseSiteUpf>;
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

      /**
       * key {ent-id}
       */
      ent_id: any;

      /**
       * key {ent-id}
       */
      site_id: any;
  }): Observable<EnterpriseEnterpriseSiteUpf> {
      debugger
      console.log(this.rootUrl, UpfUpfService.GetUpfUpfPath, 'get',"this.rootUrl, UpfUpfService.GetUpfUpfPath, 'get'")

    return this.getUpfUpf$Response(params).pipe(
      map((r: StrictHttpResponse<EnterpriseEnterpriseSiteUpf>) => r.body as EnterpriseEnterpriseSiteUpf)
    );
  }

}
