// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { EnterprisesEnterpriseSiteMonitoringEdgeDeviceList } from './enterprises-enterprise-site-monitoring-edge-device-list';

/**
 * container for monitoring
 */
export interface EnterprisesEnterpriseSiteMonitoring {

  /**
   * URL of edge cluster prometheus
   */
  'edge-cluster-prometheus-url'?: string;
  'edge-device'?: EnterprisesEnterpriseSiteMonitoringEdgeDeviceList;

  /**
   * URL of monitoring prometheus
   */
  'edge-monitoring-prometheus-url'?: string;
}
