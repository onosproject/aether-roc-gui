// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyUnchanged } from './additional-property-unchanged';
import { EnterprisesEnterpriseSiteSlicePriorityTrafficRuleGbr } from './enterprises-enterprise-site-slice-priority-traffic-rule-gbr';
import { EnterprisesEnterpriseSiteSlicePriorityTrafficRuleMbr } from './enterprises-enterprise-site-slice-priority-traffic-rule-mbr';

/**
 * List of priority traffic rules (single)
 */
export interface EnterprisesEnterpriseSiteSlicePriorityTrafficRule {

  /**
   * Link to application
   */
  application: string;

  /**
   * long description field
   */
  description?: string;

  /**
   * Link to device
   */
  device: string;

  /**
   * display name to use in GUI or CLI
   */
  'display-name'?: string;

  /**
   * Link to endpoint in application
   */
  endpoint: string;
  gbr?: EnterprisesEnterpriseSiteSlicePriorityTrafficRuleGbr;
  mbr?: EnterprisesEnterpriseSiteSlicePriorityTrafficRuleMbr;

  /**
   * ID for this priority traffic class.
   */
  'priority-traffic-rule-id': string;

  /**
   * Link to traffic class
   */
  'traffic-class'?: string;

  [key: string]: AdditionalPropertyUnchanged | EnterprisesEnterpriseSiteSlicePriorityTrafficRuleGbr | EnterprisesEnterpriseSiteSlicePriorityTrafficRuleMbr | string | undefined;
}
