// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { ApplyPhaseState } from './apply-phase-state';
import { Failure } from './failure';
import { TransactionPhaseStatus } from './transaction-phase-status';
export interface TransactionApplyPhase {
  failure?: Failure;
  state?: ApplyPhaseState;
  status?: TransactionPhaseStatus;
}
