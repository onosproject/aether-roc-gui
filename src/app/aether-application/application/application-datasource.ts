/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Service as AetherService } from '../../../openapi3/aether/2.0.0/services';
import {
    BasketService,
    FORDELETE,
    ISINUSE,
    STRIKETHROUGH,
} from '../../basket.service';
import { compare, RocDataSource } from '../../roc-data-source';
import {
    Enterprises,
    EnterprisesEnterprise,
    EnterprisesEnterpriseApplication,
} from '../../../openapi3/aether/2.0.0/models';
import { from, Observable } from 'rxjs';
import { map, mergeMap, skipWhile } from 'rxjs/operators';

export class ApplicationDatasource extends RocDataSource<
    EnterprisesEnterpriseApplication,
    Enterprises
> {
    constructor(
        protected aetherService: AetherService,
        public bs: BasketService,
        protected target: string
    ) {
        super(
            aetherService,
            bs,
            target,
            'Enterprises-2.0.0',
            ['enterprise', 'application'],
            ['enterprise-id', 'application-id']
        );
    }

    loadData(
        dataSourceObservable: Observable<Enterprises>,
        onDataLoaded: (
            dataSourceThisScope: RocDataSource<
                EnterprisesEnterpriseApplication,
                Enterprises
            >
        ) => void
    ): void {
        dataSourceObservable
            .pipe(
                map((x: Enterprises) => x?.enterprise),
                skipWhile((x) => x === undefined),
                mergeMap((items: EnterprisesEnterprise[]) => from(items))
            )
            .subscribe(
                (value: EnterprisesEnterprise) => {
                    value.application.forEach((app) => {
                        app['enterprise-id'] = value['enterprise-id'];
                        const fullPath = this.deletePath(
                            value['enterprise-id'],
                            app['application-id']
                        );
                        if (this.bs.containsDeleteEntry(fullPath)) {
                            app[FORDELETE] = STRIKETHROUGH;
                        }
                        // Check for usages in slices
                        value.site.forEach((site) => {
                            site.slice.forEach((slice) => {
                                slice.filter.forEach((filter) => {
                                    if (
                                        filter.application ===
                                        app['application-id']
                                    ) {
                                        app[ISINUSE] = 'true'; // Any match will set it
                                    }
                                });
                            });
                        });

                        this.data.push(app);
                    });
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

    getSortedData(
        data: EnterprisesEnterpriseApplication[]
    ): EnterprisesEnterpriseApplication[] {
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
                // case 'enterprise':
                //     return compare(a.enterprise, b.enterprise, isAsc);
                default:
                    return 0;
            }
        });
    }
}
