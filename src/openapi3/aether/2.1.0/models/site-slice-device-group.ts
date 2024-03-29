// Code generated by openapi-gen. DO NOT EDIT.
/* tslint:disable */
/* eslint-disable */

/**
 * A list of device groups. Groups will only participate in
 * the Slice if the enable field is set to True (single)
 */
export interface SiteSliceDeviceGroup {

  /**
   * Link to device group
   */
  'device-group': string;

  /**
   * Enable this device group
   */
  enable?: boolean;
}
