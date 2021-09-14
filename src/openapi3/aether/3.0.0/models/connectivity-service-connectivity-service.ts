// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
/* eslint-disable */
import { AdditionalPropertyTarget } from './additional-property-target';
export interface ConnectivityServiceConnectivityService {

  /**
   * url of the 5g core
   */
  'core-5g-endpoint'?: string;

  /**
   * description of this connectivity service
   */
  description?: string;

  /**
   * display name to use in GUI or CLI
   */
  'display-name'?: string;

  /**
   * url of the hss service
   */
  'hss-endpoint'?: string;

  /**
   * ID for this connectivity service.
   */
  id: string;

  /**
   * url of the pcrf service
   */
  'pcrf-endpoint'?: string;

  /**
   * url of the spgwc service
   */
  'spgwc-endpoint'?: string;

  [key: string]: AdditionalPropertyTarget | string | undefined;
}
