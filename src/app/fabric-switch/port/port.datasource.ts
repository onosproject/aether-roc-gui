/*
 * SPDX-FileCopyrightText: 2022-present Intel Corporation
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { compare, RocDataSource } from '../../roc-data-source';
import {
    SwitchPort,
    SwitchPortList,
} from '../../../openapi3/sdn-fabric/0.1.0/models';
import { BasketService, FORDELETE, STRIKETHROUGH } from '../../basket.service';
import { EnterpriseService as FabricService } from '../../enterprise.service';
import { from, Observable } from 'rxjs';
import { TargetName } from '../../../openapi3/top/level/models/target-name';
import { mergeMap, skipWhile } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

export class PortDatasource extends RocDataSource<SwitchPort, SwitchPortList> {
    constructor(
        public bs: BasketService,
        protected fabricService: FabricService
    ) {
        super(
            bs,
            fabricService,
            undefined,
            ['switch-0.1.0', 'port'],
            ['switch-id', 'cage-number', 'channel-number', 'cage-number'],
            'display-name',
            'description',
            'fabric-id'
        );
    }

    loadData(
        dataSourceObservable: Observable<SwitchPortList>,
        onDataLoaded: (
            dataSourceThisScope: RocDataSource<SwitchPort, SwitchPortList>
        ) => void,
        fabricId?: TargetName,
        switchId?: string
    ): void {
        dataSourceObservable
            .pipe(
                skipWhile((x) => x === undefined),
                mergeMap((items: SwitchPort[]) => from(items))
            )
            .subscribe(
                (sp: SwitchPort) => {
                    sp['fabric-id'] = fabricId.name;
                    sp['switch-id'] = switchId;
                    const fullPath = this.deletePath(
                        fabricId.name,
                        String(sp['cage-number']),
                        String(sp['channel-number'])
                    );
                    if (this.bs.containsDeleteEntry(fullPath)) {
                        sp[FORDELETE] = STRIKETHROUGH;
                    }
                    this.data.push(sp);
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

    getSortedData(data: SwitchPort[]): SwitchPort[] {
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
                case 'speed':
                    return compare(a.speed, b.speed, isAsc);
                default:
                    return 0;
            }
        });
    }
}
