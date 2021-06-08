// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyTarget } from './additional-property-target';
import { DeviceModelListDeviceModelListTac } from './device-model-list-device-model-list-tac';
export interface DeviceModelListDeviceModelList {

  /**
   * description of this device-model-list
   */
  description?: string;

  /**
   * display name to use in GUI or CLI
   */
  'display-name'?: string;

  /**
   * ID for this device-model-list.
   */
  id?: string;
  tac?: Array<DeviceModelListDeviceModelListTac>;

  [key: string]: AdditionalPropertyTarget | Array<DeviceModelListDeviceModelListTac> | string | undefined;
}
