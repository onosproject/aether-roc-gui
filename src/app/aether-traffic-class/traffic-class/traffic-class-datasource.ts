/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { compare, RocDataSource } from '../../roc-data-source';
import {
    Enterprises,
    EnterprisesEnterprise,
    EnterprisesEnterpriseTrafficClass,
} from '../../../openapi3/aether/2.0.0/models';
import { Service as AetherService } from '../../../openapi3/aether/2.0.0/services';
import {
    BasketService,
    FORDELETE,
    ISINUSE,
    STRIKETHROUGH,
} from '../../basket.service';
import { from, Observable } from 'rxjs';
import { map, mergeMap, skipWhile } from 'rxjs/operators';

export class TrafficClassDatasource extends RocDataSource<
    EnterprisesEnterpriseTrafficClass,
    Enterprises
> {
    constructor(
        protected aetherService: AetherService,
        public bs: BasketService,
        protected target: string,
        protected pelrAttr: string = 'pelr',
        protected pdbAttr: string = 'pdb',
        protected arpAttr: string = 'arp',
        protected qciAttr: string = 'qci'
    ) {
        super(
            aetherService,
            bs,
            target,
            'enterprises-2.0.0',
            ['enterprise', 'traffic-class'],
            ['enterprise-id', 'traffic-class-id']
        );
    }

    loadData(
        dataSourceObservable: Observable<Enterprises>,
        onDataLoaded: (
            dataSourceThisScope: RocDataSource<
                EnterprisesEnterpriseTrafficClass,
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
                    if (value['traffic-class']) {
                        value['traffic-class'].forEach((tc) => {
                            tc['enterprise-id'] = value['enterprise-id'];
                            const fullPath = this.deletePath(
                                value['enterprise-id'],
                                tc['traffic-class-id']
                            );
                            if (this.bs.containsDeleteEntry(fullPath)) {
                                tc[FORDELETE] = STRIKETHROUGH;
                            }
                            // Check for usages in applications
                            if (value.application) {
                                value.application.forEach((app) => {
                                    if (app.endpoint) {
                                        app['endpoint'].forEach((appep) => {
                                            if (
                                                appep['traffic-class'] ===
                                                tc['traffic-class-id']
                                            ) {
                                                tc[ISINUSE] = 'true'; // Any match will set it
                                            }
                                        });
                                    }
                                });
                            }
                            // Check for usages in device-groups
                            if (value.site) {
                                value.site.forEach((site) => {
                                    if (site['device-group']) {
                                        site['device-group'].forEach((dg) => {
                                            if (
                                                dg['traffic-class'] ===
                                                tc['traffic-class-id']
                                            ) {
                                                tc[ISINUSE] = 'true'; // Any match will set it
                                            }
                                        });
                                    }
                                    // Check for usages in slices
                                    if (site.slice) {
                                        site.slice.forEach((slice) => {
                                            if (
                                                slice['priority-traffic-rule']
                                            ) {
                                                slice[
                                                    'priority-traffic-rule'
                                                ].forEach((ptr) => {
                                                    if (
                                                        ptr['traffic-class'] ===
                                                        tc['traffic-class-id']
                                                    ) {
                                                        tc[ISINUSE] = 'true'; // Any match will set it
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                                this.data.push(tc);
                            }
                        });
                    }
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
        data: EnterprisesEnterpriseTrafficClass[]
    ): EnterprisesEnterpriseTrafficClass[] {
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
                case 'qci':
                    return compare(a[this.qciAttr], b[this.qciAttr], isAsc);
                case 'arp':
                    return compare(a[this.arpAttr], b[this.arpAttr], isAsc);
                case 'pdb':
                    return compare(a[this.pdbAttr], b[this.pdbAttr], isAsc);
                case 'pelr':
                    return compare(a[this.pelrAttr], b[this.pelrAttr], isAsc);
                default:
                    return 0;
            }
        });
    }
}
