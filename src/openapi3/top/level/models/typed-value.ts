// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { Bytes } from './bytes';
import { TypeOpts } from './type-opts';
import { ValueType } from './value-type';

/**
 * value represented as a byte array
 */
export interface TypedValue {

  /**
   * the bytes array
   */
  bytes?: Bytes;

  /**
   * the value type
   */
  type?: ValueType;

  /**
   * a set of type options
   */
  type_opts?: Array<TypeOpts>;
}
