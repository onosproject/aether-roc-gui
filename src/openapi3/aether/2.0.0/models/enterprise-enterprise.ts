// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { EnterpriseEnterpriseConnectivityService } from './enterprise-enterprise-connectivity-service';
import {EnterpriseEnterpriseApplication} from "./enterprise-enterprise-application";
import {EnterpriseEnterpriseTrafficClass} from "./enterprise-enterprise-traffic-class";
import {EnterpriseEnterpriseTemplate} from "./enterprise-enterprise-template";
import {EnterpriseEnterpriseSite} from "./enterprise-enterprise-site";
export interface EnterpriseEnterprise {
    /**
     * Link for connectivity-service.
     */
  'connectivity-service'?: Array<EnterpriseEnterpriseConnectivityService>;

    /**
     * Link for application.
     */
    application?: Array<EnterpriseEnterpriseApplication>;

    /**
     * Link for traffic-class.
     */
    'traffic-class'?: Array<EnterpriseEnterpriseTrafficClass>;

    /**
     * Link for template.
     */
    template?: Array<EnterpriseEnterpriseTemplate>;

    /**
     * Link for site.
     */
    site?: Array<EnterpriseEnterpriseSite>;

  /**
   * description of this enterprise
   */
  description?: string;

  /**
   * display name to use in GUI or CLI
   */
  'display-name'?: string;

  /**
   * ID for this enterprise.
   */
  'ent-id': string;
}
