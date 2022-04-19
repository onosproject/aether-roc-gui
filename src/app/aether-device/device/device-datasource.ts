/*
 * SPDX-FileCopyrightText: 2022-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { compare, RocDataSource } from '../../roc-data-source';
import { BasketService, FORDELETE, STRIKETHROUGH } from '../../basket.service';
import { Observable } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { EnterpriseService } from '../../enterprise.service';
import { SiteDevice, SiteList } from '../../../openapi3/aether/2.1.0/models';
import { TargetName } from '../../../openapi3/top/level/models';

export class DeviceDatasource extends RocDataSource<SiteDevice, SiteList> {
    constructor(
        protected enterpriseService: EnterpriseService,
        public bs: BasketService
    ) {
        super(
            bs,
            enterpriseService,
            undefined,
            ['site-2.1.0', 'device'],
            ['site-id', 'device-id']
        );
    }

    loadData(
        dataSourceObservable: Observable<SiteList>,
        onDataLoaded: (
            dataSourceThisScope: RocDataSource<SiteDevice, SiteList>
        ) => void,
        enterpriseId?: TargetName
    ): void {
        dataSourceObservable.pipe(skipWhile((x) => x === undefined)).subscribe(
            (value: SiteList) => {
                value.forEach((s) => {
                    if (s.device) {
                        s.device.forEach((d) => {
                            d['enterprise-id'] = enterpriseId.name;
                            d['site-id'] = s['site-id'];
                            const fullPath = this.deletePath(
                                enterpriseId.name,
                                s['site-id'],
                                d['slice-id']
                            );
                            if (this.bs.containsDeleteEntry(fullPath)) {
                                d[FORDELETE] = STRIKETHROUGH;
                            }
                            this.data.push(d);
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

    getSortedData(data: SiteDevice[]): SiteDevice[] {
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
