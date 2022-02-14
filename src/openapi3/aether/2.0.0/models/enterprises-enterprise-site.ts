// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { EnterprisesEnterpriseSiteDevice } from './enterprises-enterprise-site-device';
import { EnterprisesEnterpriseSiteDeviceGroup } from './enterprises-enterprise-site-device-group';
import { EnterprisesEnterpriseSiteImsiDefinition } from './enterprises-enterprise-site-imsi-definition';
import { EnterprisesEnterpriseSiteIpDomain } from './enterprises-enterprise-site-ip-domain';
import { EnterprisesEnterpriseSiteMonitoring } from './enterprises-enterprise-site-monitoring';
import { EnterprisesEnterpriseSiteSimCard } from './enterprises-enterprise-site-sim-card';
import { EnterprisesEnterpriseSiteSlice } from './enterprises-enterprise-site-slice';
import { EnterprisesEnterpriseSiteSmallCell } from './enterprises-enterprise-site-small-cell';
import { EnterprisesEnterpriseSiteUpf } from './enterprises-enterprise-site-upf';
export interface EnterprisesEnterpriseSite {

  /**
   * long description field
   */
  description?: string;

  /**
   * List of devices
   */
  device?: Array<EnterprisesEnterpriseSiteDevice>;

  /**
   * List of device groups
   */
  'device-group'?: Array<EnterprisesEnterpriseSiteDeviceGroup>;

  /**
   * display name to use in GUI or CLI
   */
  'display-name'?: string;
  'imsi-definition'?: EnterprisesEnterpriseSiteImsiDefinition;

  /**
   * List of ip domains
   */
  'ip-domain'?: Array<EnterprisesEnterpriseSiteIpDomain>;
  monitoring?: EnterprisesEnterpriseSiteMonitoring;

  /**
   * List of sim cards
   */
  'sim-card'?: Array<EnterprisesEnterpriseSiteSimCard>;

  /**
   * ID for this site.
   */
  'site-id': string;

  /**
   * List of Slices
   */
  slice?: Array<EnterprisesEnterpriseSiteSlice>;

  /**
   * List of small cell addresses
   */
  'small-cell'?: Array<EnterprisesEnterpriseSiteSmallCell>;

  /**
   * A list of named upfs.
   */
  upf?: Array<EnterprisesEnterpriseSiteUpf>;
}
