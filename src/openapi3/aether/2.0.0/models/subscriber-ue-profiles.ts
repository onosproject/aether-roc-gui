// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyTarget } from './additional-property-target';
import { SubscriberUeProfilesAccessProfile } from './subscriber-ue-profiles-access-profile';
export interface SubscriberUeProfiles {
  'access-profile'?: Array<SubscriberUeProfilesAccessProfile>;
  'apn-profile'?: string;
  'qos-profile'?: string;
  'security-profile'?: string;
  'up-profile'?: string;

  [key: string]: AdditionalPropertyTarget | Array<SubscriberUeProfilesAccessProfile> | string | undefined;
}
