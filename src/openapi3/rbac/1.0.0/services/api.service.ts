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

import { RbacV100TargetRbac } from '../models/rbac-v-100-target-rbac';
import { RbacV100TargetRbacGroup } from '../models/rbac-v-100-target-rbac-group';
import { RbacV100TargetRbacGroupRole } from '../models/rbac-v-100-target-rbac-group-role';
import { RbacV100TargetRbacRole } from '../models/rbac-v-100-target-rbac-role';
import { RbacV100TargetRbacRolePermission } from '../models/rbac-v-100-target-rbac-role-permission';

@Injectable({
  providedIn: 'root',
})
export class ApiService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation postRbacV100TargetRbac
   */
  static readonly PostRbacV100TargetRbacPath = '/rbac/v1.0.0/{target}/rbac';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postRbacV100TargetRbac()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postRbacV100TargetRbac$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  
    /**
     * Rbac
     */
    body?: RbacV100TargetRbac
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostRbacV100TargetRbacPath, 'post');
    if (params) {

      rb.path('target', params.target, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postRbacV100TargetRbac$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postRbacV100TargetRbac(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  
    /**
     * Rbac
     */
    body?: RbacV100TargetRbac
  }): Observable<void> {

    return this.postRbacV100TargetRbac$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteRbacV100TargetRbac
   */
  static readonly DeleteRbacV100TargetRbacPath = '/rbac/v1.0.0/{target}/rbac';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteRbacV100TargetRbac()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteRbacV100TargetRbac$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteRbacV100TargetRbacPath, 'delete');
    if (params) {

      rb.path('target', params.target, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteRbacV100TargetRbac$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteRbacV100TargetRbac(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<void> {

    return this.deleteRbacV100TargetRbac$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postRbacV100TargetRbacGroup
   */
  static readonly PostRbacV100TargetRbacGroupPath = '/rbac/v1.0.0/{target}/rbac/group/{groupid}';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postRbacV100TargetRbacGroup()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postRbacV100TargetRbacGroup$Response(params: {

    /**
     * key for group
     */
    groupid: any;

    /**
     * target (device in onos-config)
     */
    target: any;
  
    /**
     * RbacGroup
     */
    body?: RbacV100TargetRbacGroup
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostRbacV100TargetRbacGroupPath, 'post');
    if (params) {

      rb.path('groupid', params.groupid, {});
      rb.path('target', params.target, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postRbacV100TargetRbacGroup$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postRbacV100TargetRbacGroup(params: {

    /**
     * key for group
     */
    groupid: any;

    /**
     * target (device in onos-config)
     */
    target: any;
  
    /**
     * RbacGroup
     */
    body?: RbacV100TargetRbacGroup
  }): Observable<void> {

    return this.postRbacV100TargetRbacGroup$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteRbacV100TargetRbacGroup
   */
  static readonly DeleteRbacV100TargetRbacGroupPath = '/rbac/v1.0.0/{target}/rbac/group/{groupid}';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteRbacV100TargetRbacGroup()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteRbacV100TargetRbacGroup$Response(params: {

    /**
     * key for group
     */
    groupid: any;

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteRbacV100TargetRbacGroupPath, 'delete');
    if (params) {

      rb.path('groupid', params.groupid, {});
      rb.path('target', params.target, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteRbacV100TargetRbacGroup$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteRbacV100TargetRbacGroup(params: {

    /**
     * key for group
     */
    groupid: any;

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<void> {

    return this.deleteRbacV100TargetRbacGroup$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postRbacV100TargetRbacGroupRole
   */
  static readonly PostRbacV100TargetRbacGroupRolePath = '/rbac/v1.0.0/{target}/rbac/group/{groupid}/role/{roleid}';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postRbacV100TargetRbacGroupRole()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postRbacV100TargetRbacGroupRole$Response(params: {

    /**
     * key for group
     */
    groupid: any;

    /**
     * key for role
     */
    roleid: any;

    /**
     * target (device in onos-config)
     */
    target: any;
  
    /**
     * RbacGroupRole
     */
    body?: RbacV100TargetRbacGroupRole
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostRbacV100TargetRbacGroupRolePath, 'post');
    if (params) {

      rb.path('groupid', params.groupid, {});
      rb.path('roleid', params.roleid, {});
      rb.path('target', params.target, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postRbacV100TargetRbacGroupRole$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postRbacV100TargetRbacGroupRole(params: {

    /**
     * key for group
     */
    groupid: any;

    /**
     * key for role
     */
    roleid: any;

    /**
     * target (device in onos-config)
     */
    target: any;
  
    /**
     * RbacGroupRole
     */
    body?: RbacV100TargetRbacGroupRole
  }): Observable<void> {

    return this.postRbacV100TargetRbacGroupRole$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteRbacV100TargetRbacGroupRole
   */
  static readonly DeleteRbacV100TargetRbacGroupRolePath = '/rbac/v1.0.0/{target}/rbac/group/{groupid}/role/{roleid}';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteRbacV100TargetRbacGroupRole()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteRbacV100TargetRbacGroupRole$Response(params: {

    /**
     * key for group
     */
    groupid: any;

    /**
     * key for role
     */
    roleid: any;

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteRbacV100TargetRbacGroupRolePath, 'delete');
    if (params) {

      rb.path('groupid', params.groupid, {});
      rb.path('roleid', params.roleid, {});
      rb.path('target', params.target, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteRbacV100TargetRbacGroupRole$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteRbacV100TargetRbacGroupRole(params: {

    /**
     * key for group
     */
    groupid: any;

    /**
     * key for role
     */
    roleid: any;

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<void> {

    return this.deleteRbacV100TargetRbacGroupRole$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postRbacV100TargetRbacRole
   */
  static readonly PostRbacV100TargetRbacRolePath = '/rbac/v1.0.0/{target}/rbac/role/{roleid}';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postRbacV100TargetRbacRole()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postRbacV100TargetRbacRole$Response(params: {

    /**
     * key for role
     */
    roleid: any;

    /**
     * target (device in onos-config)
     */
    target: any;
  
    /**
     * RbacRole
     */
    body?: RbacV100TargetRbacRole
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostRbacV100TargetRbacRolePath, 'post');
    if (params) {

      rb.path('roleid', params.roleid, {});
      rb.path('target', params.target, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postRbacV100TargetRbacRole$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postRbacV100TargetRbacRole(params: {

    /**
     * key for role
     */
    roleid: any;

    /**
     * target (device in onos-config)
     */
    target: any;
  
    /**
     * RbacRole
     */
    body?: RbacV100TargetRbacRole
  }): Observable<void> {

    return this.postRbacV100TargetRbacRole$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteRbacV100TargetRbacRole
   */
  static readonly DeleteRbacV100TargetRbacRolePath = '/rbac/v1.0.0/{target}/rbac/role/{roleid}';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteRbacV100TargetRbacRole()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteRbacV100TargetRbacRole$Response(params: {

    /**
     * key for role
     */
    roleid: any;

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteRbacV100TargetRbacRolePath, 'delete');
    if (params) {

      rb.path('roleid', params.roleid, {});
      rb.path('target', params.target, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteRbacV100TargetRbacRole$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteRbacV100TargetRbacRole(params: {

    /**
     * key for role
     */
    roleid: any;

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<void> {

    return this.deleteRbacV100TargetRbacRole$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postRbacV100TargetRbacRolePermission
   */
  static readonly PostRbacV100TargetRbacRolePermissionPath = '/rbac/v1.0.0/{target}/rbac/role/{roleid}/permission';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postRbacV100TargetRbacRolePermission()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postRbacV100TargetRbacRolePermission$Response(params: {

    /**
     * key for role
     */
    roleid: any;

    /**
     * target (device in onos-config)
     */
    target: any;
  
    /**
     * RbacRolePermission
     */
    body?: RbacV100TargetRbacRolePermission
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostRbacV100TargetRbacRolePermissionPath, 'post');
    if (params) {

      rb.path('roleid', params.roleid, {});
      rb.path('target', params.target, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postRbacV100TargetRbacRolePermission$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postRbacV100TargetRbacRolePermission(params: {

    /**
     * key for role
     */
    roleid: any;

    /**
     * target (device in onos-config)
     */
    target: any;
  
    /**
     * RbacRolePermission
     */
    body?: RbacV100TargetRbacRolePermission
  }): Observable<void> {

    return this.postRbacV100TargetRbacRolePermission$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteRbacV100TargetRbacRolePermission
   */
  static readonly DeleteRbacV100TargetRbacRolePermissionPath = '/rbac/v1.0.0/{target}/rbac/role/{roleid}/permission';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteRbacV100TargetRbacRolePermission()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteRbacV100TargetRbacRolePermission$Response(params: {

    /**
     * key for role
     */
    roleid: any;

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteRbacV100TargetRbacRolePermissionPath, 'delete');
    if (params) {

      rb.path('roleid', params.roleid, {});
      rb.path('target', params.target, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteRbacV100TargetRbacRolePermission$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteRbacV100TargetRbacRolePermission(params: {

    /**
     * key for role
     */
    roleid: any;

    /**
     * target (device in onos-config)
     */
    target: any;

  }): Observable<void> {

    return this.deleteRbacV100TargetRbacRolePermission$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
