// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
/* eslint-disable */
import { AdditionalPropertyTarget } from './additional-property-target';
export interface SecurityProfileSecurityProfile {

  /**
   * description of this security profile
   */
  description?: string;

  /**
   * display name to use in GUI or CLI
   */
  'display-name'?: string;

  /**
   * ID for this security profile.
   */
  id?: string;

  /**
   * Secret key for USIM
   */
  key?: string;

  /**
   * Secret key for Operator
   */
  opc?: string;

  /**
   * sequence number
   */
  sqn?: number;

  [key: string]: AdditionalPropertyTarget | number | string | undefined;
}
