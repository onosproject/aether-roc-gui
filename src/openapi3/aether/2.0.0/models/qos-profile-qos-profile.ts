// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyTarget } from './additional-property-target';
import { QosProfileQosProfileApnAmbr } from './qos-profile-qos-profile-apn-ambr';
import { QosProfileQosProfileArp } from './qos-profile-qos-profile-arp';
export interface QosProfileQosProfile {
  'Apn-ambr'?: QosProfileQosProfileApnAmbr;
  Arp?: QosProfileQosProfileArp;
  description?: string;
  'display-name'?: string;
  id?: string;
  qci?: number;

  [key: string]: AdditionalPropertyTarget | QosProfileQosProfileApnAmbr | QosProfileQosProfileArp | number | string | undefined;
}
