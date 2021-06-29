/* tslint:disable */
/* eslint-disable */
import { AccessProfileAccessProfile } from './access-profile-access-profile';
import { AdditionalPropertyTarget } from './additional-property-target';
export interface AccessProfile {
  'access-profile'?: Array<AccessProfileAccessProfile>;

  [key: string]: AdditionalPropertyTarget | Array<AccessProfileAccessProfile> | undefined;
}
