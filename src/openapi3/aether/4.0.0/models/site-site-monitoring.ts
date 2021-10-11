// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
/* eslint-disable */
import { AdditionalPropertyUnchanged } from './additional-property-unchanged';
import {SiteSiteMonitoringEdgeDevice} from "./site-site-monitoring-edge-device";
export interface SiteSiteMonitoring {

    /**
     * URL of edge cluster prometheus
     */
    'edge-cluster-prometheus-url': string;

    /**
     * URL of monitoring prometheus
     */
    'edge-monitoring-prometheus-url': string;

    /**
     * List of edge monitoring devices
     */
    'edge-device': Array<SiteSiteMonitoringEdgeDevice>;

    [key: string]: AdditionalPropertyUnchanged | Array<SiteSiteMonitoringEdgeDevice> |number | string;
}
