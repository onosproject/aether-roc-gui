// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
/* eslint-disable */
import { AdditionalPropertyUnchanged } from './additional-property-unchanged';
import { ApplicationApplicationEndpoint } from './application-application-endpoint';
import {MaxiumBitrate} from "./maximum-bitrate";
export interface ApplicationApplication {

  /**
   * description of this application
   */
  description?: string;

  /**
   * display name to use in GUI or CLI
   */
  'display-name'?: string;

  /**
   * Address of this application. Either a hostname, an IP, or a subnet.
   */
  'address'?: string;

  endpoint?: Array<ApplicationApplicationEndpoint>;

  /**
   * Link to enterprise that owns this Application. May be set to None if the application is global to all Enterprises.
   */
  enterprise: string;

  /**
   * ID for this application.
   */
  id: string;

  [key: string]: AdditionalPropertyUnchanged | Array<ApplicationApplicationEndpoint> | MaxiumBitrate | string | undefined;
}
