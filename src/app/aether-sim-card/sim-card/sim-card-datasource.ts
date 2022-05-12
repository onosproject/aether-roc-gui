/*
 * SPDX-FileCopyrightText: 2022-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { compare, RocDataSource } from '../../roc-data-source';
import {
    BasketService,
    FORDELETE,
    ISINUSE,
    STRIKETHROUGH,
} from '../../basket.service';
import { Observable } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { EnterpriseService } from '../../enterprise.service';
import { SiteSimCard, SiteList } from '../../../openapi3/aether/2.1.0/models';
import { TargetName } from '../../../openapi3/top/level/models';

export class SimCardDatasource extends RocDataSource<SiteSimCard, SiteList> {
    constructor(
        protected enterpriseService: EnterpriseService,
        public bs: BasketService
    ) {
        super(
            bs,
            enterpriseService,
            undefined,
            ['site-2.1.0', 'sim-card'],
            ['site-id', 'sim-id']
        );
    }

    loadData(
        dataSourceObservable: Observable<SiteList>,
        onDataLoaded: (
            dataSourceThisScope: RocDataSource<SiteSimCard, SiteList>
        ) => void,
        enterpriseId?: TargetName
    ): void {
        dataSourceObservable.pipe(skipWhile((x) => x === undefined)).subscribe(
            (value: SiteList) => {
                value.forEach((s) => {
                    if (s['sim-card']) {
                        s['sim-card'].forEach((sc) => {
                            sc['enterprise-id'] = enterpriseId.name;
                            sc['site-id'] = s['site-id'];
                            const fullPath = this.deletePath(
                                enterpriseId.name,
                                s['site-id'],
                                sc['sim-card-id']
                            );
                            if (this.bs.containsDeleteEntry(fullPath)) {
                                sc[FORDELETE] = STRIKETHROUGH;
                            }
                            // Check for usages in device-groups
                            if (s['device']) {
                                if (
                                    s['device'].some(
                                        (d) => d['sim-card'] === sc['sim-id']
                                    )
                                ) {
                                    sc[ISINUSE] = 'true'; // Any match will set it
                                }
                            }
                            this.data.push(sc);
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

    getSortedData(data: SiteSimCard[]): SiteSimCard[] {
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
