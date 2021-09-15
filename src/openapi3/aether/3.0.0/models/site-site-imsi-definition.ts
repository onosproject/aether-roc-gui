// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
/* eslint-disable */
import { AdditionalPropertyUnchanged } from './additional-property-unchanged';
export interface SiteSiteImsiDefinition {

  /**
   * enterprise-specific identifier
   */
  enterprise: number;

  /**
   * IMSI format specifier, describes how fields are packed into an IMSI. Must be exactly 15 characters long. For example, CCCNNNEEESSSSSS.
   */
  format: string;

  /**
   * mobile country code
   */
  mcc: string;

  /**
   * mobile network code
   */
  mnc: string;

  [key: string]: AdditionalPropertyUnchanged | number | string;
}
