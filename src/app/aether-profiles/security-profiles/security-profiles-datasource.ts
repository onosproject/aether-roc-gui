/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {DataSource} from '@angular/cdk/collections';
import {SecurityProfileSecurityProfile} from '../../../openapi3/aether/2.0.0/models/security-profile-security-profile';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ApiService, Service as AetherV200TargetService} from '../../../openapi3/aether/2.0.0/services';
import {merge, Observable, of as observableOf} from 'rxjs';
import {map} from 'rxjs/operators';
import {compare} from '../util';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpErrorResponse} from '@angular/common/http';

export class SecurityProfilesDatasource extends DataSource<SecurityProfileSecurityProfile> {
    data: Array<SecurityProfileSecurityProfile> = [];
    paginator: MatPaginator;
    sort: MatSort;

    constructor(
        private aetherV200TargetService: AetherV200TargetService,
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
    connect(): Observable<SecurityProfileSecurityProfile[]> {
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

    private getPagedData(data: SecurityProfileSecurityProfile[]): SecurityProfileSecurityProfile[] {
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        return data.splice(startIndex, this.paginator.pageSize);
    }

    /**
     * Sort the data (client-side). If you're using server-side sorting,
     * this would be replaced by requesting the appropriate data from the server.
     */
    private getSortedData(data: SecurityProfileSecurityProfile[]): SecurityProfileSecurityProfile[] {
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

    loadSecurityProfileSecurityProfile(): void {
        this.aetherV200TargetService.getSecurityProfile({
            target: this.targets[0]
        })
            .subscribe(
                (value => {
                    if (value !== null) {
                        this.data = value['Security-profile'];
                        console.log('Got ', value['Security-profile'].length, ' SecurityProfiles from ', this.targets);
                    } else {
                        console.log('No SecurityProfiles found');
                    }
                }),
                error => {
                    console.warn('Error getting SecurityProfiles for ', this.targets, error);
                },
                () => {
                    // table.refreshRows() does not seem to work - using this trick instead
                    this.paginator._changePageSize(this.paginator.pageSize);
                }
            );
    }

    deleteSecurityProfileSecurityProfile(id: string, snackBar: MatSnackBar): void {
        this.aetherApiService.deleteSecurityProfileSecurityProfile({
            id,
            target: this.targets[0],
        }).subscribe(
            (value => {
                this.data = this.data.filter(u => u.id !== id);
                snackBar.open('Security Profile ' + id + ' deleted.', null, {duration: 2000});
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
