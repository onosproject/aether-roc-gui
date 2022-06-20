// Code generated by openapi-gen. DO NOT EDIT.
/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyFabricId } from './additional-property-fabric-id';

/**
 * A list of DHCP Servers (single)
 */
export interface DhcpServer {

  /**
   * a list of ip addresses
   */
  address?: string;

  /**
   * long description field
   */
  description?: string;

  /**
   * The ID of the DHCP Server
   */
  'dhcp-id': string;

  /**
   * display name to use in GUI or CLI
   */
  'display-name'?: string;

  [key: string]: AdditionalPropertyFabricId | string | undefined;
}
