// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyTarget } from './additional-property-target';
export interface TemplateTemplate {

  /**
   * description of this vcs template
   */
  description?: string;

  /**
   * display name to use in GUI or CLI
   */
  'display-name'?: string;

  /**
   * Downlink data rate in mbps
   */
  downlink?: number;

  /**
   * ID for this vcs template.
   */
  id?: string;

  /**
   * Slice differentiator
   */
  sd?: number;

  /**
   * Slice/Service type
   */
  sst?: number;

  /**
   * Link to traffic class
   */
  'traffic-class'?: string;

  /**
   * Uplink data rate in mbps
   */
  uplink?: number;

  [key: string]: AdditionalPropertyTarget | number | string | undefined;
}
