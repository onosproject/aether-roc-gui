// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyTarget } from './additional-property-target';
export interface EnterpriseEnterpriseConnectivityService {

  /**
   * Link to connectivity services where configuration should be pushed for this enterprise's devices
   */
  'connectivity-service': string;

  /**
   * Allow or disallow pushes to this connectivity service
   */
  enabled?: boolean;

  [key: string]: AdditionalPropertyTarget | boolean | string | undefined;
}
