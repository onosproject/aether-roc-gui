// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyUnchanged } from './additional-property-unchanged';
import { ApListApListAccessPoints } from './ap-list-ap-list-access-points';
export interface ApListApList {

  /**
   * List of access point addresses
   */
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

  [key: string]: AdditionalPropertyUnchanged | Array<ApListApListAccessPoints> | string | undefined;
}
