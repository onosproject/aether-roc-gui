// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { EnterprisesEnterpriseApplicationList } from './enterprises-enterprise-application-list';
import { EnterprisesEnterpriseConnectivityServiceList } from './enterprises-enterprise-connectivity-service-list';
import { EnterprisesEnterpriseSiteList } from './enterprises-enterprise-site-list';
import { EnterprisesEnterpriseTemplateList } from './enterprises-enterprise-template-list';
import { EnterprisesEnterpriseTrafficClassList } from './enterprises-enterprise-traffic-class-list';

/**
 * List of enterprises (single)
 */
export interface EnterprisesEnterprise {
  application?: EnterprisesEnterpriseApplicationList;
  'connectivity-service'?: EnterprisesEnterpriseConnectivityServiceList;

  /**
   * long description field
   */
  description?: string;

  /**
   * display name to use in GUI or CLI
   */
  'display-name'?: string;

  /**
   * ID for this enterprise.
   */
  'enterprise-id': string;
  site?: EnterprisesEnterpriseSiteList;
  template?: EnterprisesEnterpriseTemplateList;
  'traffic-class'?: EnterprisesEnterpriseTrafficClassList;
}
