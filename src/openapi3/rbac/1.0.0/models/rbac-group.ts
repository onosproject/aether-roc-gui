// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyTarget } from './additional-property-target';
import { RbacGroupRole } from './rbac-group-role';
export interface RbacGroup {
  Role?: Array<RbacGroupRole>;
  description?: string;
  groupid?: string;

  [key: string]: AdditionalPropertyTarget | Array<RbacGroupRole> | string | undefined;
}
