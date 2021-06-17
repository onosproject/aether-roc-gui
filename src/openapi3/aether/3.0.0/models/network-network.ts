// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyTarget } from './additional-property-target';
export interface NetworkNetwork {

  /**
   * description of this network
   */
  description?: string;

  /**
   * display name to use in GUI or CLI
   */
  'display-name'?: string;

  /**
   * Link to enterprise that owns this Network. If this is set to None, then the Network is globally provided by Aether.
   */
  enterprise?: string;

  /**
   * ID for this network.
   */
  id?: string;

  /**
   * mobile country code
   */
  mcc?: number;

  /**
   * mobile network code
   */
  mnc?: number;

  [key: string]: AdditionalPropertyTarget | number | string | undefined;
}
