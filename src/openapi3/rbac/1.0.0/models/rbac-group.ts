// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyTarget } from './additional-property-target';
import { RbacGroupRole } from './rbac-group-role';
export interface RbacGroup {
  description?: string;
  groupid?: string;
  role?: Array<RbacGroupRole>;

  [key: string]: AdditionalPropertyTarget | Array<RbacGroupRole> | string | undefined;
}
