// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyTarget } from './additional-property-target';
import { SubscriberUeProfilesAccessProfile } from './subscriber-ue-profiles-access-profile';
export interface SubscriberUeProfiles {
  'access-profile'?: Array<SubscriberUeProfilesAccessProfile>;

  /**
   * Link to apn profile
   */
  'apn-profile'?: string;

  /**
   * Link to qos profile
   */
  'qos-profile'?: string;

  /**
   * Link to security profile
   */
  'security-profile'?: string;

  /**
   * Link to user plane profile
   */
  'up-profile'?: string;

  [key: string]: AdditionalPropertyTarget | Array<SubscriberUeProfilesAccessProfile> | string | undefined;
}
