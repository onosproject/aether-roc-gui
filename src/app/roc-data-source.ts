/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Service as AetherService } from '../openapi3/aether/4.0.0/services';
import { BasketService, REQDATTRIBS } from './basket.service';
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
        protected nameAttr: string = 'display-name',
        protected descAttr: string = 'description',
        protected enterpriseAttr: string = 'enterprise',
        protected siteAttr: string = 'site',
        protected DBAttr: string = 'default-behavior',
        protected sdAttr: string = 'sd',
        protected sstAttr: string = 'sst',
        protected upfAttr: string = 'upf',
        protected dgAttr: string = 'device-group',
        protected addressAttr: string = 'address',
        protected CEPAttr: string = 'config-endpoint',
        protected portAttr: string = 'port',
        protected IPDAttr: string = 'ip-domain',
        protected pelrAttr: string = 'pelr',
        protected pdbAttr: string = 'pdb',
        protected arpAttr: string = 'arp',
        protected qciAttr: string = 'qci',
        protected subnetAttr: string = 'subnet',
        protected AdminStatusAttr: string = 'admin-status',
        protected mtuAttr: string = 'mtu',
        protected dnnAttr: string = 'dnn',
        protected coreEPAttr: string = 'core-5g-endpoint'
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
    disconnect(): void {}

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
            return data.sort((a, b) => {
                return compare(a[this.nameAttr], b[this.nameAttr], true);
            });
        }

        return data.sort((a, b) => {
            const isAsc = this.sort.direction === 'asc';
            switch (this.sort.active) {
                case 'core-5g-endpoint':
                    return compare(
                        a[this.coreEPAttr],
                        b[this.coreEPAttr],
                        isAsc
                    );
                case 'dnn':
                    return compare(a[this.dnnAttr], b[this.dnnAttr], isAsc);
                case 'mtu':
                    return compare(a[this.mtuAttr], b[this.mtuAttr], isAsc);
                case 'admin-status':
                    return compare(
                        a[this.AdminStatusAttr],
                        b[this.AdminStatusAttr],
                        isAsc
                    );
                case 'subnet':
                    return compare(
                        a[this.subnetAttr],
                        b[this.subnetAttr],
                        isAsc
                    );
                case 'qci':
                    return compare(a[this.qciAttr], b[this.qciAttr], isAsc);
                case 'arp':
                    return compare(a[this.arpAttr], b[this.arpAttr], isAsc);
                case 'pdb':
                    return compare(a[this.pdbAttr], b[this.pdbAttr], isAsc);
                case 'pelr':
                    return compare(a[this.pelrAttr], b[this.pelrAttr], isAsc);
                case 'ip-domain':
                    return compare(+a[this.IPDAttr], +b[this.IPDAttr], isAsc);
                case 'port':
                    return compare(a[this.portAttr], b[this.portAttr], isAsc);
                case 'config-endpoint':
                    return compare(a[this.CEPAttr], b[this.CEPAttr], isAsc);
                case 'address':
                    return compare(
                        a[this.addressAttr],
                        b[this.addressAttr],
                        isAsc
                    );
                case 'device-group':
                    return compare(a[this.dgAttr], b[this.dgAttr], isAsc);
                case 'upf':
                    return compare(a[this.upfAttr], b[this.upfAttr], isAsc);
                case 'sst':
                    return compare(+a[this.sstAttr], +b[this.sstAttr], isAsc);
                case 'sd':
                    return compare(+a[this.sdAttr], +b[this.sdAttr], isAsc);
                case 'default-behavior':
                    return compare(a[this.DBAttr], b[this.DBAttr], isAsc);
                case 'site':
                    return compare(a[this.siteAttr], b[this.siteAttr], isAsc);
                case 'enterprise':
                    return compare(
                        a[this.enterpriseAttr],
                        b[this.enterpriseAttr],
                        isAsc
                    );
                case 'description':
                    return compare(a[this.descAttr], b[this.descAttr], isAsc);
                case 'id':
                    return compare(a[this.nameAttr], b[this.nameAttr], isAsc);
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
                        (this.pathRoot === '/vcs-4.0.0' &&
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
}
