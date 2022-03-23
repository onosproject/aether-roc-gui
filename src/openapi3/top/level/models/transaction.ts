// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { Details } from './details';
import { Revision } from './revision';
import { Status } from './status';
import { Strategy } from './strategy';

/**
 * Transaction refers to a multi-target transactional change. Taken from https://github.com/onosproject/onos-api/tree/master/proto/onos/config/v2
 */
export interface Transaction {

  /**
   * the transaction details
   */
  details?: Details;

  /**
   * the unique identifier of the transaction
   */
  id: string;

  /**
   * a monotonically increasing, globally unique index of the change
   */
  index: number;

  /**
   * the meta of the Transaction
   */
  meta: { 'key'?: string, 'version'?: number, 'revision'?: Revision, 'created'?: string, 'updated'?: string, 'deleted'?: string };

  /**
   * the current lifecycle status of the transaction
   */
  status?: Status;

  /**
   * the transaction strategy
   */
  strategy?: Strategy;

  /**
   * the name of the user that made the transaction
   */
  username?: string;
}
