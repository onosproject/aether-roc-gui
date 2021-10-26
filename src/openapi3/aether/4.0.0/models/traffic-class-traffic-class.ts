// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
/* eslint-disable */
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
   * Allocation and Retention Priority. 1 is the highest. 15 is the lowest.
   */
  arp?:number;

  /**
   * QCI
   */
  qci?: number;
}
