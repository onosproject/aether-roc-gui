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

import { TrafficClassTrafficClass } from '../models/traffic-class-traffic-class';

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
  static readonly GetTrafficClassTrafficClassPath = '/aether/v3.0.0/{target}/traffic-class/traffic-class/{id}';

  /**
   * GET /traffic-class/traffic-class Generated from YANG model.
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
  }): Observable<StrictHttpResponse<TrafficClassTrafficClass>> {

    const rb = new RequestBuilder(this.rootUrl, TrafficClassTrafficClassService.GetTrafficClassTrafficClassPath, 'get');
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
        return r as StrictHttpResponse<TrafficClassTrafficClass>;
      })
    );
  }

  /**
   * GET /traffic-class/traffic-class Generated from YANG model.
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
  }): Observable<TrafficClassTrafficClass> {

    return this.getTrafficClassTrafficClass$Response(params).pipe(
      map((r: StrictHttpResponse<TrafficClassTrafficClass>) => r.body as TrafficClassTrafficClass)
    );
  }

}
