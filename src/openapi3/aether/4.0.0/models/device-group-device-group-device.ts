// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyUnchanged } from './additional-property-unchanged';
import { DeviceGroupDeviceGroupDeviceMbr } from './device-group-device-group-device-mbr';

/**
 * Per-device QOS Settings
 */
export interface DeviceGroupDeviceGroupDevice {
  mbr?: DeviceGroupDeviceGroupDeviceMbr;

  /**
   * Link to traffic class
   */
  'traffic-class': string;

  [key: string]: AdditionalPropertyUnchanged | DeviceGroupDeviceGroupDeviceMbr | string | undefined;
}
