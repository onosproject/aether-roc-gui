// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyUnchanged } from './additional-property-unchanged';
import { SiteSiteImsiDefinition } from './site-site-imsi-definition';
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

  [key: string]: AdditionalPropertyUnchanged | SiteSiteImsiDefinition | string | undefined;
}
