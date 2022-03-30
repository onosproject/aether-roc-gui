// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { EnterprisesEnterpriseApplicationEndpointMbr } from './enterprises-enterprise-application-endpoint-mbr';

/**
 * list for endpoint (single)
 */
export interface EnterprisesEnterpriseApplicationEndpoint {

  /**
   * long description field
   */
  description?: string;

  /**
   * display name to use in GUI or CLI
   */
  'display-name'?: string;

  /**
   * Id of this endpoint
   */
  'endpoint-id': string;
  mbr?: EnterprisesEnterpriseApplicationEndpointMbr;

  /**
   * Last port in range
   */
  'port-end'?: number;

  /**
   * First port in range
   */
  'port-start'?: number;

  /**
   * Protocol of this endpoint
   */
  protocol?: string;

  /**
   * Link to traffic class
   */
  'traffic-class'?: string;
}
