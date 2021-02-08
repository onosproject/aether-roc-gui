// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyTarget } from './additional-property-target';
import { RbacGroup } from './rbac-group';
import { RbacRole } from './rbac-role';
export interface Rbac {
  Group?: Array<RbacGroup>;
  Role?: Array<RbacRole>;

  [key: string]: AdditionalPropertyTarget | Array<RbacGroup> | Array<RbacRole> | undefined;
}
