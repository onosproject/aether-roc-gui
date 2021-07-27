// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyTarget } from './additional-property-target';
export interface IpDomainIpDomain {

  /**
   * administrative status
   */
  'admin-status'?: string;

  /**
   * description of this ip domain
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
   * Link to enterprise that owns this Access Point List
   */
  enterprise: string;

  /**
   * ID for this ip domain.
   */
  id?: string;

  /**
   * maximum transmission unit
   */
  mtu?: number;

  /**
   * subnet to allocate ip addresses from
   */
  subnet: string;

  [key: string]: AdditionalPropertyTarget | number | string | undefined;
}
