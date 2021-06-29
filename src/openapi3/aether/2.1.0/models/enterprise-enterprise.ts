/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyTarget } from './additional-property-target';
import { EnterpriseEnterpriseConnectivityService } from './enterprise-enterprise-connectivity-service';
export interface EnterpriseEnterprise {
  'connectivity-service'?: Array<EnterpriseEnterpriseConnectivityService>;

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
  id?: string;

  [key: string]: AdditionalPropertyTarget | Array<EnterpriseEnterpriseConnectivityService> | string | undefined;
}
