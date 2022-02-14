// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { SiteSiteMonitoringEdgeDevice } from './site-site-monitoring-edge-device';

/**
 * container for monitoring
 */
export interface SiteSiteMonitoring {

  /**
   * URL of edge cluster prometheus
   */
  'edge-cluster-prometheus-url'?: string;

  /**
   * List of edge monitoring devices
   */
  'edge-device'?: Array<SiteSiteMonitoringEdgeDevice>;

  /**
   * URL of monitoring prometheus
   */
  'edge-monitoring-prometheus-url'?: string;
}
