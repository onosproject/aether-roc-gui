// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
/* eslint-disable */
import { AdditionalPropertyTarget } from './additional-property-target';
import { ServiceGroupServiceGroupServicePolicies } from './service-group-service-group-service-policies';
export interface ServiceGroupServiceGroup {

  /**
   * description of this service group
   */
  description?: string;

  /**
   * display name to use in GUI or CLI
   */
  'display-name'?: string;

  /**
   * ID for this service group.
   */
  id?: string;
  'service-policies'?: Array<ServiceGroupServiceGroupServicePolicies>;

  [key: string]: AdditionalPropertyTarget | Array<ServiceGroupServiceGroupServicePolicies> | string | undefined;
}
