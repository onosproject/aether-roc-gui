// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
/* eslint-disable */
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

  /**
   * Default behavior if no filter rules match
   */
  'default-behavior'?: string;

}
