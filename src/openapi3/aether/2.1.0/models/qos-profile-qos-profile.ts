// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
/* eslint-disable */
import { AdditionalPropertyTarget } from './additional-property-target';
import { QosProfileQosProfileApnAmbr } from './qos-profile-qos-profile-apn-ambr';
import { QosProfileQosProfileArp } from './qos-profile-qos-profile-arp';
export interface QosProfileQosProfile {
  'apn-ambr'?: QosProfileQosProfileApnAmbr;
  arp?: QosProfileQosProfileArp;

  /**
   * description of this profile
   */
  description?: string;

  /**
   * display name to use in GUI or CLI
   */
  'display-name'?: string;

  /**
   * ID for this qos profile.
   */
  id?: string;

  /**
   * QoS Class Identifier
   */
  qci?: number;

  [key: string]: AdditionalPropertyTarget | QosProfileQosProfileApnAmbr | QosProfileQosProfileArp | number | string | undefined;
}
