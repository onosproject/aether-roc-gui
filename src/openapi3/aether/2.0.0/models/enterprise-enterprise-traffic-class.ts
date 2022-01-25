// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
export interface EnterpriseEnterpriseTrafficClass {

  /**
   * Allocation and Retention Priority. 1 is the highest. 15 is the lowest.
   */
  arp?: number;

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
  'tc-id': string;

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
}
