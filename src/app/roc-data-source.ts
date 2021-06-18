/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import {DataSource} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Service as AetherService} from '../openapi3/aether/3.0.0/services';
import {BasketService} from './basket.service';
import {from, merge, Observable, of as observableOf} from 'rxjs';
import {map, mergeMap, pluck} from 'rxjs/operators';
import {compare} from './aether-profiles/util';

// RocDataSource is an abstract class that extends data source
// T is the type of list item e.g. ConnectivityServiceConnectivityService
// U is the type of its parent e.g. ConnectivityService
export abstract class RocDataSource<T, U> extends DataSource<T> {
    data: Array<T> = [];
    paginator: MatPaginator;
    sort: MatSort;

    protected constructor(
        protected aetherService: AetherService,
        protected bs: BasketService,
        protected target: string,
        protected pathRoot: string,
        protected pathListAttr: string,
        protected indexAttr: string = 'id',
        protected descAttr: string = 'description',
    ) {
        super();
    }

    /**
     * Connect this data source to the table. The table will only update when
     * the returned stream emits new items.
     * @returns A stream of the items to be rendered.
     */
    connect(): Observable<T[]> {
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

    private getPagedData(data: T[]): T[] {
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        return data.splice(startIndex, this.paginator.pageSize);
    }

    /**
     * Sort the data (client-side). If you're using server-side sorting,
     * this would be replaced by requesting the appropriate data from the server.
     */
    private getSortedData(data: T[]): T[] {
        if (!this.sort.active || this.sort.direction === '') {
            return data;
        }

        return data.sort((a, b) => {
            const isAsc = this.sort.direction === 'asc';
            switch (this.sort.active) {
                case 'description':
                    return compare(a[this.descAttr], a[this.descAttr], isAsc);
                case 'id':
                    return compare(+a[this.indexAttr], +b[this.indexAttr], isAsc);
                default:
                    return 0;
            }
        });
    }

    loadData(dataSourceObservable: Observable<U>, onDataLoaded: (dataSourceThisScope: RocDataSource<T, U>) => void): void {
        dataSourceObservable.pipe(
            pluck(this.pathListAttr),
            mergeMap((items: T[]) => from(items)),
        ).subscribe(
            (value => {
                const id = value[this.indexAttr];
                if (!this.bs.containsDeleteEntry(
                    this.pathRoot + '/' + this.pathListAttr + '[' + this.indexAttr + '=' + id + ']/' + this.indexAttr)) {
                    this.data.push(value);
                    console.log('Got ' + id);
                } else {
                    console.log('Ignoring ' + id + ' (is on delete list)');
                }
            }),
            error => {
                console.warn('Error getting data from ', this.target, error);
            },
            () => {
                // table.refreshRows() does not seem to work - using this trick instead
                // const basketPreview = this.bs.buildPatchBody().Updates;
                onDataLoaded(this);
                this.paginator._changePageSize(this.paginator.pageSize);
            }
        );
    }

    delete(id: string): void {
        this.bs.deleteIndexedEntry(this.pathRoot + '/' + this.pathListAttr + '[' + this.indexAttr + '=' + id + ']', this.indexAttr, id);
        const deletedIndex = this.data.findIndex(p => p[this.indexAttr] === id);
        this.data.splice(deletedIndex, 1);
        this.paginator._changePageSize(this.paginator.pageSize);
    }
}
