/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyTarget } from './additional-property-target';
export interface ServiceRuleServiceRuleQosGuaranteedBitrate {

  /**
   * Downstream guaranteed bitrate
   */
  downlink?: number;

  /**
   * Upstream guaranteed bitrate
   */
  uplink?: number;

  [key: string]: AdditionalPropertyTarget | number | undefined;
}
