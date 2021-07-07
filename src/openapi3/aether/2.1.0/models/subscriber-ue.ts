// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyTarget } from './additional-property-target';
import { SubscriberUeProfiles } from './subscriber-ue-profiles';
import { SubscriberUeServingPlmn } from './subscriber-ue-serving-plmn';
export interface SubscriberUe {

  /**
   * display name to use in GUI or CLI
   */
  'display-name'?: string;

  /**
   * Enable or disable this ue
   */
  enabled?: boolean;

  /**
   * Link to enterprise that owns this UE range
   */
  enterprise?: string;

  /**
   * identifier for this subscriber, typically a UUID
   */
  id?: string;

  /**
   * For choice imsi:range
   */
  'imsi-range-from'?: number;

  /**
   * For choice imsi:range
   */
  'imsi-range-to'?: number;

  /**
   * For choice imsi:wildcard
   */
  'imsi-wildcard'?: string;

  /**
   * Priority for this subscriber range
   */
  priority?: number;
  profiles?: SubscriberUeProfiles;

  /**
   * requested access point name
   */
  'requested-apn'?: string;
  'serving-plmn'?: SubscriberUeServingPlmn;

  [key: string]: AdditionalPropertyTarget | SubscriberUeProfiles | SubscriberUeServingPlmn | boolean | number | string | undefined;
}
