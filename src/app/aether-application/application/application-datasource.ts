/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
    BasketService,
    FORDELETE,
    ISINUSE,
    STRIKETHROUGH,
} from '../../basket.service';
import { compare, RocDataSource } from '../../roc-data-source';
import {
    Application,
    ApplicationList,
    Site,
} from '../../../openapi3/aether/2.1.0/models';
import { from, Observable } from 'rxjs';
import { mergeMap, skipWhile } from 'rxjs/operators';
import { EnterpriseService } from '../../enterprise.service';
import { TargetName } from '../../../openapi3/top/level/models';
import { SiteService } from '../../../openapi3/aether/2.1.0/services';
import { HttpErrorResponse } from '@angular/common/http';

export class ApplicationDatasource extends RocDataSource<
    Application,
    ApplicationList
> {
    constructor(
        public bs: BasketService,
        protected enterpriseService: EnterpriseService,
        protected siteService: SiteService
    ) {
        super(
            bs,
            enterpriseService,
            undefined,
            ['application-2.1.0'],
            ['application-id']
        );
    }

    loadData(
        dataSourceObservable: Observable<ApplicationList>,
        onDataLoaded: (
            dataSourceThisScope: RocDataSource<Application, ApplicationList>
        ) => void,
        enterpriseId?: TargetName
    ): void {
        dataSourceObservable
            .pipe(
                skipWhile((x) => x === undefined),
                mergeMap((items: Application[]) => from(items))
            )
            .subscribe(
                (app: Application) => {
                    app['enterprise-id'] = enterpriseId.name;
                    const fullPath = this.deletePath(
                        enterpriseId.name,
                        app['application-id']
                    );
                    if (this.bs.containsDeleteEntry(fullPath)) {
                        app[FORDELETE] = STRIKETHROUGH;
                    }
                    // Check for usages in slices
                    this.siteService
                        .getSiteList({
                            'enterprise-id': enterpriseId.name,
                        })
                        .pipe(mergeMap((sites: Site[]) => from(sites)))
                        .subscribe((site: Site) => {
                            if (site.slice) {
                                site.slice.forEach((slice) => {
                                    if (slice.filter) {
                                        slice.filter.forEach((filter) => {
                                            if (
                                                filter.application ===
                                                app['application-id']
                                            ) {
                                                app[ISINUSE] = 'true'; // Any match will set it
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    this.data.push(app);
                },
                (error) => {
                    if (
                        error instanceof HttpErrorResponse &&
                        error['status'] === 404
                    ) {
                        return;
                    }
                    console.warn(
                        'Error getting data from ',
                        enterpriseId,
                        error
                    );
                },
                () => {
                    // table.refreshRows() does not seem to work - using this trick instead
                    // const basketPreview = this.bs.buildPatchBody().Updates;
                    // onDataLoaded(this);
                    this.paginator._changePageSize(this.paginator.pageSize);
                }
            );
    }

    getSortedData(data: Application[]): Application[] {
        if (
            !this.sort.active ||
            this.sort.direction === '' ||
            this.sort.active === 'id' ||
            this.sort.active === 'description'
        ) {
            return super.getSortedData(data);
        }
        return data.sort((a, b) => {
            const isAsc = this.sort.direction === 'asc';
            switch (this.sort.active) {
                case 'address':
                    return compare(a.address, b.address, isAsc);
                default:
                    return 0;
            }
        });
    }
}
