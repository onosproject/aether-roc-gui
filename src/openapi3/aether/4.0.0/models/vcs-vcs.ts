// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyUnchanged } from './additional-property-unchanged';
import { VcsVcsDeviceGroup } from './vcs-vcs-device-group';
import { VcsVcsFilter } from './vcs-vcs-filter';
import { VcsVcsSlice } from './vcs-vcs-slice';
export interface VcsVcs {

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
   * the VCS if the enable field is set to True
   */
  'device-group'?: Array<VcsVcsDeviceGroup>;

  /**
   * display name to use in GUI or CLI
   */
  'display-name'?: string;

  /**
   * Link to enterprise that owns this VCS
   */
  enterprise: string;

  /**
   * A list of applications to allow and/or deny. Rules are executed in
   * priority order. The first rule to match will determine the fate
   * of the packet.
   */
  filter?: Array<VcsVcsFilter>;

  /**
   * ID for this slice.
   */
  id: string;

  /**
   * Slice differentiator. Immutable.
   */
  sd: number;

  /**
   * Link to site where this VCS is deployed
   */
  site: string;
  slice?: VcsVcsSlice;

  /**
   * Slice/Service type. Immutable.
   */
  sst: number;

  /**
   * Link to user plane that implements this vcf
   */
  upf?: string;

  [key: string]: AdditionalPropertyUnchanged | Array<VcsVcsDeviceGroup> | Array<VcsVcsFilter> | VcsVcsSlice | number | string | undefined;
}
