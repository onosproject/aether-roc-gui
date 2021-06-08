// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyTarget } from './additional-property-target';
import { VcsVcsApplication } from './vcs-vcs-application';
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

  /**
   * Link to device group
   */
  'device-group'?: string;

  /**
   * display name to use in GUI or CLI
   */
  'display-name'?: string;

  /**
   * Downlink data rate in mbps
   */
  downlink?: number;

  /**
   * ID for this vcs.
   */
  id?: string;

  /**
   * Slice differentiator. Immutable.
   */
  sd?: number;

  /**
   * Slice/Service type. Immutable.
   */
  sst?: number;

  /**
   * Link to user vcs template that was used to initialize
   * this VCS
   */
  template?: string;

  /**
   * Class of traffic
   */
  'traffic-class'?: string;

  /**
   * Link to user plane that implements this vcf
   */
  upf?: string;

  /**
   * Uplink data rate in mbps
   */
  uplink?: number;

  [key: string]: AdditionalPropertyTarget | Array<VcsVcsApplication> | number | string | undefined;
}
