// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyUnchanged } from './additional-property-unchanged';
import { TemplateTemplateSlice } from './template-template-slice';
export interface TemplateTemplate {

  /**
   * Default behavior if no filter rules match
   */
  'default-behavior': string;

  /**
   * description of this slice template
   */
  description?: string;

  /**
   * display name to use in GUI or CLI
   */
  'display-name'?: string;

  /**
   * ID for this slice template.
   */
  id: string;

  /**
   * Slice differentiator
   */
  sd?: number;
  slice?: TemplateTemplateSlice;

  /**
   * Slice/Service type
   */
  sst?: number;

  [key: string]: AdditionalPropertyUnchanged | TemplateTemplateSlice | number | string | undefined;
}
