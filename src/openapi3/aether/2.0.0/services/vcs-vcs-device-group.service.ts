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
import {EnterpriseEnterpriseSiteVcsSlice} from "../models/enterprise-enterprise-site-vcs-slice";
import {EnterpriseEnterpriseSiteVcsDeviceGroup} from "../models/enterprise-enterprise-site-vcs-device-group";


@Injectable({
  providedIn: 'root',
})
export class VcsVcsDeviceGroupService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getVcsVcsDeviceGroup
   */
  static readonly GetVcsVcsDeviceGroupPath = '/aether/v4.0.0/{target}/vcs/vcs/{id}/device-group/{device-group}';

  /**
   * GET /vcs/vcs/{id}/device-group.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getVcsVcsDeviceGroup()` instead.
   *
   * This method doesn't expect any request body.
   */
  getVcsVcsDeviceGroup$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {device-group}
     */
    'device-group': any;
  }): Observable<StrictHttpResponse<EnterpriseEnterpriseSiteVcsDeviceGroup>> {

    const rb = new RequestBuilder(this.rootUrl, VcsVcsDeviceGroupService.GetVcsVcsDeviceGroupPath, 'get');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('id', params.id, {});
      rb.path('device-group', params['device-group'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EnterpriseEnterpriseSiteVcsDeviceGroup>;
      })
    );
  }

  /**
   * GET /vcs/vcs/{id}/device-group.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getVcsVcsDeviceGroup$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getVcsVcsDeviceGroup(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;

    /**
     * key {device-group}
     */
    'device-group': any;
  }): Observable<EnterpriseEnterpriseSiteVcsDeviceGroup> {

    return this.getVcsVcsDeviceGroup$Response(params).pipe(
      map((r: StrictHttpResponse<EnterpriseEnterpriseSiteVcsDeviceGroup>) => r.body as EnterpriseEnterpriseSiteVcsDeviceGroup)
    );
  }

}
