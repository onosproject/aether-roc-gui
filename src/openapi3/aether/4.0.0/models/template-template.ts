// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
/* eslint-disable */
import {TemplateTemplateDeviceMbr} from "./template-template-device-mbr";
import {TemplateTemplateSliceMbr} from "./template-template-slice-mbr";

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
   * Per-device QOS Settings
   */
  device?: TemplateTemplateDeviceMbr;

    /**
     * Per-Slice QOS Settings
     */
  slice?:TemplateTemplateSliceMbr;

  /**
   * ID for this vcs template.
   */
  id: string;

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

}
