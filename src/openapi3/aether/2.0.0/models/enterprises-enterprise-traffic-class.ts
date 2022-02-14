// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
export interface EnterprisesEnterpriseTrafficClass {

  /**
   * Allocation and Retention Priority. 1 is the highest. 15 is the lowest.
   */
  arp?: number;

  /**
   * long description field
   */
  description?: string;

  /**
   * display name to use in GUI or CLI
   */
  'display-name'?: string;

  /**
   * PDB
   */
  pdb?: number;

  /**
   * PELR exponent
   */
  pelr?: number;

  /**
   * QOS Class Identifier
   */
  qci?: number;

  /**
   * ID for this traffic class.
   */
  'traffic-class-id': string;
}
