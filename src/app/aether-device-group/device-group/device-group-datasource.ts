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
    EnterprisesEnterpriseSiteDeviceGroup,
} from '../../../openapi3/aether/2.0.0/models';
import { from, Observable } from 'rxjs';
import { map, mergeMap, skipWhile } from 'rxjs/operators';
import { AETHER_TARGET } from '../../../environments/environment';

export class DeviceGroupDatasource extends RocDataSource<
    EnterprisesEnterpriseSiteDeviceGroup,
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
            'enterprises-2.0.0',
            ['enterprise', 'site', 'device-group'],
            ['enterprise-id', 'site-id', 'device-group-id']
        );
    }

    loadData(
        dataSourceObservable: Observable<Enterprises>,
        onDataLoaded: (
            dataSourceThisScope: RocDataSource<
                EnterprisesEnterpriseSiteDeviceGroup,
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
                        s['device-group'].forEach((dg) => {
                            dg['enterprise-id'] = value['enterprise-id'];
                            dg['site-id'] = s['site-id'];
                            const fullPath = this.deletePath(
                                value['enterprise-id'],
                                s['site-id'],
                                dg['device-group-id']
                            );
                            if (this.bs.containsDeleteEntry(fullPath)) {
                                dg[FORDELETE] = STRIKETHROUGH;
                            }
                            // Check for usage in slices
                            s.slice.forEach((slice) => {
                                slice['device-group'].forEach((slicedg) => {
                                    if (
                                        slicedg['device-group'] ===
                                        dg['device-group-id']
                                    ) {
                                        dg[ISINUSE] = 'true'; // Any match will set it
                                    }
                                });
                            });
                            this.data.push(dg);
                        });
                    });
                },
                (error) => {
                    console.warn(
                        'Error getting data from ',
                        AETHER_TARGET,
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
        data: EnterprisesEnterpriseSiteDeviceGroup[]
    ): EnterprisesEnterpriseSiteDeviceGroup[] {
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
                case 'ip-domain':
                    return compare(a['ip-domain'], b['ip-domain'], isAsc);
                // case 'site':
                //     return compare(a.site, b.site, isAsc);
                default:
                    return 0;
            }
        });
    }
}
