// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyUnchanged } from './additional-property-unchanged';
import { EnterprisesEnterpriseSiteSliceDeviceGroupList } from './enterprises-enterprise-site-slice-device-group-list';
import { EnterprisesEnterpriseSiteSliceFilterList } from './enterprises-enterprise-site-slice-filter-list';
import { EnterprisesEnterpriseSiteSliceMbr } from './enterprises-enterprise-site-slice-mbr';
import { EnterprisesEnterpriseSiteSlicePriorityTrafficRuleList } from './enterprises-enterprise-site-slice-priority-traffic-rule-list';

/**
 * List of Slices (single)
 */
export interface EnterprisesEnterpriseSiteSlice {

  /**
   * Default behavior if no filter rules match
   */
  'default-behavior': string;

  /**
   * long description field
   */
  description?: string;
  'device-group'?: EnterprisesEnterpriseSiteSliceDeviceGroupList;

  /**
   * display name to use in GUI or CLI
   */
  'display-name'?: string;
  filter?: EnterprisesEnterpriseSiteSliceFilterList;
  mbr?: EnterprisesEnterpriseSiteSliceMbr;
  'priority-traffic-rule'?: EnterprisesEnterpriseSiteSlicePriorityTrafficRuleList;

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

  [key: string]: AdditionalPropertyUnchanged | EnterprisesEnterpriseSiteSliceDeviceGroupList | EnterprisesEnterpriseSiteSliceFilterList | EnterprisesEnterpriseSiteSliceMbr | EnterprisesEnterpriseSiteSlicePriorityTrafficRuleList | number | string | undefined;
}
