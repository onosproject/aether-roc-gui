// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { TransactionAbortPhase } from './transaction-abort-phase';
import { TransactionApplyPhase } from './transaction-apply-phase';
import { TransactionCommitPhase } from './transaction-commit-phase';
import { TransactionInitializePhase } from './transaction-initialize-phase';
import { TransactionValidatePhase } from './transaction-validate-phase';
export interface TransactionPhases {

  /**
   * the transaction abort phase status
   */
  abort?: TransactionAbortPhase;

  /**
   * the transaction apply phase status
   */
  apply?: TransactionApplyPhase;

  /**
   * the transaction commit phase status
   */
  commit?: TransactionCommitPhase;

  /**
   * the transaction initialization phase status
   */
  initialize?: TransactionInitializePhase;

  /**
   * the transaction validation phase status
   */
  validate?: TransactionValidatePhase;
}
