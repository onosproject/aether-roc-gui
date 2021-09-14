// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
/* eslint-disable */
import { AdditionalPropertyTarget } from './additional-property-target';
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

  [key: string]: AdditionalPropertyTarget | SiteSiteImsiDefinition | string | undefined;
}
