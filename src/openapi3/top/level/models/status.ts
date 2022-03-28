// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { Failure } from './failure';
import { ProposalId } from './proposal-id';
import { State } from './state';
import { TransactionPhases } from './transaction-phases';
export interface Status {
  failure?: Failure;

  /**
   * the transaction phases
   */
  phases?: TransactionPhases;

  /**
   * the set of proposals managed by the transaction
   */
  proposals?: Array<ProposalId>;

  /**
   * the overall transaction state
   */
  state?: State;
}
