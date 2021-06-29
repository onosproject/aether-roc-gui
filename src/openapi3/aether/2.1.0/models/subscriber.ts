/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyTarget } from './additional-property-target';
import { SubscriberUe } from './subscriber-ue';
export interface Subscriber {
  ue?: Array<SubscriberUe>;

  [key: string]: AdditionalPropertyTarget | Array<SubscriberUe> | undefined;
}
