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
import {EnterpriseEnterpriseApplication} from "../models/enterprise-enterprise-application";


@Injectable({
  providedIn: 'root',
})
export class ApplicationApplicationService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getApplicationApplication
   */
  static readonly GetApplicationApplicationPath = '/aether/v2.0.0/{target}/enterprises/enterprise/{ent_id}/application/{id}';

  /**
   * GET /application/application.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getApplicationApplication()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApplicationApplication$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

      /**
       * key {id}
       */
      ent_id: any;
  }): Observable<StrictHttpResponse<EnterpriseEnterpriseApplication>> {
    const rb = new RequestBuilder(this.rootUrl, ApplicationApplicationService.GetApplicationApplicationPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('ent_id', params['ent_id'], {});
      rb.path('id', params['id'], {});
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterpriseEnterpriseApplication>;
      })
    );
  }

  /**
   * GET /application/application.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getApplicationApplication$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApplicationApplication(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

      /**
       * key {id}
       */
      ent_id: any;
  }): Observable<EnterpriseEnterpriseApplication> {
    return this.getApplicationApplication$Response(params).pipe(
      map((r: StrictHttpResponse<EnterpriseEnterpriseApplication>) => r.body as EnterpriseEnterpriseApplication)
    );
  }

}
