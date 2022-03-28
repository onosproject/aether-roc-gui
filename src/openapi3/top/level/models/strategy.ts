// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { Isolation } from './isolation';
import { Synchronicity } from './synchronicity';
export interface Strategy {

  /**
   * indicates the transaction isolation level
   */
  isolation?: Isolation;

  /**
   * indicates the transaction synchronicity level
   */
  synchronicity?: Synchronicity;
}
