/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyTarget } from './additional-property-target';
import { EnterpriseEnterprise } from './enterprise-enterprise';
export interface Enterprise {
  enterprise?: Array<EnterpriseEnterprise>;

  [key: string]: AdditionalPropertyTarget | Array<EnterpriseEnterprise> | undefined;
}
