/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyTarget } from './additional-property-target';
export interface AccessProfileAccessProfile {

  /**
   * description of this profile
   */
  description?: string;

  /**
   * display name to use in GUI or CLI
   */
  'display-name'?: string;

  /**
   * filter
   */
  filter?: string;

  /**
   * ID for this access profile.
   */
  id?: string;

  /**
   * type of profile
   */
  type?: string;

  [key: string]: AdditionalPropertyTarget | string | undefined;
}
