// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyUnchanged } from './additional-property-unchanged';
import {EnterpriseEnterpriseSitePriorityTrafficRuleMbr} from "./enterprise-enterprise-site-priority-traffic-rule-mbr";
import {EnterpriseEnterpriseSitePriorityTrafficRuleGbr} from "./enterprise-enterprise-site-priority-traffic-rule-gbr";
export interface EnterpriseEnterpriseSitePriorityTrafficRule {

    /**
     * devices id
     */
    device: string;

    /**
     * display name to use in GUI or CLI
     */
    'display-name'?: string;

    /**
     * Id of small cell
     */
    'ptr-id': string;

    /**
     * path to endpoint
     */
    endpoint: string;

    mbr?: EnterpriseEnterpriseSitePriorityTrafficRuleMbr;

    gbr?: EnterpriseEnterpriseSitePriorityTrafficRuleGbr;

    /**
     * description of this site
     */
    description?: string

    /**
     * Link for traffic class
     */
    'traffic-class'?: string;



    [key: string]: AdditionalPropertyUnchanged | EnterpriseEnterpriseSitePriorityTrafficRuleMbr | EnterpriseEnterpriseSitePriorityTrafficRuleGbr | boolean | string | undefined;
}
