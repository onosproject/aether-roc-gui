// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyUnchanged } from './additional-property-unchanged';
import { EnterpriseEnterpriseApplicationEndpoint } from './enterprise-enterprise-application-endpoint';
export interface EnterpriseEnterpriseApplication {

  /**
   * Address of this application. Either a hostname, an IP, or a subnet.
   */
  address: string;

  /**
   * description of this application
   */
  description?: string;

  /**
   * display name to use in GUI or CLI
   */
  'display-name'?: string;
  endpoint?: Array<EnterpriseEnterpriseApplicationEndpoint>;

  /**
   * ID for this application.
   */
  'app-id': string;

  [key: string]: AdditionalPropertyUnchanged | Array<EnterpriseEnterpriseApplicationEndpoint> | string | undefined;
}
