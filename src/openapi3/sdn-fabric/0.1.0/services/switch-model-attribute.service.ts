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

import { SwitchModelAttribute } from '../models/switch-model-attribute';
import { SwitchModelAttributeList } from '../models/switch-model-attribute-list';

@Injectable({
  providedIn: 'root',
})
export class SwitchModelAttributeService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getSwitchModelAttributeList
   */
  static readonly GetSwitchModelAttributeListPath = '/sdn-fabric/v0.1.x/{fabric-id}/switch-model/{switch-model-id}/attribute';

  /**
   * GET /switch-model/{switch-model-id}/attribute List.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSwitchModelAttributeList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSwitchModelAttributeList$Response(params: {

    /**
     * fabric-id (target in onos-config)
     */
    'fabric-id': any;

    /**
     * key {switch-model-id}
     */
    'switch-model-id': any;
  }): Observable<StrictHttpResponse<SwitchModelAttributeList>> {

    const rb = new RequestBuilder(this.rootUrl, SwitchModelAttributeService.GetSwitchModelAttributeListPath, 'get');
    if (params) {
      rb.path('fabric-id', params['fabric-id'], {});
      rb.path('switch-model-id', params['switch-model-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SwitchModelAttributeList>;
      })
    );
  }

  /**
   * GET /switch-model/{switch-model-id}/attribute List.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSwitchModelAttributeList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSwitchModelAttributeList(params: {

    /**
     * fabric-id (target in onos-config)
     */
    'fabric-id': any;

    /**
     * key {switch-model-id}
     */
    'switch-model-id': any;
  }): Observable<SwitchModelAttributeList> {

    return this.getSwitchModelAttributeList$Response(params).pipe(
      map((r: StrictHttpResponse<SwitchModelAttributeList>) => r.body as SwitchModelAttributeList)
    );
  }

  /**
   * Path part for operation getSwitchModelAttribute
   */
  static readonly GetSwitchModelAttributePath = '/sdn-fabric/v0.1.x/{fabric-id}/switch-model/{switch-model-id}/attribute/{attribute-key}';

  /**
   * GET /switch-model/{switch-model-id}/attribute Container.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSwitchModelAttribute()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSwitchModelAttribute$Response(params: {

    /**
     * fabric-id (target in onos-config)
     */
    'fabric-id': any;

    /**
     * key {switch-model-id}
     */
    'switch-model-id': any;

    /**
     * key {attribute-key}
     */
    'attribute-key': any;
  }): Observable<StrictHttpResponse<SwitchModelAttribute>> {

    const rb = new RequestBuilder(this.rootUrl, SwitchModelAttributeService.GetSwitchModelAttributePath, 'get');
    if (params) {
      rb.path('fabric-id', params['fabric-id'], {});
      rb.path('switch-model-id', params['switch-model-id'], {});
      rb.path('attribute-key', params['attribute-key'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SwitchModelAttribute>;
      })
    );
  }

  /**
   * GET /switch-model/{switch-model-id}/attribute Container.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSwitchModelAttribute$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSwitchModelAttribute(params: {

    /**
     * fabric-id (target in onos-config)
     */
    'fabric-id': any;

    /**
     * key {switch-model-id}
     */
    'switch-model-id': any;

    /**
     * key {attribute-key}
     */
    'attribute-key': any;
  }): Observable<SwitchModelAttribute> {

    return this.getSwitchModelAttribute$Response(params).pipe(
      map((r: StrictHttpResponse<SwitchModelAttribute>) => r.body as SwitchModelAttribute)
    );
  }

}
