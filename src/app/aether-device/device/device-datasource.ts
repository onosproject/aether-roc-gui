/*
 * SPDX-FileCopyrightText: 2022-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { compare, RocDataSource } from '../../roc-data-source';
import { Service as AetherService } from '../../../openapi3/aether/2.0.0/services/service';
import { BasketService } from '../../basket.service';
import { Enterprises } from '../../../openapi3/aether/2.0.0/models/enterprises';
import { from, Observable } from 'rxjs';
import { EnterprisesEnterpriseSiteDevice } from '../../../openapi3/aether/2.0.0/models/enterprises-enterprise-site-device';
import { map, mergeMap, skipWhile } from 'rxjs/operators';
import { EnterprisesEnterprise } from '../../../openapi3/aether/2.0.0/models/enterprises-enterprise';

export class DeviceDatasource extends RocDataSource<
    EnterprisesEnterpriseSiteDevice,
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
            '/Enterprises-2.0.0/enterprise',
            'enterprise',
            'enterprise-id'
        );
    }

    loadData(
        dataSourceObservable: Observable<Enterprises>,
        onDataLoaded: (
            dataSourceThisScope: RocDataSource<
                EnterprisesEnterpriseSiteDevice,
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
                        s.device.forEach((u) => {
                            if (
                                !this.bs.containsDeleteEntry(
                                    '/Enterprises-2.0.0/enterprise[' +
                                        value['enterprise-id'] +
                                        ']/site[site-id=' +
                                        s['site-id'] +
                                        ']/device[device-id=' +
                                        u['device-id'] +
                                        ']'
                                )
                            ) {
                                u['enterprise-id'] = value['enterprise-id'];
                                u['site-id'] = s['site-id'];
                                this.data.push(u);
                            } else {
                                console.log(
                                    'device-id is already in basket',
                                    u['device-id']
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
        data: EnterprisesEnterpriseSiteDevice[]
    ): EnterprisesEnterpriseSiteDevice[] {
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
                case 'device-id':
                    return compare(a['device-id'], b['device-id'], isAsc);
                case 'imei':
                    return compare(a.imei, b.imei, isAsc);
                default:
                    return 0;
            }
        });
    }
}
