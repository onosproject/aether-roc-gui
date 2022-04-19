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
import { SiteIpDomain, SiteList } from '../../../openapi3/aether/2.1.0/models';
import { TargetName } from '../../../openapi3/top/level/models';

export class IpDomainDatasource extends RocDataSource<SiteIpDomain, SiteList> {
    constructor(
        protected enterpriseService: EnterpriseService,
        public bs: BasketService
    ) {
        super(
            bs,
            enterpriseService,
            undefined,
            ['site-2.1.0', 'ip-domain'],
            ['site-id', 'ip-domain-id']
        );
    }

    loadData(
        dataSourceObservable: Observable<SiteList>,
        onDataLoaded: (
            dataSourceThisScope: RocDataSource<SiteIpDomain, SiteList>
        ) => void,
        enterpriseId?: TargetName
    ): void {
        dataSourceObservable.pipe(skipWhile((x) => x === undefined)).subscribe(
            (value: SiteList) => {
                value.forEach((s) => {
                    if (s['ip-domain']) {
                        s['ip-domain'].forEach((i) => {
                            i['enterprise-id'] = enterpriseId.name;
                            i['site-id'] = s['site-id'];
                            const fullPath = this.deletePath(
                                enterpriseId.name,
                                s['site-id'],
                                i['ip-domain-id']
                            );
                            if (this.bs.containsDeleteEntry(fullPath)) {
                                i[FORDELETE] = STRIKETHROUGH;
                            }
                            // Check for usages in device-groups
                            if (s['device-group']) {
                                s['device-group'].forEach((dg) => {
                                    if (dg['ip-domain'] === i['ip-domain-id']) {
                                        i[ISINUSE] = 'true'; // Any match will set it
                                    }
                                });
                            }
                            this.data.push(i);
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

    getSortedData(data: SiteIpDomain[]): SiteIpDomain[] {
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
                case 'dnn':
                    return compare(a.dnn, b.dnn, isAsc);
                case 'mtu':
                    return compare(a.mtu, b.mtu, isAsc);
                case 'admin-status':
                    return compare(a['admin-status'], b['admin-status'], isAsc);
                case 'subnet':
                    return compare(a.subnet, b.subnet, isAsc);
                default:
                    return 0;
            }
        });
    }
}
