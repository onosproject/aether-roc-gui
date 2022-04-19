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
import { Observable } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { EnterpriseService } from '../../enterprise.service';
import {
    SiteDeviceGroup,
    SiteList,
} from '../../../openapi3/aether/2.1.0/models';
import { TargetName } from '../../../openapi3/top/level/models';

export class DeviceGroupDatasource extends RocDataSource<
    SiteDeviceGroup,
    SiteList
> {
    constructor(
        protected enterpriseService: EnterpriseService,
        public bs: BasketService
    ) {
        super(
            bs,
            enterpriseService,
            undefined,
            ['site-2.1.0', 'device-group'],
            ['site-id', 'device-group-id']
        );
    }

    loadData(
        dataSourceObservable: Observable<SiteList>,
        onDataLoaded: (
            dataSourceThisScope: RocDataSource<SiteDeviceGroup, SiteList>
        ) => void,
        enterpriseId?: TargetName
    ): void {
        dataSourceObservable.pipe(skipWhile((x) => x === undefined)).subscribe(
            (value: SiteList) => {
                value.forEach((s) => {
                    if (s['device-group']) {
                        s['device-group'].forEach((dg) => {
                            dg['enterprise-id'] = enterpriseId.name;
                            dg['site-id'] = s['site-id'];
                            const fullPath = this.deletePath(
                                enterpriseId.name,
                                s['site-id'],
                                dg['device-group-id']
                            );
                            if (this.bs.containsDeleteEntry(fullPath)) {
                                dg[FORDELETE] = STRIKETHROUGH;
                            }
                            // Check for usage in slices
                            if (s.slice) {
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
                            }
                        });
                    }
                });
            },
            (error) => {
                console.warn('Error getting data from ', enterpriseId, error);
            },
            () => {
                // table.refreshRows() does not seem to work - using this trick instead
                // const basketPreview = this.bs.buildPatchBody().Updates;
                onDataLoaded(this);
                this.paginator._changePageSize(this.paginator.pageSize);
            }
        );
    }

    getSortedData(data: SiteDeviceGroup[]): SiteDeviceGroup[] {
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
