// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyUnchanged } from './additional-property-unchanged';
import {EnterpriseEnterpriseTemplateSliceMbr} from "./enterprise-enterprise-template-slice-mbr";
export interface EnterpriseEnterpriseTemplate {

  /**
   * Default behavior if no filter rules match
   */
  'default-behavior': string;

  /**
   * description of this template
   */
  description?: string;

  /**
   * display name to use in GUI or CLI
   */
  'display-name'?: string;

  /**
   * ID for template.
   */
  'tp-id': string;

  /**
   * Slice differentiator
   */
  sd?: number;
  mbr?: EnterpriseEnterpriseTemplateSliceMbr;

  /**
   * Slice/Service type
   */
  sst?: number;

  [key: string]: AdditionalPropertyUnchanged | EnterpriseEnterpriseTemplateSliceMbr | number | string | undefined;
}
