// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyTarget } from './additional-property-target';
import { ServiceRuleServiceRuleFlow } from './service-rule-service-rule-flow';
import { ServiceRuleServiceRuleQos } from './service-rule-service-rule-qos';
export interface ServiceRuleServiceRule {
  'charging-rule-name'?: string;
  description?: string;
  'display-name'?: string;
  flow?: ServiceRuleServiceRuleFlow;
  id?: string;
  qos?: ServiceRuleServiceRuleQos;

  [key: string]: AdditionalPropertyTarget | ServiceRuleServiceRuleFlow | ServiceRuleServiceRuleQos | string | undefined;
}
