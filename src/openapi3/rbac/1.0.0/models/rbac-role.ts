// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyTarget } from './additional-property-target';
import { RbacRolePermission } from './rbac-role-permission';
export interface RbacRole {
  Permission?: RbacRolePermission;
  description?: string;
  roleid?: string;

  [key: string]: AdditionalPropertyTarget | RbacRolePermission | string | undefined;
}
