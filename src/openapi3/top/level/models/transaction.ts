// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { Change } from './change';

/**
 * Transaction refers to a multi-target transactional change. Taken from https://github.com/onosproject/onos-api/tree/master/proto/onos/config/v2
 */
export interface Transaction {

  /**
   * a set of changes to apply to targets
   */
  changes?: Array<Change>;

  /**
   * the time at which the transaction was created
   */
  created?: string;

  /**
   * a flag indicating whether this transaction is being deleted by a snapshot
   */
  deleted?: boolean;

  /**
   * a reference to the transaction on which this transaction is dependent
   */
  dependency?: string;

  /**
   * a list of references to transactions that depend on this transaction
   */
  dependents?: Array<{ 'id'?: string }>;

  /**
   * the unique identifier of the transaction
   */
  id: string;

  /**
   * a monotonically increasing, globally unique index of the change
   */
  index: number;

  /**
   * the change revision number
   */
  revision: number;

  /**
   * the current lifecycle status of the transaction
   */
  status?: { 'phase': 'TRANSACTION_CHANGE' | 'TRANSACTION_ROLLBACK', 'state': 'TRANSACTION_PENDING' | 'TRANSACTION_COMPLETE' | 'TRANSACTION_FAILED' | 'TRANSACTION_VALIDATING' | 'TRANSACTION_VALIDATED' | 'TRANSACTION_VALIDATION_FAILED' };

  /**
   * the time at which the transaction was last updated
   */
  updated?: string;

  /**
   * the name of the user that made the transaction
   */
  username?: string;
}
