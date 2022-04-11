// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyUnchanged } from './additional-property-unchanged';
import { EnterprisesEnterpriseApplicationEndpointList } from './enterprises-enterprise-application-endpoint-list';

/**
 * List of applications (single)
 */
export interface EnterprisesEnterpriseApplication {

  /**
   * Address of this application. Either a hostname, an IP, or a subnet.
   */
  address: string;

  /**
   * ID for this application.
   */
  'application-id': string;

  /**
   * long description field
   */
  description?: string;

  /**
   * display name to use in GUI or CLI
   */
  'display-name'?: string;
  endpoint?: EnterprisesEnterpriseApplicationEndpointList;

  [key: string]: AdditionalPropertyUnchanged | EnterprisesEnterpriseApplicationEndpointList | string | undefined;
}
