/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyTarget } from './additional-property-target';
export interface ServiceRuleServiceRuleQosArp {

  /**
   * True if a bearer with lower priority should be dropped
   */
  'preemption-capability'?: boolean;

  /**
   * This bearer may be dropped for a bearer with higher priority
   */
  'preemption-vulnerability'?: boolean;

  /**
   * Priority
   */
  priority?: number;

  [key: string]: AdditionalPropertyTarget | boolean | number | undefined;
}
