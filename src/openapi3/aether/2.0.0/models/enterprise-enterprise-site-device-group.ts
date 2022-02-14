// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyUnchanged } from './additional-property-unchanged';
import { EnterpriseEnterpriseSiteDeviceGroupDevice } from './enterprise-enterprise-site-device-group-device';
import {EnterpriseEnterpriseSiteDeviceGroupMbr} from "./enterprise-enterprise-site-device-group-mbr";
export interface EnterpriseEnterpriseSiteDeviceGroup {

  /**
   * description of this device group
   */
  description?: string;
  device?: EnterpriseEnterpriseSiteDeviceGroupDevice;

  /**
   * display name to use in GUI or CLI
   */
  'display-name'?: string;

  /**
   * ID for this device group.
   */
  'device-group-id': string;

  /**
   * Link to ip-domain settings that determine the pool of IP addresses,
   * as well as the domain resolver settings to use
   */
  'ip-domain'?: string;

    mbr?: EnterpriseEnterpriseSiteDeviceGroupMbr;

  [key: string]: AdditionalPropertyUnchanged | EnterpriseEnterpriseSiteDeviceGroupMbr |EnterpriseEnterpriseSiteDeviceGroupDevice | string | undefined;
}
