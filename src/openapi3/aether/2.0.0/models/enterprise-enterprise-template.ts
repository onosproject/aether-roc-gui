// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyUnchanged } from './additional-property-unchanged';
import { EnterpriseEnterpriseTemplateSlice } from './enterprise-enterprise-template-slice';
export interface EnterpriseEnterpriseTemplate {

  /**
   * Default behavior if no filter rules match
   */
  'default-behavior': string;

  /**
   * description of this vcs template
   */
  description?: string;

  /**
   * display name to use in GUI or CLI
   */
  'display-name'?: string;

  /**
   * ID for this vcs template.
   */
  'tp-id': string;

  /**
   * Slice differentiator
   */
  sd?: number;
  slice?: EnterpriseEnterpriseTemplateSlice;

  /**
   * Slice/Service type
   */
  sst?: number;

  [key: string]: AdditionalPropertyUnchanged | EnterpriseEnterpriseTemplateSlice | number | string | undefined;
}
