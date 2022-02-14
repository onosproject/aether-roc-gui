/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
    Enterprises,
    EnterprisesEnterprise,
    EnterprisesEnterpriseSiteIpDomain,
    EnterprisesEnterpriseSiteSlice,
} from '../../../openapi3/aether/2.0.0/models';
import { Service as AetherService } from '../../../openapi3/aether/2.0.0/services';
import { BasketService } from '../../basket.service';
import { compare, RocDataSource } from '../../roc-data-source';
import { from, Observable } from 'rxjs';
import { map, mergeMap, skipWhile } from 'rxjs/operators';

export class SliceDatasource extends RocDataSource<
    EnterprisesEnterpriseSiteSlice,
    any
> {
    constructor(
        protected aetherService: AetherService,
        public bs: BasketService,
        protected target: string
    ) {
        super(aetherService, bs, target, '/slice-2.0.0', 'slice');
    }

    loadData(
        dataSourceObservable: Observable<Enterprises>,
        onDataLoaded: (
            dataSourceThisScope: RocDataSource<
                EnterprisesEnterpriseSiteSlice,
                any
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
                    value.site.forEach((s) => {
                        s.slice.forEach((i) => {
                            if (
                                !this.bs.containsDeleteEntry(
                                    '/enterprises/enterprise[' +
                                        value['enterprise-id'] +
                                        '/site[site-id=' +
                                        s['site-id'] +
                                        '/slice[slice-id=' +
                                        i['slice-id'] +
                                        ']'
                                )
                            ) {
                                i['enterprise-id'] = value['enterprise-id'];
                                i['site-id'] = s['site-id'];
                                this.data.push(i);
                            } else {
                                console.log(
                                    'slice-id is already in basket',
                                    i['slice-id']
                                );
                            }
                        });
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
        data: EnterprisesEnterpriseSiteSlice[]
    ): EnterprisesEnterpriseSiteSlice[] {
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
                case 'upf':
                    return compare(a.upf, b.upf, isAsc);
                case 'default-behavior':
                    return compare(
                        a['default-behavior'],
                        b['default-behavior'],
                        isAsc
                    );
                default:
                    return 0;
            }
        });
    }
}
