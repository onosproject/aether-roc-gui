/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import {DataSource} from '@angular/cdk/collections';
import {AetherV100TargetSubscriber, AetherV100TargetSubscriberUe} from '../../../openapi3/aether/1.0.0/models';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {map, mergeMap} from 'rxjs/operators';
import {Observable, of as observableOf, merge, from} from 'rxjs';
import {AetherV100TargetService} from '../../../openapi3/aether/1.0.0/services';
import {MatTable} from '@angular/material/table';

export class SubscriberUeDataSource extends DataSource<AetherV100TargetSubscriberUe> {
    data: AetherV100TargetSubscriberUe[] = [];
    paginator: MatPaginator;
    sort: MatSort;

    constructor(
        private aetherV100TargetService: AetherV100TargetService,
        private targets: string[],
    ) {
        super();
    }

    /**
     * Connect this data source to the table. The table will only update when
     * the returned stream emits new items.
     * @returns A stream of the items to be rendered.
     */
    connect(): Observable<AetherV100TargetSubscriberUe[]> {
        // Combine everything that affects the rendered data into one update
        // stream for the data-table to consume.
        const dataMutations = [
            observableOf(this.data),
            this.paginator.page,
            this.sort.sortChange
        ];

        return merge(...dataMutations).pipe(map(() => {
            return this.getPagedData(this.getSortedData([...this.data]));
        }));
    }

    /**
     *  Called when the table is being destroyed. Use this function, to clean up
     * any open connections or free any held resources that were set up during connect.
     */
    disconnect(): void {
    }

    private getPagedData(data: AetherV100TargetSubscriberUe[]): AetherV100TargetSubscriberUe[] {
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        return data.splice(startIndex, this.paginator.pageSize);
    }

    /**
     * Sort the data (client-side). If you're using server-side sorting,
     * this would be replaced by requesting the appropriate data from the server.
     */
    private getSortedData(data: AetherV100TargetSubscriberUe[]): AetherV100TargetSubscriberUe[] {
        if (!this.sort.active || this.sort.direction === '') {
            return data;
        }

        return data.sort((a, b) => {
            const isAsc = this.sort.direction === 'asc';
            switch (this.sort.active) {
                case 'priority':
                    return compare(a.priority, b.priority, isAsc);
                case 'ueid':
                    return compare(+a.ueid, +b.ueid, isAsc);
                default:
                    return 0;
            }
        });
    }

    loadSubscriberUe(table: MatTable<AetherV100TargetSubscriberUe>): void {
        this.aetherV100TargetService.getAetherV100TargetSubscriber({
            target: this.targets[0]
        })
            .pipe(
                mergeMap((items: AetherV100TargetSubscriber) => from(items.ListAetherV100targetSubscriberUe))
            )
            .subscribe(
                (value => {
                    this.data.push(value);
                    table.renderRows();
                    console.log('Got Subscriber', value.ueid);
                }),
                error => {
                    console.warn('Error getting Subscribers for ', this.targets, error);
                },
                () => {
                    table.renderRows();
                    console.log('Finished loading subscribers');
                }
            );

    }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
