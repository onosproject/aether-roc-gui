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

import { Rbac } from '../models/rbac';
import { RbacGroup } from '../models/rbac-group';
import { RbacGroupRole } from '../models/rbac-group-role';
import { RbacRole } from '../models/rbac-role';
import { RbacRolePermission } from '../models/rbac-role-permission';

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
   * Path part for operation postRbac
   */
  static readonly PostRbacPath = '/rbac/v1.0.0/{target}/rbac';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postRbac()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postRbac$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
    body?: Rbac
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostRbacPath, 'post');
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
   * To access the full response (for headers, for example), `postRbac$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postRbac(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
    body?: Rbac
  }): Observable<void> {

    return this.postRbac$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteRbac
   */
  static readonly DeleteRbacPath = '/rbac/v1.0.0/{target}/rbac';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteRbac()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteRbac$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteRbacPath, 'delete');
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
   * To access the full response (for headers, for example), `deleteRbac$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteRbac(params: {

    /**
     * target (device in onos-config)
     */
    target: any;
  }): Observable<void> {

    return this.deleteRbac$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postRbacGroup
   */
  static readonly PostRbacGroupPath = '/rbac/v1.0.0/{target}/rbac/group/{groupid}';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postRbacGroup()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postRbacGroup$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {groupid}
     */
    groupid: any;
    body?: RbacGroup
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostRbacGroupPath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('groupid', params.groupid, {});
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
   * To access the full response (for headers, for example), `postRbacGroup$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postRbacGroup(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {groupid}
     */
    groupid: any;
    body?: RbacGroup
  }): Observable<void> {

    return this.postRbacGroup$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteRbacGroup
   */
  static readonly DeleteRbacGroupPath = '/rbac/v1.0.0/{target}/rbac/group/{groupid}';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteRbacGroup()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteRbacGroup$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {groupid}
     */
    groupid: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteRbacGroupPath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('groupid', params.groupid, {});
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
   * To access the full response (for headers, for example), `deleteRbacGroup$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteRbacGroup(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {groupid}
     */
    groupid: any;
  }): Observable<void> {

    return this.deleteRbacGroup$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postRbacGroupRole
   */
  static readonly PostRbacGroupRolePath = '/rbac/v1.0.0/{target}/rbac/group/{groupid}/role/{roleid}';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postRbacGroupRole()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postRbacGroupRole$Response(params: {

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
    body?: RbacGroupRole
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostRbacGroupRolePath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('groupid', params.groupid, {});
      rb.path('roleid', params.roleid, {});
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
   * To access the full response (for headers, for example), `postRbacGroupRole$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postRbacGroupRole(params: {

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
    body?: RbacGroupRole
  }): Observable<void> {

    return this.postRbacGroupRole$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteRbacGroupRole
   */
  static readonly DeleteRbacGroupRolePath = '/rbac/v1.0.0/{target}/rbac/group/{groupid}/role/{roleid}';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteRbacGroupRole()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteRbacGroupRole$Response(params: {

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
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteRbacGroupRolePath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('groupid', params.groupid, {});
      rb.path('roleid', params.roleid, {});
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
   * To access the full response (for headers, for example), `deleteRbacGroupRole$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteRbacGroupRole(params: {

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
  }): Observable<void> {

    return this.deleteRbacGroupRole$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postRbacRole
   */
  static readonly PostRbacRolePath = '/rbac/v1.0.0/{target}/rbac/role/{roleid}';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postRbacRole()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postRbacRole$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {roleid}
     */
    roleid: any;
    body?: RbacRole
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostRbacRolePath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('roleid', params.roleid, {});
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
   * To access the full response (for headers, for example), `postRbacRole$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postRbacRole(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {roleid}
     */
    roleid: any;
    body?: RbacRole
  }): Observable<void> {

    return this.postRbacRole$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteRbacRole
   */
  static readonly DeleteRbacRolePath = '/rbac/v1.0.0/{target}/rbac/role/{roleid}';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteRbacRole()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteRbacRole$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {roleid}
     */
    roleid: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteRbacRolePath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('roleid', params.roleid, {});
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
   * To access the full response (for headers, for example), `deleteRbacRole$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteRbacRole(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {roleid}
     */
    roleid: any;
  }): Observable<void> {

    return this.deleteRbacRole$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postRbacRolePermission
   */
  static readonly PostRbacRolePermissionPath = '/rbac/v1.0.0/{target}/rbac/role/{roleid}/permission';

  /**
   * POST Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postRbacRolePermission()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postRbacRolePermission$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {roleid}
     */
    roleid: any;
    body?: RbacRolePermission
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.PostRbacRolePermissionPath, 'post');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('roleid', params.roleid, {});
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
   * To access the full response (for headers, for example), `postRbacRolePermission$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postRbacRolePermission(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {roleid}
     */
    roleid: any;
    body?: RbacRolePermission
  }): Observable<void> {

    return this.postRbacRolePermission$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteRbacRolePermission
   */
  static readonly DeleteRbacRolePermissionPath = '/rbac/v1.0.0/{target}/rbac/role/{roleid}/permission';

  /**
   * DELETE Generated from YANG model.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteRbacRolePermission()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteRbacRolePermission$Response(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {roleid}
     */
    roleid: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteRbacRolePermissionPath, 'delete');
    if (params) {
      rb.path('target', params.target, {});
      rb.path('roleid', params.roleid, {});
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
   * To access the full response (for headers, for example), `deleteRbacRolePermission$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteRbacRolePermission(params: {

    /**
     * target (device in onos-config)
     */
    target: any;

    /**
     * key {roleid}
     */
    roleid: any;
  }): Observable<void> {

    return this.deleteRbacRolePermission$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
