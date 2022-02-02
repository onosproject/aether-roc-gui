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


@Injectable({
  providedIn: 'root',
})
export class TrafficClassTrafficClassService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getTrafficClassTrafficClass
   */
  static readonly GetTrafficClassTrafficClassPath = '/aether/v2.0.0/{target}/enterprises/enterprise/{ent_id}/traffic-class/{id}';

  /**
   * GET /traffic-class/traffic-class.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTrafficClassTrafficClass()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTrafficClassTrafficClass$Response(params: {

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
  }): Observable<StrictHttpResponse<EnterpriseEnterpriseTrafficClass>> {

    const rb = new RequestBuilder(this.rootUrl, TrafficClassTrafficClassService.GetTrafficClassTrafficClassPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
        rb.path('ent_id', params['ent_id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterpriseEnterpriseTrafficClass>;
      })
    );
  }

  /**
   * GET /traffic-class/traffic-class.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTrafficClassTrafficClass$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTrafficClassTrafficClass(params: {

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
  }): Observable<EnterpriseEnterpriseTrafficClass> {

    return this.getTrafficClassTrafficClass$Response(params).pipe(
      map((r: StrictHttpResponse<EnterpriseEnterpriseTrafficClass>) => r.body as EnterpriseEnterpriseTrafficClass)
    );
  }

}
