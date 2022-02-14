// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyUnchanged } from './additional-property-unchanged';
import { EnterprisesEnterpriseSiteDeviceGroupDevice } from './enterprises-enterprise-site-device-group-device';
import { EnterprisesEnterpriseSiteDeviceGroupMbr } from './enterprises-enterprise-site-device-group-mbr';
export interface EnterprisesEnterpriseSiteDeviceGroup {

  /**
   * long description field
   */
  description?: string;

  /**
   * list of devices in this device-group
   */
  device?: Array<EnterprisesEnterpriseSiteDeviceGroupDevice>;

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

  [key: string]: AdditionalPropertyUnchanged | Array<EnterprisesEnterpriseSiteDeviceGroupDevice> | EnterprisesEnterpriseSiteDeviceGroupMbr | string | undefined;
}
