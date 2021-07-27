// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyTarget } from './additional-property-target';
import { SiteSiteImisDefinition} from "./site-site-imis-definition";

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
  enterprise?: string;

  /**
   * ID for this site.
   */
  id?: string;

  /**
   *  for this vcs
   */
  'imsi-definition'?: SiteSiteImisDefinition;

  [key: string]: AdditionalPropertyTarget | string | undefined | object;
}
