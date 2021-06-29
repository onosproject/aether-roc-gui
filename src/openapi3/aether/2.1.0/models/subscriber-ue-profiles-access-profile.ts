/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyTarget } from './additional-property-target';
export interface SubscriberUeProfilesAccessProfile {

  /**
   * Link to access profile
   */
  'access-profile'?: string;

  /**
   * Allow or disallow this ue to use this access profile
   */
  allowed?: boolean;

  [key: string]: AdditionalPropertyTarget | boolean | string | undefined;
}
