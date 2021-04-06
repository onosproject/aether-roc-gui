/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import {DataSource} from '@angular/cdk/collections';
import {SubscriberUe} from '../../../openapi3/aether/2.1.0/models';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {map} from 'rxjs/operators';
import {Observable, of as observableOf, merge} from 'rxjs';
import {
    Service as AetherService,
    ApiService
} from '../../../openapi3/aether/2.1.0/services';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpErrorResponse} from '@angular/common/http';

export class SubscriberUeDataSource extends DataSource<SubscriberUe> {
    data: Array<SubscriberUe> = [];
    paginator: MatPaginator;
    sort: MatSort;

    constructor(
        private aetherService: AetherService,
        private aetherApiService: ApiService,
        private targets: string[],
    ) {
        super();
    }

    /**
     * Connect this data source to the table. The table will only update when
     * the returned stream emits new items.
     * @returns A stream of the items to be rendered.
     */
    connect(): Observable<SubscriberUe[]> {
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

    private getPagedData(data: SubscriberUe[]): SubscriberUe[] {
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        return data.splice(startIndex, this.paginator.pageSize);
    }

    /**
     * Sort the data (client-side). If you're using server-side sorting,
     * this would be replaced by requesting the appropriate data from the server.
     */
    private getSortedData(data: SubscriberUe[]): SubscriberUe[] {
        if (!this.sort.active || this.sort.direction === '') {
            return data;
        }

        return data.sort((a, b) => {
            const isAsc = this.sort.direction === 'asc';
            switch (this.sort.active) {
                case 'priority':
                    return compare(a.priority, b.priority, isAsc);
                case 'id':
                    return compare(+a.id, +b.id, isAsc);
                default:
                    return 0;
            }
        });
    }

    loadSubscriberUe(): void {
        this.aetherService.getSubscriber({
            target: this.targets[0]
        })
            .subscribe(
                (value => {
                    if (value !== null) {
                        this.data = value.ue;
                        console.log('Got ', value.ue.length, ' Subscribers from ', this.targets);
                    } else {
                        console.log('No Subscribers found');
                    }
                }),
                error => {
                    console.warn('Error getting Subscribers for ', this.targets, error);
                },
                () => {
                    // table.refreshRows() does not seem to work - using this trick instead
                    this.paginator._changePageSize(this.paginator.pageSize);
                }
            );
    }

    deleteSubscriberUe(id: string, snackBar: MatSnackBar): void {
        this.aetherApiService.deleteSubscriberUe({
            id,
            target: this.targets[0],
        }).subscribe(
            (value => {
                this.data = this.data.filter(u => u.id !== id);
                snackBar.open('Subscriber ' + id + ' deleted.', null, {duration: 2000});
                this.paginator._changePageSize(this.paginator.pageSize);
            }),
            (error => {
                    const errHttp = error as HttpErrorResponse;
                    snackBar.open('Error: ' + errHttp.message + ', ' + errHttp.error, 'dismiss', {duration: 10000});
                    throw error;
                }
            ),
        );
    }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
