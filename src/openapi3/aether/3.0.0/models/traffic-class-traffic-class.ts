// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
/* eslint-disable */
import { AdditionalPropertyTarget } from './additional-property-target';
export interface TrafficClassTrafficClass {

  /**
   * description of this traffic class
   */
  description?: string;

  /**
   * display name to use in GUI or CLI
   */
  'display-name'?: string;

  /**
   * ID for this traffic class.
   */
  id: string;

  /**
   * PDB
   */
  pdb?: number;

  /**
   * PELR exponent
   */
  pelr?: number;

  /**
   * QCI
   */
  qci?: number;

  [key: string]: AdditionalPropertyTarget | number | string | undefined;
}
