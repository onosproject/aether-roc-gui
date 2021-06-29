/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyTarget } from './additional-property-target';
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
   * Link to network for this vcs
   */
  network?: string;

  [key: string]: AdditionalPropertyTarget | string | undefined;
}
