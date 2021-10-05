// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
/* eslint-disable */
import { AdditionalPropertyUnchanged } from './additional-property-unchanged';
import { SiteSiteImsiDefinition } from './site-site-imsi-definition';
import { SiteSiteSmallCell } from './site-site-small-cell';
import {ApplicationApplicationEndpoint} from "./application-application-endpoint";
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

  'small-cell'?: Array<SiteSiteSmallCell>;

  'imsi-definition'?: SiteSiteImsiDefinition;

  [key: string]: AdditionalPropertyUnchanged | SiteSiteImsiDefinition | Array<SiteSiteSmallCell> | string | undefined;
}
