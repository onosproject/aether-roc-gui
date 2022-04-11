// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyUnchanged } from './additional-property-unchanged';

/**
 * List of small cell addresses (single)
 */
export interface EnterprisesEnterpriseSiteSmallCell {

  /**
   * Address of small cell
   */
  address?: string;

  /**
   * long description field
   */
  description?: string;

  /**
   * display name to use in GUI or CLI
   */
  'display-name'?: string;

  /**
   * Enable this small cell
   */
  enable?: boolean;

  /**
   * Id of small cell
   */
  'small-cell-id': string;

  /**
   * Type Allocation Code
   */
  tac: string;

  [key: string]: AdditionalPropertyUnchanged | boolean | string | undefined;
}
