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

import { RbacGroupRole } from '../models/rbac-group-role';

@Injectable({
  providedIn: 'root',
})
export class RbacGroupRoleService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getRbacGroupRole
   */
  static readonly GetRbacGroupRolePath = '/rbac/v1.0.0/{target}/rbac/group/{groupid}/role/{roleid}';

  /**
   * GET /rbac/group/{groupid}/role Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getRbacGroupRole()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRbacGroupRole$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {groupid}
     */
    groupid: any;

    /**
     * key {roleid}
     */
    roleid: any;

  }): Observable<StrictHttpResponse<RbacGroupRole>> {

    const rb = new RequestBuilder(this.rootUrl, RbacGroupRoleService.GetRbacGroupRolePath, 'get');
    if (params) {

      rb.path('target', params.target, {});
      rb.path('groupid', params.groupid, {});
      rb.path('roleid', params.roleid, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RbacGroupRole>;
      })
    );
  }

  /**
   * GET /rbac/group/{groupid}/role Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getRbacGroupRole$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRbacGroupRole(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {groupid}
     */
    groupid: any;

    /**
     * key {roleid}
     */
    roleid: any;

  }): Observable<RbacGroupRole> {

    return this.getRbacGroupRole$Response(params).pipe(
      map((r: StrictHttpResponse<RbacGroupRole>) => r.body as RbacGroupRole)
    );
  }

}
