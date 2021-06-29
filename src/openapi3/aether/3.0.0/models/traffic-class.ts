/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyTarget } from './additional-property-target';
import { TrafficClassTrafficClass } from './traffic-class-traffic-class';
export interface TrafficClass {
  'traffic-class'?: Array<TrafficClassTrafficClass>;

  [key: string]: AdditionalPropertyTarget | Array<TrafficClassTrafficClass> | undefined;
}
