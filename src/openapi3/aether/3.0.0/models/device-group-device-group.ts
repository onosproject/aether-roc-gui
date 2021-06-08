// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyTarget } from './additional-property-target';
import { DeviceGroupDeviceGroupImsis } from './device-group-device-group-imsis';
export interface DeviceGroupDeviceGroup {

  /**
   * display name to use in GUI or CLI
   */
  'display-name'?: string;

  /**
   * ID for this device group.
   */
  id?: string;
  imsis?: Array<DeviceGroupDeviceGroupImsis>;

  /**
   * Link to ip-domain settings that determine the pool of IP addresses,
   * as well as the domain resolver settings to use
   */
  'ip-domain'?: string;

  /**
   * Link to site
   */
  site?: string;

  [key: string]: AdditionalPropertyTarget | Array<DeviceGroupDeviceGroupImsis> | string | undefined;
}
