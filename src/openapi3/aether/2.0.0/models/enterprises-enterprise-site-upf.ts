// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyUnchanged } from './additional-property-unchanged';
export interface EnterprisesEnterpriseSiteUpf {

  /**
   * Address of UPF
   */
  address: string;

  /**
   * url for configuring the UPF
   */
  'config-endpoint'?: string;

  /**
   * long description field
   */
  description?: string;

  /**
   * display name to use in GUI or CLI
   */
  'display-name'?: string;

  /**
   * Port for UPF
   */
  port: number;

  /**
   * ID for this upf.
   */
  'upf-id': string;

  [key: string]: AdditionalPropertyUnchanged | number | string | undefined;
}
