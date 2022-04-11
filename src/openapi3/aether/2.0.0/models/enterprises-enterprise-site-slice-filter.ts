// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */

/**
 * A list of applications to allow and/or deny. Rules are executed in
 * priority order. The first rule to match will determine the fate
 * of the packet. (single)
 */
export interface EnterprisesEnterpriseSiteSliceFilter {

  /**
   * Allow or deny this application
   */
  allow?: boolean;

  /**
   * Link to application
   */
  application: string;

  /**
   * Priority of this application
   */
  priority?: number;
}
