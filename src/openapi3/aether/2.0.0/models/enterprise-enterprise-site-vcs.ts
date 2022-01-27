// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyUnchanged } from './additional-property-unchanged';
import { EnterpriseEnterpriseSiteVcsDeviceGroup } from './enterprise-enterprise-site-vcs-device-group';
import { EnterpriseEnterpriseSiteVcsFilter } from './enterprise-enterprise-site-vcs-filter';
import { EnterpriseEnterpriseSiteVcsSlice } from './enterprise-enterprise-site-vcs-slice';
export interface EnterpriseEnterpriseSiteVcs {

  /**
   * Default behavior if no filter rules match
   */
  'default-behavior': string;

  /**
   * description of this vcs
   */
  description?: string;

  /**
   * A list of device groups. Groups will only participate in
   * the VCS if the enable field is set to True
   */
  'device-group'?: Array<EnterpriseEnterpriseSiteVcsDeviceGroup>;

  /**
   * display name to use in GUI or CLI
   */
  'display-name'?: string;

  /**
   * A list of applications to allow and/or deny. Rules are executed in
   * priority order. The first rule to match will determine the fate
   * of the packet.
   */
  filter?: Array<EnterpriseEnterpriseSiteVcsFilter>;

  /**
   * ID for this vcs.
   */
  'vcs-id': string;

  /**
   * Slice differentiator. Immutable.
   */
  sd: number;

  slice?: EnterpriseEnterpriseSiteVcsSlice;

  /**
   * Slice/Service type. Immutable.
   */
  sst: number;

  /**
   * Link to user plane that implements this vcf
   */
  upf?: string;

  [key: string]: AdditionalPropertyUnchanged | Array<EnterpriseEnterpriseSiteVcsDeviceGroup> | Array<EnterpriseEnterpriseSiteVcsFilter> | EnterpriseEnterpriseSiteVcsSlice | number | string | undefined;
}
