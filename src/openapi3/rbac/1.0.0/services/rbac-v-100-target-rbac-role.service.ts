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

import { RbacV100TargetRbacRolePermission } from '../models/rbac-v-100-target-rbac-role-permission';

@Injectable({
  providedIn: 'root',
})
export class RbacV100TargetRbacRoleService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getRbacV100TargetRbacRolePermission
   */
  static readonly GetRbacV100TargetRbacRolePermissionPath = '/rbac/v1.0.0/{target}/rbac/role/{roleid}/permission';

  /**
   * GET /rbac/v1.0.0/{target}/rbac/role/{roleid}/permission Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getRbacV100TargetRbacRolePermission()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRbacV100TargetRbacRolePermission$Response(params: {

    /**
     * key for role
     */
    roleid: any;

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<StrictHttpResponse<RbacV100TargetRbacRolePermission>> {

    const rb = new RequestBuilder(this.rootUrl, RbacV100TargetRbacRoleService.GetRbacV100TargetRbacRolePermissionPath, 'get');
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
        return r as StrictHttpResponse<RbacV100TargetRbacRolePermission>;
      })
    );
  }

  /**
   * GET /rbac/v1.0.0/{target}/rbac/role/{roleid}/permission Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getRbacV100TargetRbacRolePermission$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRbacV100TargetRbacRolePermission(params: {

    /**
     * key for role
     */
    roleid: any;

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<RbacV100TargetRbacRolePermission> {

    return this.getRbacV100TargetRbacRolePermission$Response(params).pipe(
      map((r: StrictHttpResponse<RbacV100TargetRbacRolePermission>) => r.body as RbacV100TargetRbacRolePermission)
    );
  }

}
