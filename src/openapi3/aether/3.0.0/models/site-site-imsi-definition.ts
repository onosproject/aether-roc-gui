// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
/* eslint-disable */
import { AdditionalPropertyTarget } from './additional-property-target';
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
  mcc: number;

  /**
   * mobile network code
   */
  mnc: number;

  [key: string]: AdditionalPropertyTarget | number | string;
}
