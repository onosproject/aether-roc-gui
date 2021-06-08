// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
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
   * ID for this application.
   */
  id?: string;

  [key: string]: AdditionalPropertyTarget | Array<ApplicationApplicationEndpoint> | string | undefined;
}
