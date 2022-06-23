/*
 * SPDX-FileCopyrightText: 2022-present Intel Corporation
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { compare, RocDataSource } from '../../roc-data-source';
import {
    DhcpServer,
    DhcpServerList,
    Switch,
} from '../../../openapi3/sdn-fabric/0.1.0/models';
import {
    BasketService,
    FORDELETE,
    ISINUSE,
    STRIKETHROUGH,
} from '../../basket.service';
import { EnterpriseService as FabricService } from '../../enterprise.service';
import { from, Observable } from 'rxjs';
import { TargetName } from '../../../openapi3/top/level/models/target-name';
import { mergeMap, skipWhile } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { SwitchService } from '../../../openapi3/sdn-fabric/0.1.0/services/switch.service';

export class DhcpServerDatasource extends RocDataSource<
    DhcpServer,
    DhcpServerList
> {
    constructor(
        public bs: BasketService,
        protected fabricService: FabricService,
        protected switchService: SwitchService
    ) {
        super(
            bs,
            fabricService,
            undefined,
            ['dhcp-server-0.1.0'],
            ['dhcp-id'],
            'display-name',
            'description',
            'fabric-id'
        );
    }

    loadData(
        dataSourceObservable: Observable<DhcpServerList>,
        onDataLoaded: (
            dataSourceThisScope: RocDataSource<DhcpServer, DhcpServerList>
        ) => void,
        fabricId?: TargetName
    ): void {
        dataSourceObservable
            .pipe(
                skipWhile((x) => x === undefined),
                mergeMap((items: DhcpServer[]) => from(items))
            )
            .subscribe(
                (ds: DhcpServer) => {
                    ds['fabric-id'] = fabricId.name;
                    const fullPath = this.deletePath(
                        fabricId.name,
                        ds['dhcp-id']
                    );
                    if (this.bs.containsDeleteEntry(fullPath)) {
                        ds[FORDELETE] = STRIKETHROUGH;
                    }
                    // Check for usage in switches
                    this.switchService
                        .getSwitchList({
                            'fabric-id': fabricId.name,
                        })
                        .pipe(mergeMap((switches: Switch[]) => from(switches)))
                        .subscribe((sw: Switch) => {
                            if (sw.port !== null) {
                                if (
                                    sw.port.some(
                                        (p) =>
                                            p['dhcp-connect-point'] &&
                                            p['dhcp-connect-point'].includes(
                                                ds['dhcp-id']
                                            )
                                    )
                                ) {
                                    ds[ISINUSE] = 'true';
                                }
                            }
                        });
                    this.data.push(ds);
                },
                (error) => {
                    if (
                        error instanceof HttpErrorResponse &&
                        error['status'] === 404
                    ) {
                        return;
                    }
                    console.warn('Error getting data from ', fabricId, error);
                },
                () => {
                    // table.refreshRows() does not seem to work - using this trick instead
                    // const basketPreview = this.bs.buildPatchBody().Updates;
                    // onDataLoaded(this);
                    this.paginator._changePageSize(this.paginator.pageSize);
                }
            );
    }

    getSortedData(data: DhcpServer[]): DhcpServer[] {
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
                    return compare(a['address'], b['address'], isAsc);
                default:
                    return 0;
            }
        });
    }
}
