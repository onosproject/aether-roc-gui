/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
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
import {
    TrafficClass,
    TrafficClassList,
} from '../../../openapi3/aether/2.1.0/models';
import { TargetName } from '../../../openapi3/top/level/models';

export class TrafficClassDatasource extends RocDataSource<
    TrafficClass,
    TrafficClassList
> {
    constructor(
        protected enterpriseService: EnterpriseService,
        public bs: BasketService,
        protected pelrAttr: string = 'pelr',
        protected pdbAttr: string = 'pdb',
        protected arpAttr: string = 'arp',
        protected qciAttr: string = 'qci'
    ) {
        super(
            bs,
            enterpriseService,
            'traffic-class-2.1.0',
            ['traffic-class'],
            ['traffic-class-id']
        );
    }

    loadData(
        dataSourceObservable: Observable<TrafficClassList>,
        onDataLoaded: (
            dataSourceThisScope: RocDataSource<TrafficClass, TrafficClassList>
        ) => void,
        enterpriseId?: TargetName
    ): void {
        dataSourceObservable.pipe(skipWhile((x) => x === undefined)).subscribe(
            (value: TrafficClassList) => {
                value.forEach((tc) => {
                    tc['enterprise-id'] = enterpriseId.name;
                    const fullPath = this.deletePath(
                        enterpriseId.name,
                        tc['traffic-class-id']
                    );
                    if (this.bs.containsDeleteEntry(fullPath)) {
                        tc[FORDELETE] = STRIKETHROUGH;
                    }
                    // Check for usages in applications
                    // TODO: find a way to get list of applications
                    // if (value.application) {
                    //     value.application.forEach((app) => {
                    //         if (app.endpoint) {
                    //             app['endpoint'].forEach((appep) => {
                    //                 if (
                    //                     appep['traffic-class'] ===
                    //                     tc['traffic-class-id']
                    //                 ) {
                    //                     tc[ISINUSE] = 'true'; // Any match will set it
                    //                 }
                    //             });
                    //         }
                    //     });
                    // }
                    // TODO: find a way to get a list of sites
                    // Check for usages in device-groups
                    // if (value.site) {
                    //     value.site.forEach((site) => {
                    //         if (site['device-group']) {
                    //             site['device-group'].forEach((dg) => {
                    //                 if (
                    //                     dg['traffic-class'] ===
                    //                     tc['traffic-class-id']
                    //                 ) {
                    //                     tc[ISINUSE] = 'true'; // Any match will set it
                    //                 }
                    //             });
                    //         }
                    //         // Check for usages in slices
                    //         if (site.slice) {
                    //             site.slice.forEach((slice) => {
                    //                 if (
                    //                     slice['priority-traffic-rule']
                    //                 ) {
                    //                     slice[
                    //                         'priority-traffic-rule'
                    //                     ].forEach((ptr) => {
                    //                         if (
                    //                             ptr['traffic-class'] ===
                    //                             tc['traffic-class-id']
                    //                         ) {
                    //                             tc[ISINUSE] = 'true'; // Any match will set it
                    //                         }
                    //                     });
                    //                 }
                    //             });
                    //         }
                    //     });
                    // }
                    this.data.push(tc);
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

    getSortedData(data: TrafficClass[]): TrafficClass[] {
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
                    return compare(a.qci, b.qci, isAsc);
                case 'arp':
                    return compare(a.arp, b.arp, isAsc);
                case 'pdb':
                    return compare(a.pdb, b.pdb, isAsc);
                case 'pelr':
                    return compare(a.pelr, b.pelr, isAsc);
                default:
                    return 0;
            }
        });
    }
}
