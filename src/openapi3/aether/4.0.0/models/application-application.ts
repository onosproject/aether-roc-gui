// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyUnchanged } from './additional-property-unchanged';
import { ApplicationApplicationEndpoint } from './application-application-endpoint';
export interface ApplicationApplication {

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

  /**
   * list for endpoint
   */
  endpoint?: Array<ApplicationApplicationEndpoint>;

  /**
   * Link to enterprise that owns this Application. May be set to None if the application is global to all Enterprises.
   */
  enterprise: string;

  /**
   * ID for this application.
   */
  id: string;

  [key: string]: AdditionalPropertyUnchanged | Array<ApplicationApplicationEndpoint> | string | undefined;
}
