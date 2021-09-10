// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyUnchanged } from './additional-property-unchanged';
import { VcsVcsApplication } from './vcs-vcs-application';
import { VcsVcsDeviceGroup } from './vcs-vcs-device-group';
export interface VcsVcs {

  /**
   * Link to access-point list
   */
  ap?: string;

  /**
   * An ordered list of applications to allow and deny. The deny rules
   * will be executed first, followed by the allow rules. The first rule
   * to match is returned. An implicit DENY ALL lies at the end.
   */
  application?: Array<VcsVcsApplication>;

  /**
   * description of this vcs
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
   * Downlink data rate in mbps
   */
  downlink?: number;

  /**
   * Link to enterprise that owns this VCS
   */
  enterprise: string;

  /**
   * ID for this vcs.
   */
  id: string;

  /**
   * Slice differentiator. Immutable.
   */
  sd: number;

  /**
   * Slice/Service type. Immutable.
   */
  sst: number;

  /**
   * Link to user vcs template that was used to initialize
   * this VCS
   */
  template?: string;

  /**
   * Link to traffic class
   */
  'traffic-class': string;

  /**
   * Link to user plane that implements this vcf
   */
  upf?: string;

  /**
   * Uplink data rate in mbps
   */
  uplink?: number;

  [key: string]: AdditionalPropertyUnchanged | Array<VcsVcsApplication> | Array<VcsVcsDeviceGroup> | number | string | undefined;
}
