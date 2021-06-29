/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyTarget } from './additional-property-target';
import { ServiceRuleServiceRuleFlow } from './service-rule-service-rule-flow';
import { ServiceRuleServiceRuleQos } from './service-rule-service-rule-qos';
export interface ServiceRuleServiceRule {

  /**
   * name of charging rule
   */
  'charging-rule-name'?: string;

  /**
   * description of this rule
   */
  description?: string;

  /**
   * display name to use in GUI or CLI
   */
  'display-name'?: string;
  flow?: ServiceRuleServiceRuleFlow;

  /**
   * ID for this service.
   */
  id?: string;
  qos?: ServiceRuleServiceRuleQos;

  [key: string]: AdditionalPropertyTarget | ServiceRuleServiceRuleFlow | ServiceRuleServiceRuleQos | string | undefined;
}
