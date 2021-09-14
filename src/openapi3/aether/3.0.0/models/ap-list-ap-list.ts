// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
/* eslint-disable */
import { AdditionalPropertyTarget } from './additional-property-target';
import { ApListApListAccessPoints } from './ap-list-ap-list-access-points';
export interface ApListApList {
  'access-points'?: Array<ApListApListAccessPoints>;

  /**
   * description of this ap-list
   */
  description?: string;

  /**
   * display name to use in GUI or CLI
   */
  'display-name'?: string;

  /**
   * Link to enterprise that owns this Access Point List
   */
  enterprise: string;

  /**
   * ID for this ap-list.
   */
  id: string;

  [key: string]: AdditionalPropertyTarget | Array<ApListApListAccessPoints> | string | undefined;
}
