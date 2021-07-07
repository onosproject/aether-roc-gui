// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyTarget } from './additional-property-target';
import { ServiceRuleServiceRuleQosAggregateMaximumBitrate } from './service-rule-service-rule-qos-aggregate-maximum-bitrate';
import { ServiceRuleServiceRuleQosArp } from './service-rule-service-rule-qos-arp';
import { ServiceRuleServiceRuleQosGuaranteedBitrate } from './service-rule-service-rule-qos-guaranteed-bitrate';
import { ServiceRuleServiceRuleQosMaximumRequestedBandwidth } from './service-rule-service-rule-qos-maximum-requested-bandwidth';
export interface ServiceRuleServiceRuleQos {
  'aggregate-maximum-bitrate'?: ServiceRuleServiceRuleQosAggregateMaximumBitrate;
  arp?: ServiceRuleServiceRuleQosArp;
  'guaranteed-bitrate'?: ServiceRuleServiceRuleQosGuaranteedBitrate;
  'maximum-requested-bandwidth'?: ServiceRuleServiceRuleQosMaximumRequestedBandwidth;

  /**
   * QoS Class Identifier
   */
  qci?: number;

  [key: string]: AdditionalPropertyTarget | ServiceRuleServiceRuleQosAggregateMaximumBitrate | ServiceRuleServiceRuleQosArp | ServiceRuleServiceRuleQosGuaranteedBitrate | ServiceRuleServiceRuleQosMaximumRequestedBandwidth | number | undefined;
}
