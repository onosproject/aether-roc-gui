// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { ChangeTransaction } from './change-transaction';
import { RollbackTransaction } from './rollback-transaction';
export interface Details {

  /**
   * the changes to apply to targets
   */
  change?: ChangeTransaction;

  /**
   * the rollback of transaction
   */
  rollback?: RollbackTransaction;
}
