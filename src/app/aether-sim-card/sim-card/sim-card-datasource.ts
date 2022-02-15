/*
 * SPDX-FileCopyrightText: 2022-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { compare, RocDataSource } from '../../roc-data-source';
import { Enterprises } from '../../../openapi3/aether/2.0.0/models/enterprises';
import { Service as AetherService } from '../../../openapi3/aether/2.0.0/services/service';
import { BasketService } from '../../basket.service';
import { EnterprisesEnterpriseSiteSimCard } from '../../../openapi3/aether/2.0.0/models/enterprises-enterprise-site-sim-card';
import { from, Observable } from 'rxjs';
import { map, mergeMap, skipWhile, tap } from 'rxjs/operators';
import { EnterprisesEnterprise } from '../../../openapi3/aether/2.0.0/models/enterprises-enterprise';

export class SimCardDatasource extends RocDataSource<
    EnterprisesEnterpriseSiteSimCard,
    Enterprises
> {
    constructor(
        protected aetherService: AetherService,
        public bs: BasketService,
        protected target: string
    ) {
        super(aetherService, bs, target, '/sim-card-2.0.0', 'sim-card');
    }

    loadData(
        dataSourceObservable: Observable<Enterprises>,
        onDataLoaded: (
            dataSourceThisScope: RocDataSource<
                EnterprisesEnterpriseSiteSimCard,
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
                    value.site.forEach((s) => {
                        s['sim-card'].forEach((sc) => {
                            if (
                                !this.bs.containsDeleteEntry(
                                    '/Enterprises-2.0.0/enterprise[' +
                                        value['enterprise-id'] +
                                        ']/site[site-id=' +
                                        s['site-id'] +
                                        ']/sim-card[sim-id=' +
                                        sc['sim-id'] +
                                        ']'
                                )
                            ) {
                                sc['enterprise-id'] = value['enterprise-id'];
                                sc['site-id'] = s['site-id'];
                                this.data.push(sc);
                            } else {
                                console.log(
                                    'sim-id is already in basket',
                                    sc['sim-id']
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
        data: EnterprisesEnterpriseSiteSimCard[]
    ): EnterprisesEnterpriseSiteSimCard[] {
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
                case 'iccid':
                    return compare(a.iccid, b.iccid, isAsc);
                case 'imsi':
                    return compare(a.imsi, b.imsi, isAsc);
                default:
                    return 0;
            }
        });
    }
}
