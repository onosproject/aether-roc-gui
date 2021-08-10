// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyTarget } from './additional-property-target';
import { VcsVcsApplication } from './vcs-vcs-application';
import { VcsVcsDeviceGroup } from './vcs-vcs-device-group';
export interface VcsVcs {

  /**
   * Link to access-point list
   */
  ap?: string;
  application?: Array<VcsVcsApplication>;

  /**
   * description of this vcs
   */
  description?: string;
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
  id?: string;

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

  [key: string]: AdditionalPropertyTarget | Array<VcsVcsApplication> | Array<VcsVcsDeviceGroup> | number | string | undefined;
}
