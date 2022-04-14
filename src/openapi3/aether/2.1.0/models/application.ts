// Code generated by openapi-gen. DO NOT EDIT.
/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertiesUnchTarget } from './additional-properties-unch-target';
import { ApplicationEndpointList } from './application-endpoint-list';

/**
 * List of applications (single)
 */
export interface Application {

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
  endpoint?: ApplicationEndpointList;

  [key: string]: AdditionalPropertiesUnchTarget | ApplicationEndpointList | string | undefined;
}
