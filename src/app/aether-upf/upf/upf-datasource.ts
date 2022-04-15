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
import { SiteUpf, SiteList } from '../../../openapi3/aether/2.1.0/models';
import { TargetName } from '../../../openapi3/top/level/models/target-name';

export class UpfDatasource extends RocDataSource<SiteUpf, SiteList> {
    constructor(
        protected enterpriseService: EnterpriseService,
        public bs: BasketService
    ) {
        super(
            bs,
            enterpriseService,
            'site-2.1.0',
            ['site', 'upf'],
            ['site-id', 'upf-id']
        );
    }

    loadData(
        dataSourceObservable: Observable<SiteList>,
        onDataLoaded: (
            dataSourceThisScope: RocDataSource<SiteUpf, SiteList>
        ) => void,
        enterpriseId?: TargetName
    ): void {
        dataSourceObservable.pipe(skipWhile((x) => x === undefined)).subscribe(
            (value: SiteList) => {
                value.forEach((s) => {
                    if (s.upf) {
                        s.upf.forEach((u) => {
                            u['enterprise-id'] = enterpriseId.name;
                            u['site-id'] = s['site-id'];
                            const fullPath = this.deletePath(
                                enterpriseId.name,
                                s['site-id'],
                                u['upf-id']
                            );
                            if (this.bs.containsDeleteEntry(fullPath)) {
                                u[FORDELETE] = STRIKETHROUGH;
                            }
                            // Check for usages in slices
                            if (s.slice) {
                                s.slice.forEach((slice) => {
                                    if (slice['upf'] === u['upf-id']) {
                                        u[ISINUSE] = 'true'; // Any match will set it
                                    }
                                });
                            }
                            this.data.push(u);
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

    getSortedData(data: SiteUpf[]): SiteUpf[] {
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
                case 'port':
                    return compare(a.port, b.port, isAsc);
                default:
                    return 0;
            }
        });
    }
}
