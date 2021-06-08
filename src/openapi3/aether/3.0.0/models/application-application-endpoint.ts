// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyTarget } from './additional-property-target';
export interface ApplicationApplicationEndpoint {

  /**
   * Address of this endpoint. Either a hostname, and IP, or a subnet.
   */
  address?: string;

  /**
   * Name of this endpoint
   */
  name?: string;

  /**
   * Last port in range
   */
  'port-end'?: number;

  /**
   * First port in range
   */
  'port-start'?: number;

  /**
   * Name of this endpoint
   */
  protocol?: string;

  [key: string]: AdditionalPropertyTarget | number | string | undefined;
}
