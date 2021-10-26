// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
/* eslint-disable */
import { AdditionalPropertyUnchanged } from './additional-property-unchanged';
import {MaxiumBitrate} from "./maximum-bitrate";
export interface ApplicationApplicationEndpoint {

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

  /**
   * Link to traffic class.
   */
  'traffic-class': string;

  /**
   * Address of this application. Either a hostname, an IP, or a subnet.
   */
  'mbr'?:MaxiumBitrate;

  [key: string]: AdditionalPropertyUnchanged | MaxiumBitrate | number | string | undefined;
}
