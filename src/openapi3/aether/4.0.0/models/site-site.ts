// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyUnchanged } from './additional-property-unchanged';
import { SiteSiteImsiDefinition } from './site-site-imsi-definition';
import { SiteSiteMonitoring } from './site-site-monitoring';
import { SiteSiteSmallCell } from './site-site-small-cell';
export interface SiteSite {

  /**
   * description of this site
   */
  description?: string;

  /**
   * display name to use in GUI or CLI
   */
  'display-name'?: string;

  /**
   * Link to enterprise that owns this site
   */
  enterprise: string;

  /**
   * ID for this site.
   */
  id: string;
  'imsi-definition'?: SiteSiteImsiDefinition;
  monitoring?: SiteSiteMonitoring;

  /**
   * List of small cell addresses
   */
  'small-cell'?: Array<SiteSiteSmallCell>;

  [key: string]: AdditionalPropertyUnchanged | Array<SiteSiteSmallCell> | SiteSiteImsiDefinition | SiteSiteMonitoring | string | undefined;
}
