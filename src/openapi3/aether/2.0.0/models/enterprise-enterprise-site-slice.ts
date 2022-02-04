// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyUnchanged } from './additional-property-unchanged';
import { EnterpriseEnterpriseSiteSliceDeviceGroup } from './enterprise-enterprise-site-slice-device-group';
import { EnterpriseEnterpriseSiteSliceFilter } from './enterprise-enterprise-site-slice-filter';
import {EnterpriseEnterpriseSiteSliceMbr} from "./enterprise-enterprise-site-slice-mbr";
export interface EnterpriseEnterpriseSiteSlice {

  /**
   * Default behavior if no filter rules match
   */
  'default-behavior': string;

  /**
   * description of this slice
   */
  description?: string;

  /**
   * A list of device groups. Groups will only participate in
   * the slice if the enable field is set to True
   */
  'device-group'?: Array<EnterpriseEnterpriseSiteSliceDeviceGroup>;

  /**
   * display name to use in GUI or CLI
   */
  'display-name'?: string;

  /**
   * A list of applications to allow and/or deny. Rules are executed in
   * priority order. The first rule to match will determine the fate
   * of the packet.
   */
  filter?: Array<EnterpriseEnterpriseSiteSliceFilter>;

  /**
   * ID for this slice.
   */
  'slice-id': string;

    /**
     * Mbr
     */
    mbr: EnterpriseEnterpriseSiteSliceMbr

  /**
   * Slice differentiator. Immutable.
   */
  sd: number;

  /**
   * Slice/Service type. Immutable.
   */
  sst: number;

  /**
   * Link to user plane that implements this vcf
   */
  upf?: string;

  [key: string]: AdditionalPropertyUnchanged | Array<EnterpriseEnterpriseSiteSliceDeviceGroup> | EnterpriseEnterpriseSiteSliceMbr
      | Array<EnterpriseEnterpriseSiteSliceFilter> | number | string | undefined;
}
