// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
/* eslint-disable */
import { AdditionalPropertyTarget } from './additional-property-target';
import { ServicePolicyServicePolicyAmbr } from './service-policy-service-policy-ambr';
import { ServicePolicyServicePolicyRules } from './service-policy-service-policy-rules';
export interface ServicePolicyServicePolicy {
  ambr?: ServicePolicyServicePolicyAmbr;

  /**
   * Evolved-ARP
   */
  arp?: number;

  /**
   * description of this profile
   */
  description?: string;

  /**
   * display name to use in GUI or CLI
   */
  'display-name'?: string;

  /**
   * ID for this service.
   */
  id?: string;

  /**
   * QoS Class Identifier
   */
  qci?: number;
  rules?: Array<ServicePolicyServicePolicyRules>;

  [key: string]: AdditionalPropertyTarget | Array<ServicePolicyServicePolicyRules> | ServicePolicyServicePolicyAmbr | number | string | undefined;
}
