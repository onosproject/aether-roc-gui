// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { RbacV100TargetRbacGroup } from '../models/rbac-v-100-target-rbac-group';
import { RbacV100TargetRbacRole } from '../models/rbac-v-100-target-rbac-role';

@Injectable({
  providedIn: 'root',
})
export class RbacV100TargetRbacService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getRbacV100TargetRbacGroup
   */
  static readonly GetRbacV100TargetRbacGroupPath = '/rbac/v1.0.0/{target}/rbac/group/{groupid}';

  /**
   * GET /rbac/v1.0.0/{target}/rbac/group Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getRbacV100TargetRbacGroup()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRbacV100TargetRbacGroup$Response(params: {

    /**
     * key for group
     */
    groupid: any;

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<StrictHttpResponse<RbacV100TargetRbacGroup>> {

    const rb = new RequestBuilder(this.rootUrl, RbacV100TargetRbacService.GetRbacV100TargetRbacGroupPath, 'get');
    if (params) {

      rb.path('groupid', params.groupid, {});
      rb.path('target', params.target, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RbacV100TargetRbacGroup>;
      })
    );
  }

  /**
   * GET /rbac/v1.0.0/{target}/rbac/group Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getRbacV100TargetRbacGroup$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRbacV100TargetRbacGroup(params: {

    /**
     * key for group
     */
    groupid: any;

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<RbacV100TargetRbacGroup> {

    return this.getRbacV100TargetRbacGroup$Response(params).pipe(
      map((r: StrictHttpResponse<RbacV100TargetRbacGroup>) => r.body as RbacV100TargetRbacGroup)
    );
  }

  /**
   * Path part for operation getRbacV100TargetRbacRole
   */
  static readonly GetRbacV100TargetRbacRolePath = '/rbac/v1.0.0/{target}/rbac/role/{roleid}';

  /**
   * GET /rbac/v1.0.0/{target}/rbac/role Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getRbacV100TargetRbacRole()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRbacV100TargetRbacRole$Response(params: {

    /**
     * key for role
     */
    roleid: any;

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<StrictHttpResponse<RbacV100TargetRbacRole>> {

    const rb = new RequestBuilder(this.rootUrl, RbacV100TargetRbacService.GetRbacV100TargetRbacRolePath, 'get');
    if (params) {

      rb.path('roleid', params.roleid, {});
      rb.path('target', params.target, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RbacV100TargetRbacRole>;
      })
    );
  }

  /**
   * GET /rbac/v1.0.0/{target}/rbac/role Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getRbacV100TargetRbacRole$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRbacV100TargetRbacRole(params: {

    /**
     * key for role
     */
    roleid: any;

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<RbacV100TargetRbacRole> {

    return this.getRbacV100TargetRbacRole$Response(params).pipe(
      map((r: StrictHttpResponse<RbacV100TargetRbacRole>) => r.body as RbacV100TargetRbacRole)
    );
  }

}
