// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
/* eslint-disable */
import { AdditionalPropertyTarget } from './additional-property-target';
import { ApplicationApplicationEndpoint } from './application-application-endpoint';
export interface ApplicationApplication {

  /**
   * description of this application
   */
  description?: string;

  /**
   * display name to use in GUI or CLI
   */
  'display-name'?: string;
  endpoint?: Array<ApplicationApplicationEndpoint>;

  /**
   * Link to enterprise that owns this Application. May be set to None if the application is global to all Enterprises.
   */
  enterprise: string;

  /**
   * ID for this application.
   */
  id: string;

  [key: string]: AdditionalPropertyTarget | Array<ApplicationApplicationEndpoint> | string | undefined;
}
