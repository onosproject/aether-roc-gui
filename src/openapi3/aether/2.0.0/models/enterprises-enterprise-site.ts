// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { EnterprisesEnterpriseSiteDeviceGroupList } from './enterprises-enterprise-site-device-group-list';
import { EnterprisesEnterpriseSiteDeviceList } from './enterprises-enterprise-site-device-list';
import { EnterprisesEnterpriseSiteImsiDefinition } from './enterprises-enterprise-site-imsi-definition';
import { EnterprisesEnterpriseSiteIpDomainList } from './enterprises-enterprise-site-ip-domain-list';
import { EnterprisesEnterpriseSiteMonitoring } from './enterprises-enterprise-site-monitoring';
import { EnterprisesEnterpriseSiteSimCardList } from './enterprises-enterprise-site-sim-card-list';
import { EnterprisesEnterpriseSiteSliceList } from './enterprises-enterprise-site-slice-list';
import { EnterprisesEnterpriseSiteSmallCellList } from './enterprises-enterprise-site-small-cell-list';
import { EnterprisesEnterpriseSiteUpfList } from './enterprises-enterprise-site-upf-list';

/**
 * List of site (single)
 */
export interface EnterprisesEnterpriseSite {

  /**
   * long description field
   */
  description?: string;
  device?: EnterprisesEnterpriseSiteDeviceList;
  'device-group'?: EnterprisesEnterpriseSiteDeviceGroupList;

  /**
   * display name to use in GUI or CLI
   */
  'display-name'?: string;
  'imsi-definition'?: EnterprisesEnterpriseSiteImsiDefinition;
  'ip-domain'?: EnterprisesEnterpriseSiteIpDomainList;
  monitoring?: EnterprisesEnterpriseSiteMonitoring;
  'sim-card'?: EnterprisesEnterpriseSiteSimCardList;

  /**
   * ID for this site.
   */
  'site-id': string;
  slice?: EnterprisesEnterpriseSiteSliceList;
  'small-cell'?: EnterprisesEnterpriseSiteSmallCellList;
  upf?: EnterprisesEnterpriseSiteUpfList;
}
