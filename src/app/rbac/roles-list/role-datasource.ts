/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import {DataSource} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {map} from 'rxjs/operators';
import {Observable, of as observableOf, merge} from 'rxjs';
import {RbacV100TargetService} from '../../../openapi3/rbac/1.0.0/services';
import {RbacV100TargetRbacRole} from '../../../openapi3/rbac/1.0.0/models/rbac-v-100-target-rbac-role';

export class RoleDatasource extends DataSource<RbacV100TargetRbacRole> {
    data: Array<RbacV100TargetRbacRole> = [];
    paginator: MatPaginator;
    sort: MatSort;

    constructor(
        private rbacV100TargetService: RbacV100TargetService,
        private target: string,
    ) {
        super();
    }

    /**
     * Connect this data source to the table. The table will only update when
     * the returned stream emits new items.
     * @returns A stream of the items to be rendered.
     */
    connect(): Observable<RbacV100TargetRbacRole[]> {
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

    private getPagedData(data: RbacV100TargetRbacRole[]): RbacV100TargetRbacRole[] {
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        return data.splice(startIndex, this.paginator.pageSize);
    }

    /**
     * Sort the data (client-side). If you're using server-side sorting,
     * this would be replaced by requesting the appropriate data from the server.
     */
    private getSortedData(data: RbacV100TargetRbacRole[]): RbacV100TargetRbacRole[] {
        if (!this.sort.active || this.sort.direction === '') {
            return data;
        }

        return data.sort((a, b) => {
            const isAsc = this.sort.direction === 'asc';
            switch (this.sort.active) {
                case 'description':
                    return compare(a.description, b.description, isAsc);
                case 'roleid':
                    return compare(+a.roleid, +b.roleid, isAsc);
                default:
                    return 0;
            }
        });
    }

    loadRoles(): void {
        this.rbacV100TargetService.getRbacV100TargetRbac({
            target: this.target
        })
            .subscribe(
                (value => {
                    this.data = value.ListRbacV100targetRbacRole;
                    console.log('Got ', value.ListRbacV100targetRbacRole.length, ' Subscribers from ', this.target);
                }),
                error => {
                    console.warn('Error getting Subscribers for ', this.target, error);
                },
                () => {
                    // table.refreshRows() does not seem to work - using this trick instead
                    this.paginator._changePageSize(this.paginator.pageSize);
                }
            );
    }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
