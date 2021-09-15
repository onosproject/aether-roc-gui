// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
/* eslint-disable */
import { AdditionalPropertyUnchanged } from './additional-property-unchanged';
export interface ApplicationApplicationEndpoint {

  /**
   * Address of this endpoint. Either a hostname, and IP, or a subnet.
   */
  address: string;

  /**
   * Name of this endpoint
   */
  name: string;

  /**
   * Last port in range
   */
  'port-end'?: number;

  /**
   * First port in range
   */
  'port-start': number;

  /**
   * Name of this endpoint
   */
  protocol?: string;

  [key: string]: AdditionalPropertyUnchanged | number | string | undefined;
}
