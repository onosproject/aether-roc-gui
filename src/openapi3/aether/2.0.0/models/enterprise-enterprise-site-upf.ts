// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyUnchanged } from './additional-property-unchanged';
export interface EnterpriseEnterpriseSiteUpf {

  /**
   * Address of UPF
   */
  address: string;

  /**
   * url for configuring the UPF
   */
  'config-endpoint'?: string;

  /**
   * description of this UPF
   */
  description?: string;

  /**
   * display name to use in GUI or CLI
   */
  'display-name'?: string;

  /**
   * ID for this upf.
   */
  'upf-id': string;

  /**
   * Port for UPF
   */
  port: number;

  [key: string]: AdditionalPropertyUnchanged | number | string | undefined;
}
