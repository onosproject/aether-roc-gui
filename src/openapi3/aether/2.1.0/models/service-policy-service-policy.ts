// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyTarget } from './additional-property-target';
import { ServicePolicyServicePolicyAmbr } from './service-policy-service-policy-ambr';
import { ServicePolicyServicePolicyRules } from './service-policy-service-policy-rules';
export interface ServicePolicyServicePolicy {
  ambr?: ServicePolicyServicePolicyAmbr;
  arp?: number;
  description?: string;
  'display-name'?: string;
  id?: string;
  qci?: number;
  rules?: Array<ServicePolicyServicePolicyRules>;

  [key: string]: AdditionalPropertyTarget | Array<ServicePolicyServicePolicyRules> | ServicePolicyServicePolicyAmbr | number | string | undefined;
}
