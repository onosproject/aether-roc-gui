// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyUnchanged } from './additional-property-unchanged';
import { EnterprisesEnterpriseSiteSliceDeviceGroup } from './enterprises-enterprise-site-slice-device-group';
import { EnterprisesEnterpriseSiteSliceFilter } from './enterprises-enterprise-site-slice-filter';
import { EnterprisesEnterpriseSiteSliceMbr } from './enterprises-enterprise-site-slice-mbr';
import { EnterprisesEnterpriseSiteSlicePriorityTrafficRule } from './enterprises-enterprise-site-slice-priority-traffic-rule';
export interface EnterprisesEnterpriseSiteSlice {

  /**
   * Default behavior if no filter rules match
   */
  'default-behavior': string;

  /**
   * long description field
   */
  description?: string;

  /**
   * A list of device groups. Groups will only participate in
   * the Slice if the enable field is set to True
   */
  'device-group'?: Array<EnterprisesEnterpriseSiteSliceDeviceGroup>;

  /**
   * display name to use in GUI or CLI
   */
  'display-name'?: string;

  /**
   * A list of applications to allow and/or deny. Rules are executed in
   * priority order. The first rule to match will determine the fate
   * of the packet.
   */
  filter?: Array<EnterprisesEnterpriseSiteSliceFilter>;
  mbr?: EnterprisesEnterpriseSiteSliceMbr;

  /**
   * List of priority traffic rules
   */
  'priority-traffic-rule'?: Array<EnterprisesEnterpriseSiteSlicePriorityTrafficRule>;

  /**
   * Slice differentiator. Immutable.
   */
  sd: number;

  /**
   * ID for this slice.
   */
  'slice-id': string;

  /**
   * Slice/Service type. Immutable.
   */
  sst: number;

  /**
   * Link to user plane that implements this vcf
   */
  upf?: string;

  [key: string]: AdditionalPropertyUnchanged | Array<EnterprisesEnterpriseSiteSliceDeviceGroup> | Array<EnterprisesEnterpriseSiteSliceFilter> | Array<EnterprisesEnterpriseSiteSlicePriorityTrafficRule> | EnterprisesEnterpriseSiteSliceMbr | number | string | undefined;
}
