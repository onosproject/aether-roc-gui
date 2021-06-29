/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyTarget } from './additional-property-target';
import { UpProfileUpProfile } from './up-profile-up-profile';
export interface UpProfile {
  'up-profile'?: Array<UpProfileUpProfile>;

  [key: string]: AdditionalPropertyTarget | Array<UpProfileUpProfile> | undefined;
}
