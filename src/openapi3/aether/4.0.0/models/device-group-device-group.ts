// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
/* eslint-disable */
import { AdditionalPropertyUnchanged } from './additional-property-unchanged';
import { DeviceGroupDeviceGroupImsis } from './device-group-device-group-imsis';
import {DeviceGroupDeviceGroupDeviceMbr} from "./device-group-device-group-device";

export interface DeviceGroupDeviceGroup {

  /**
   * description of this device group
   */
  description?: string;

  /**
   * display name to use in GUI or CLI
   */
  'display-name'?: string;

  /**
   * ID for this device group.
   */
  id: string;

  /**
   * List of imsi ranges that comprise this group. It's acceptable for
   * a range to degenerate to being a singleton
   */
  imsis?: Array<DeviceGroupDeviceGroupImsis>;

  /**
   * Link to ip-domain settings that determine the pool of IP addresses,
   * as well as the domain resolver settings to use
   */
  'ip-domain'?: string;

  device?: DeviceGroupDeviceGroupDeviceMbr;

  /**
   * Link to site
   */
  site: string;

  [key: string]: AdditionalPropertyUnchanged | Array<DeviceGroupDeviceGroupImsis> | DeviceGroupDeviceGroupDeviceMbr | string | undefined;
}
