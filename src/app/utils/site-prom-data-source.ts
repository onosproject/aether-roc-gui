/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import { from, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { mergeMap, pluck } from 'rxjs/operators';
import { SiteSite } from '../../openapi3/aether/4.0.0/models/site-site';

export interface SiteSiteProm {
    id: string;
    health: string;
}

export interface ResultMetric {
    __name__: string;
    [key: string]: string | undefined;
}

export interface ResultItem {
    metric: ResultMetric;
    value: any[];
}

export interface PromResultData {
    resultType: string;
    result: ResultItem[];
}

export interface PromResult {
    status: string;
    data: PromResultData;
}

export class SitePromDataSource {
    constructor(private httpClient: HttpClient) {}

    loadData(url: string): Observable<ResultItem> {
        return this.httpClient.get<PromResultData>(url).pipe(
            pluck('data'),
            mergeMap((items: PromResultData) => from(items.result))
        );
    }

    queryBuilder(tag: string, site: SiteSite): string {
        let host: string, query: string;

        switch (tag) {
            case 'agentsSum':
                host = site.monitoring['edge-monitoring-prometheus-url'];
                query = `sum(aetheredge_e2e_tests_ok{name=~"${site.monitoring[
                    'edge-device'
                ]
                    .map((device) => device['edge-device-id'])
                    .join('|')}"})`;
                break;
            case 'agentsCount':
                host = site.monitoring['edge-monitoring-prometheus-url'];
                query = `count(aetheredge_e2e_tests_ok{name=~"${site.monitoring[
                    'edge-device'
                ]
                    .map((device) => device['edge-device-id'])
                    .join('|')}"})`;
                break;
            case 'clusterNodesSum':
                host = site.monitoring['edge-cluster-prometheus-url'];
                query =
                    'sum(kube_node_status_condition{condition="Ready",status="true"})';
                break;
            case 'clusterNodesCount':
                host = site.monitoring['edge-cluster-prometheus-url'];
                query =
                    'count(kube_node_status_condition{condition="Ready",status="true"})';
                break;
        }

        return `${host}/api/v1/query?query=${query}`;
    }
}
