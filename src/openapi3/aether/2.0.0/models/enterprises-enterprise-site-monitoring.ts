// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { EnterprisesEnterpriseSiteMonitoringEdgeDevice } from './enterprises-enterprise-site-monitoring-edge-device';

/**
 * container for monitoring
 */
export interface EnterprisesEnterpriseSiteMonitoring {

  /**
   * URL of edge cluster prometheus
   */
  'edge-cluster-prometheus-url'?: string;

  /**
   * List of edge monitoring devices
   */
  'edge-device'?: Array<EnterprisesEnterpriseSiteMonitoringEdgeDevice>;

  /**
   * URL of monitoring prometheus
   */
  'edge-monitoring-prometheus-url'?: string;
}
