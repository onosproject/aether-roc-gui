/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {from, Observable} from 'rxjs'
import {PROMETHEUS_PROXY} from '../../environments/environment'
import {HttpClient} from '@angular/common/http'
import {mergeMap, pluck} from 'rxjs/operators'

export interface VcsVcsProm {
    id: string;
    latency: number;
}

export interface ResultMetric {
    __name__: string;
    instance: string;
    job: string;
    vcs_id: string;
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

export class VcsPromDataSource {

    constructor(
        private httpClient: HttpClient,
    ) {
    }

    loadData(tags: string[]): Observable<ResultItem> {
        const url = this.queryBuilder(tags)
        return this.httpClient.get<PromResultData>(url).pipe(
            pluck('data'),
            mergeMap((items: PromResultData) => from(items.result)),
        )
    }

    queryBuilder(tags: string[]): string {
        return PROMETHEUS_PROXY + '/api/v1/query?query={__name__=~"' + tags.join('|') + '"}'
    }
}
