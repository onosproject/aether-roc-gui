// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyUnchanged } from './additional-property-unchanged';
import { EnterpriseEnterpriseSiteImsiDefinition } from './enterprise-enterprise-site-imsi-definition';
import { EnterpriseEnterpriseSiteMonitoring } from './enterprise-enterprise-site-monitoring';
import {EnterpriseEnterpriseSiteSmallCell} from './enterprise-enterprise-site-small-cell';
import {EnterpriseEnterpriseSiteDevice} from "./enterprise-enterprise-site-device";
import {EnterpriseEnterpriseSitePriorityTrafficRule} from "./enterprise-enterprise-site-priority-traffic-rule";
import {EnterpriseEnterpriseSiteUpf} from "./enterprise-enterprise-site-upf";
import {EnterpriseEnterpriseSiteslice} from "./enterprise-enterprise-site-slice";
import {EnterpriseEnterpriseSiteDeviceGroup} from "./enterprise-enterprise-site-device-group";
import {EnterpriseEnterpriseSiteIpDomain} from "./enterprise-enterprise-site-ip-domain";
import {EnterpriseEnterpriseSiteSimCard} from "./enterprise-enterprise-site-sim-card";
export interface EnterpriseEnterpriseSite {

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
  'site-id': string;

  'imsi-definition'?: EnterpriseEnterpriseSiteImsiDefinition;

  monitoring?: EnterpriseEnterpriseSiteMonitoring;

  /**
   * List of small cell addresses
   */
  'small-cell'?: Array<EnterpriseEnterpriseSiteSmallCell>;

    /**
     * List of priority-traffic-rule
     */
  'priority-traffic-rule'?:Array<EnterpriseEnterpriseSitePriorityTrafficRule>;

    /**
     * List of sim-card
     */
    'sim-card'?: Array<EnterpriseEnterpriseSiteSimCard>;

    /**
     * List of devices
     */
    device?: Array<EnterpriseEnterpriseSiteDevice>;

    /**
     * List of UPF
     */
    upf?: Array<EnterpriseEnterpriseSiteUpf>;

    /**
     * List of device-group
     */
    'device-group'?: Array<EnterpriseEnterpriseSiteDeviceGroup>;

    /**
     * List of slice
     */
    slice?: Array<EnterpriseEnterpriseSiteslice>;

    /**
     * List of ip-domain
     */
    'ip-domain'?: Array<EnterpriseEnterpriseSiteIpDomain>;

  [key: string]: AdditionalPropertyUnchanged | Array<EnterpriseEnterpriseSiteSmallCell> | Array<EnterpriseEnterpriseSiteDevice> | Array<EnterpriseEnterpriseSitePriorityTrafficRule>
      | Array<EnterpriseEnterpriseSiteUpf> | Array<EnterpriseEnterpriseSiteslice> | Array<EnterpriseEnterpriseSiteDeviceGroup> | Array<EnterpriseEnterpriseSiteSimCard>
      | Array<EnterpriseEnterpriseSiteIpDomain> | EnterpriseEnterpriseSiteImsiDefinition | EnterpriseEnterpriseSiteMonitoring | string | undefined;
}
