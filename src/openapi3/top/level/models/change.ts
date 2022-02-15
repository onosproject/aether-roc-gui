// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { ChangeValue } from './change-value';

/**
 * represents a configuration change to a single target
 */
export interface Change {

  /**
   * the identifier of the target to which this change applies
   */
  target_id: string;

  /**
   * an optional target type to which to apply this change
   */
  target_type?: string;

  /**
   * an optional target version to which to apply this change
   */
  target_version?: string;

  /**
   * a set of change values to apply
   */
  values?: Array<ChangeValue>;
}
