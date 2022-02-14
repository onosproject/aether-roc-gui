// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { EnterprisesEnterpriseApplication } from './enterprises-enterprise-application';
import { EnterprisesEnterpriseConnectivityService } from './enterprises-enterprise-connectivity-service';
import { EnterprisesEnterpriseSite } from './enterprises-enterprise-site';
import { EnterprisesEnterpriseTemplate } from './enterprises-enterprise-template';
import { EnterprisesEnterpriseTrafficClass } from './enterprises-enterprise-traffic-class';
export interface EnterprisesEnterprise {

  /**
   * List of applications
   */
  application?: Array<EnterprisesEnterpriseApplication>;

  /**
   * The list for connectivity-service
   */
  'connectivity-service'?: Array<EnterprisesEnterpriseConnectivityService>;

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

  /**
   * List of site
   */
  site?: Array<EnterprisesEnterpriseSite>;

  /**
   * List of slice templates
   */
  template?: Array<EnterprisesEnterpriseTemplate>;

  /**
   * List of traffic class
   */
  'traffic-class'?: Array<EnterprisesEnterpriseTrafficClass>;
}
