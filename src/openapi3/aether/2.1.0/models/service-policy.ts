/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyTarget } from './additional-property-target';
import { ServicePolicyServicePolicy } from './service-policy-service-policy';
export interface ServicePolicy {
  'service-policy'?: Array<ServicePolicyServicePolicy>;

  [key: string]: AdditionalPropertyTarget | Array<ServicePolicyServicePolicy> | undefined;
}
