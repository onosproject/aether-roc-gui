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
    EnterprisesEnterpriseSiteIpDomain,
} from '../../../openapi3/aether/2.0.0/models';
import { from, Observable } from 'rxjs';
import { map, mergeMap, skipWhile } from 'rxjs/operators';

export class IpDomainDatasource extends RocDataSource<
    EnterprisesEnterpriseSiteIpDomain,
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
            ['enterprise', 'site', 'ip-domain'],
            ['enterprise-id', 'site-id', 'ip-domain-id']
        );
    }

    loadData(
        dataSourceObservable: Observable<Enterprises>,
        onDataLoaded: (
            dataSourceThisScope: RocDataSource<
                EnterprisesEnterpriseSiteIpDomain,
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
                        s['ip-domain'].forEach((i) => {
                            i['enterprise-id'] = value['enterprise-id'];
                            i['site-id'] = s['site-id'];
                            const fullPath = this.deletePath(
                                value['enterprise-id'],
                                s['site-id'],
                                i['ip-domain-id']
                            );
                            if (this.bs.containsDeleteEntry(fullPath)) {
                                i[FORDELETE] = STRIKETHROUGH;
                            }
                            // Check for usages in device-groups
                            s['device-group'].forEach((dg) => {
                                if (dg['ip-domain'] === i['ip-domain-id']) {
                                    i[ISINUSE] = 'true'; // Any match will set it
                                }
                            });
                            this.data.push(i);
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
        data: EnterprisesEnterpriseSiteIpDomain[]
    ): EnterprisesEnterpriseSiteIpDomain[] {
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
