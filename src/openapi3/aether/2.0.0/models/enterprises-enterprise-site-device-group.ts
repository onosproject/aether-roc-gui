// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyUnchanged } from './additional-property-unchanged';
import { EnterprisesEnterpriseSiteDeviceGroupDeviceList } from './enterprises-enterprise-site-device-group-device-list';
import { EnterprisesEnterpriseSiteDeviceGroupMbr } from './enterprises-enterprise-site-device-group-mbr';

/**
 * List of device groups (single)
 */
export interface EnterprisesEnterpriseSiteDeviceGroup {

  /**
   * long description field
   */
  description?: string;
  device?: EnterprisesEnterpriseSiteDeviceGroupDeviceList;

  /**
   * ID for this device group.
   */
  'device-group-id': string;

  /**
   * display name to use in GUI or CLI
   */
  'display-name'?: string;

  /**
   * Link to ip-domain settings that determine the pool of IP addresses,
   * as well as the domain resolver settings to use
   */
  'ip-domain'?: string;
  mbr?: EnterprisesEnterpriseSiteDeviceGroupMbr;

  /**
   * Link to traffic class
   */
  'traffic-class': string;

  [key: string]: AdditionalPropertyUnchanged | EnterprisesEnterpriseSiteDeviceGroupDeviceList | EnterprisesEnterpriseSiteDeviceGroupMbr | string | undefined;
}
