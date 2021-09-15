// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
/* eslint-disable */
import { AdditionalPropertyTarget } from './additional-property-target';
export interface ApnProfileApnProfile {

  /**
   * apn name
   */
  'apn-name'?: string;

  /**
   * description of this profile
   */
  description?: string;

  /**
   * display name to use in GUI or CLI
   */
  'display-name'?: string;

  /**
   * primary dns server name
   */
  'dns-primary'?: string;

  /**
   * secondary dns server name
   */
  'dns-secondary'?: string;

  /**
   * enable gx interface
   */
  'gx-enabled'?: boolean;

  /**
   * ID for this apn profile.
   */
  id?: string;

  /**
   * maximum transmission unit
   */
  mtu?: number;

  /**
   * Link to service group
   */
  'service-group'?: string;

  [key: string]: AdditionalPropertyTarget | boolean | number | string | undefined;
}
