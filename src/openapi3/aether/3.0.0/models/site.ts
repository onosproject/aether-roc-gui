/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyTarget } from './additional-property-target';
import { SiteSite } from './site-site';
export interface Site {
  site?: Array<SiteSite>;

  [key: string]: AdditionalPropertyTarget | Array<SiteSite> | undefined;
}
