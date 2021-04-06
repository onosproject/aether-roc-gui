/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import {DataSource} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Service as AetherService} from '../../../openapi3/aether/2.1.0/services';
import {AccessProfileAccessProfile} from '../../../openapi3/aether/2.1.0/models';
import {merge, Observable, of as observableOf} from 'rxjs';
import {map} from 'rxjs/operators';
import {compare} from '../util';

export class AccessProfilesDatasource extends DataSource<AccessProfileAccessProfile> {
    data: Array<AccessProfileAccessProfile> = [];
    paginator: MatPaginator;
    sort: MatSort;

    constructor(
        private aetherService: AetherService,
        private targets: string[],
    ) {
        super();
    }

    /**
     * Connect this data source to the table. The table will only update when
     * the returned stream emits new items.
     * @returns A stream of the items to be rendered.
     */
    connect(): Observable<AccessProfileAccessProfile[]> {
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

    private getPagedData(data: AccessProfileAccessProfile[]): AccessProfileAccessProfile[] {
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        return data.splice(startIndex, this.paginator.pageSize);
    }

    /**
     * Sort the data (client-side). If you're using server-side sorting,
     * this would be replaced by requesting the appropriate data from the server.
     */
    private getSortedData(data: AccessProfileAccessProfile[]): AccessProfileAccessProfile[] {
        if (!this.sort.active || this.sort.direction === '') {
            return data;
        }

        return data.sort((a, b) => {
            const isAsc = this.sort.direction === 'asc';
            switch (this.sort.active) {
                case 'description':
                    return compare(a.description, b.description, isAsc);
                case 'id':
                    return compare(+a.id, +b.id, isAsc);
                default:
                    return 0;
            }
        });
    }

    loadAccessProfileAccessProfile(): void {
        this.aetherService.getAccessProfile({
            target: this.targets[0]
        })
            .subscribe(
                (value => {
                    if (value !== null) {
                        this.data = value['access-profile'];
                        console.log('Got ', value['access-profile'].length,
                            ' AccessProfiles from ', this.targets);
                    } else {
                        console.log('No AccessProfiles found');
                    }
                }),
                error => {
                    console.warn('Error getting AccessProfiles for ', this.targets, error);
                },
                () => {
                    // table.refreshRows() does not seem to work - using this trick instead
                    this.paginator._changePageSize(this.paginator.pageSize);
                }
            );
    }
}
