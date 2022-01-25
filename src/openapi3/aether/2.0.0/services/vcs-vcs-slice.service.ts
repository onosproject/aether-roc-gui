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
import {EnterpriseEnterpriseSiteVcsFilter} from "../models/enterprise-enterprise-site-vcs-filter";
import {EnterpriseEnterpriseSiteVcsSliceMbr} from "../models/enterprise-enterprise-site-vcs-slice-mbr";


@Injectable({
  providedIn: 'root',
})
export class VcsVcsSliceService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getVcsVcsSliceMbr
   */
  static readonly GetVcsVcsSliceMbrPath = '/aether/v4.0.0/{target}/vcs/vcs/{id}/slice/mbr';

  /**
   * GET /vcs/vcs/{id}/slice/mbr.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getVcsVcsSliceMbr()` instead.
   *
   * This method doesn't expect any request body.
   */
  getVcsVcsSliceMbr$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<StrictHttpResponse<EnterpriseEnterpriseSiteVcsSliceMbr>> {

    const rb = new RequestBuilder(this.rootUrl, VcsVcsSliceService.GetVcsVcsSliceMbrPath, 'get');
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
        return r as StrictHttpResponse<EnterpriseEnterpriseSiteVcsSliceMbr>;
      })
    );
  }

  /**
   * GET /vcs/vcs/{id}/slice/mbr.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getVcsVcsSliceMbr$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getVcsVcsSliceMbr(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {id}
     */
    id: any;
  }): Observable<EnterpriseEnterpriseSiteVcsSliceMbr> {

    return this.getVcsVcsSliceMbr$Response(params).pipe(
      map((r: StrictHttpResponse<EnterpriseEnterpriseSiteVcsSliceMbr>) => r.body as EnterpriseEnterpriseSiteVcsSliceMbr)
    );
  }

}
