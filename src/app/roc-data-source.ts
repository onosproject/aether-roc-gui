/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Service as AetherService } from '../openapi3/aether/2.0.0/services';
import { ADDITIONALPROPS, BasketService } from './basket.service';
import { from, merge, Observable, of as observableOf } from 'rxjs';
import { map, mergeMap, skipWhile } from 'rxjs/operators';

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
export function compare(
    a: string | number,
    b: string | number,
    isAsc: boolean
): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

// eg: VcsVcs
export interface RocGenericModelType {
    // id: string;
    description?: string;
}

// eg: Vcs
export interface RocGenericContainerType {
    [key: string]: string | RocGenericModelType[] | unknown;
}

export interface GenericRocDataSource<
    T extends RocGenericModelType,
    U extends RocGenericContainerType
> {
    connect(): Observable<T[]>;

    disconnect(): void;

    loadData(
        dataSourceObservable: Observable<U>,
        onDataLoaded: (
            dataSourceThisScope: RocDataSource<RocGenericModelType, U>
        ) => void
    ): void;

    delete(id: string): void;
}

// RocDataSource is an abstract class that extends data source
// T is the type of list item e.g. ConnectivityServiceConnectivityService
// U is the type of its parent e.g. ConnectivityService
export abstract class RocDataSource<
        T extends RocGenericModelType,
        U extends RocGenericContainerType
    >
    extends DataSource<T>
    implements GenericRocDataSource<T, U>
{
    public data: Array<T> = [];
    paginator: MatPaginator;
    sort: MatSort;

    protected constructor(
        protected aetherService: AetherService,
        public bs: BasketService,
        protected target: string,
        protected pathRoot: string,
        protected pathListAttr: string,
        protected indexAttr: string = 'id',
        protected nameAttr: string = 'display-name',
        protected descAttr: string = 'description'
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
            this.sort.sortChange,
        ];

        return merge(...dataMutations).pipe(
            map(() => {
                return this.getPagedData(this.getSortedData([...this.data]));
            })
        );
    }

    /**
     *  Called when the table is being destroyed. Use this function, to clean up
     * any open connections or free any held resources that were set up during connect.
     */
    disconnect(): void {
        console.log('disconnect');
    }

    private getPagedData(data: T[]): T[] {
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        return data.splice(startIndex, this.paginator.pageSize);
    }

    /**
     * Sort the data (client-side). If you're using server-side sorting,
     * this would be replaced by requesting the appropriate data from the server.
     */
    getSortedData(data: T[]): T[] {
        if (!this.sort.active || this.sort.direction === '') {
            return data.sort((a, b) => {
                return compare(a[this.nameAttr], b[this.nameAttr], true);
            });
        }
        return data.sort((a, b) => {
            const isAsc = this.sort.direction === 'asc';
            switch (this.sort.active) {
                case 'description':
                    return compare(+a[this.descAttr], +b[this.descAttr], isAsc);
                case 'id':
                    return compare(+a[this.nameAttr], +b[this.nameAttr], isAsc);
                default:
                    return 0;
            }
        });
    }

    loadData(
        dataSourceObservable: Observable<U>,
        onDataLoaded: (dataSourceThisScope: RocDataSource<T, U>) => void
    ): void {
        dataSourceObservable
            .pipe(
                map((x) => x?.[this.pathListAttr]),
                skipWhile((x) => x === undefined),
                mergeMap((items: T[]) => from(items))
            )
            .subscribe(
                (value) => {
                    const id = value[this.indexAttr];
                    if (
                        !this.bs.containsDeleteEntry(
                            this.pathRoot +
                                '/' +
                                this.pathListAttr +
                                '[' +
                                this.indexAttr +
                                '=' +
                                id +
                                ']/' +
                                this.indexAttr
                        ) ||
                        (this.pathRoot === '/slice-2.0.0' &&
                            this.pathListAttr === this.pathListAttr)
                    ) {
                        this.data.push(value);
                        console.log('Got ' + id);
                    } else {
                        console.log('Ignoring ' + id + ' (is on delete list)');
                    }
                },
                (error) => {
                    console.warn(
                        'Error getting data from ',
                        this.target,
                        error
                    );
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
        const deletedIndex = this.data.findIndex(
            (p) => p[this.indexAttr] === id
        );
        this.data.splice(deletedIndex, 1);
        this.paginator._changePageSize(this.paginator.pageSize);
    }

    /**
     * Iterates over items updated in the basket and merge them with the existing data
     * @param basketData: a list of items of type T contained in the basket to be merged with the data coming from the API
     * @param nestedLists: a list of object that specify the nested attributes of a model with their IDs, see Vcs component for an example
     */
    merge(
        basketData: T[],
        nestedLists: { fieldName: string; idAttr: string }[] = []
    ): void {
        const nestedListFields = nestedLists.map((i) => i.fieldName);

        basketData.forEach((updated) => {
            const existing: T = this.data.filter(
                (e) => e['ent-id'] === updated['ent-id']
            )[0];
            if (!existing) {
                console.warn(
                    `Item with ID ${updated['ent-id']} does not exist in datasource ${this.pathRoot}`
                );
                return;
            }

            // iterate over the keys for each updated item and update the corresponding existing item
            Object.keys(updated).forEach((k) => {
                if (k === ADDITIONALPROPS || k === 'id') {
                    // nothing to update here
                    return;
                }

                // if it is a nested list then it deserve a particular treatment
                if (nestedListFields.indexOf(k) > -1) {
                    // get the nested object definition
                    const field = nestedLists.filter(
                        (f) => f.fieldName === k
                    )[0];

                    // for each updated element in the nested list
                    updated[k].forEach((_updated) => {
                        // find the existing one
                        const _existing = existing[field.fieldName].filter(
                            (e) => e[field.idAttr] === _updated[field.idAttr]
                        )[0];

                        if (!_existing) {
                            // if it does not exist, then it's a new item that was added
                            existing[field.fieldName].push(_updated);
                        } else {
                            // update all the keys except the ID
                            Object.keys(_updated).forEach((_k) => {
                                if (_k !== field.idAttr) {
                                    _existing[_k] = _updated[_k];
                                }
                            });
                        }
                    });
                    return;
                }

                // update the value in the existing model with the updated value from the basket
                existing[k] = updated[k];
            });
        });
    }
}
