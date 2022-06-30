// Code generated by openapi-gen. DO NOT EDIT.
/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertiesUnchTarget } from './additional-properties-unch-target';

/**
 * A list of DHCP Servers (single)
 */
export interface DhcpServer {

  /**
   * an ip address
   */
  address: string;

  /**
   * long description field
   */
  description?: string;

  /**
   * The ID of the DHCP Server
   */
  'dhcp-server-id': string;

  /**
   * display name to use in GUI or CLI
   */
  'display-name'?: string;

  [key: string]: AdditionalPropertiesUnchTarget | string | undefined;
}
