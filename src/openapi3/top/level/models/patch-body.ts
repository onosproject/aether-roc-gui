// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { Elements } from './elements';
export interface PatchBody {

  /**
   * Elements to be deleted
   */
  Deletes?: Elements;

  /**
   * Model type and version of 'target' on first creation [link](https://docs.onosproject.org/onos-config/docs/gnmi_extensions/#use-of-extension-101-device-version-in-setrequest)
   */
  Extensions?: { 'change-name-100'?: string, 'model-version-101'?: string, 'model-type-102'?: string, 'transaction-info-110'?: { 'ID'?: string, 'index'?: number }, 'transaction-strategy-111'?: number };

  /**
   * Elements to be updated or replaced
   */
  Updates?: Elements;

  /**
   * Target (device name) to use by default if not specified on indivdual updates/deletes as an additional property
   */
  'default-target': string;
}
