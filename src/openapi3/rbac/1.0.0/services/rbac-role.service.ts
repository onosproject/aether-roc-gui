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

import { RbacRole } from '../models/rbac-role';
import { RbacRolePermission } from '../models/rbac-role-permission';

@Injectable({
  providedIn: 'root',
})
export class RbacRoleService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getRbacRole
   */
  static readonly GetRbacRolePath = '/rbac/v1.0.0/{target}/rbac/role/{roleid}';

  /**
   * GET /rbac/role Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getRbacRole()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRbacRole$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {roleid}
     */
    roleid: any;

  }): Observable<StrictHttpResponse<RbacRole>> {

    const rb = new RequestBuilder(this.rootUrl, RbacRoleService.GetRbacRolePath, 'get');
    if (params) {

      rb.path('target', params.target, {});
      rb.path('roleid', params.roleid, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RbacRole>;
      })
    );
  }

  /**
   * GET /rbac/role Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getRbacRole$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRbacRole(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {roleid}
     */
    roleid: any;

  }): Observable<RbacRole> {

    return this.getRbacRole$Response(params).pipe(
      map((r: StrictHttpResponse<RbacRole>) => r.body as RbacRole)
    );
  }

  /**
   * Path part for operation getRbacRolePermission
   */
  static readonly GetRbacRolePermissionPath = '/rbac/v1.0.0/{target}/rbac/role/{roleid}/permission';

  /**
   * GET /rbac/role/{roleid}/permission Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getRbacRolePermission()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRbacRolePermission$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {roleid}
     */
    roleid: any;

  }): Observable<StrictHttpResponse<RbacRolePermission>> {

    const rb = new RequestBuilder(this.rootUrl, RbacRoleService.GetRbacRolePermissionPath, 'get');
    if (params) {

      rb.path('target', params.target, {});
      rb.path('roleid', params.roleid, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RbacRolePermission>;
      })
    );
  }

  /**
   * GET /rbac/role/{roleid}/permission Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getRbacRolePermission$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRbacRolePermission(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {roleid}
     */
    roleid: any;

  }): Observable<RbacRolePermission> {

    return this.getRbacRolePermission$Response(params).pipe(
      map((r: StrictHttpResponse<RbacRolePermission>) => r.body as RbacRolePermission)
    );
  }

}
