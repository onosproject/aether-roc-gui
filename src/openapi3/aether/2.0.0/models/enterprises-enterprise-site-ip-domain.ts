// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyUnchanged } from './additional-property-unchanged';

/**
 * List of ip domains (single)
 */
export interface EnterprisesEnterpriseSiteIpDomain {

  /**
   * administrative status
   */
  'admin-status'?: string;

  /**
   * long description field
   */
  description?: string;

  /**
   * display name to use in GUI or CLI
   */
  'display-name'?: string;

  /**
   * DNN/APN
   */
  dnn: string;

  /**
   * primary dns server name
   */
  'dns-primary'?: string;

  /**
   * secondary dns server name
   */
  'dns-secondary'?: string;

  /**
   * ID for this ip domain.
   */
  'ip-domain-id': string;

  /**
   * maximum transmission unit
   */
  mtu?: number;

  /**
   * subnet to allocate ip addresses from
   */
  subnet: string;

  [key: string]: AdditionalPropertyUnchanged | number | string | undefined;
}
