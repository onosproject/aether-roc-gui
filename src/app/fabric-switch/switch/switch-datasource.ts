/*
 * SPDX-FileCopyrightText: 2022-present Intel Corporation
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { compare, RocDataSource } from '../../roc-data-source';
import { Switch, SwitchList } from '../../../openapi3/sdn-fabric/0.1.0/models';
import { BasketService, FORDELETE, STRIKETHROUGH } from '../../basket.service';
import { EnterpriseService as FabricService } from '../../enterprise.service';
import { from, Observable } from 'rxjs';
import { TargetName } from '../../../openapi3/top/level/models/target-name';
import { mergeMap, skipWhile } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

export class SwitchDatasource extends RocDataSource<Switch, SwitchList> {
    constructor(
        public bs: BasketService,
        protected fabricService: FabricService
    ) {
        super(
            bs,
            fabricService,
            undefined,
            ['switch-0.1.0'],
            ['switch-id'],
            'display-name',
            'description',
            'fabric-id'
        );
    }

    loadData(
        dataSourceObservable: Observable<SwitchList>,
        onDataLoaded: (
            dataSourceThisScope: RocDataSource<Switch, SwitchList>
        ) => void,
        fabricId?: TargetName
    ): void {
        dataSourceObservable
            .pipe(
                skipWhile((x) => x === undefined),
                mergeMap((items: Switch[]) => from(items))
            )
            .subscribe(
                (sw: Switch) => {
                    sw['fabric-id'] = fabricId.name;
                    const fullPath = this.deletePath(
                        fabricId.name,
                        sw['switch-id']
                    );
                    if (this.bs.containsDeleteEntry(fullPath)) {
                        sw[FORDELETE] = STRIKETHROUGH;
                    }
                    this.data.push(sw);
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

    getSortedData(data: Switch[]): Switch[] {
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
                case 'model-id':
                    return compare(a['model-id'], b['model-id'], isAsc);
                case 'role':
                    return compare(a.role, b.role, isAsc);
                default:
                    return 0;
            }
        });
    }
}
