/*
 * SPDX-FileCopyrightText: 2022-present Intel Corporation
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { compare, RocDataSource } from '../../roc-data-source';
import {
    Switch,
    SwitchModel,
    SwitchModelList,
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

export class SwitchModelDatasource extends RocDataSource<
    SwitchModel,
    SwitchModelList
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
            ['switch-model-0.1.0'],
            ['switch-model-id'],
            'display-name',
            'description',
            'fabric-id'
        );
    }

    loadData(
        dataSourceObservable: Observable<SwitchModelList>,
        onDataLoaded: (
            dataSourceThisScope: RocDataSource<SwitchModel, SwitchModelList>
        ) => void,
        fabricId?: TargetName
    ): void {
        dataSourceObservable
            .pipe(
                skipWhile((x) => x === undefined),
                mergeMap((items: SwitchModel[]) => from(items))
            )
            .subscribe(
                (sm: SwitchModel) => {
                    sm['fabric-id'] = fabricId.name;
                    const fullPath = this.deletePath(
                        fabricId.name,
                        sm['switch-model-id']
                    );
                    if (this.bs.containsDeleteEntry(fullPath)) {
                        sm[FORDELETE] = STRIKETHROUGH;
                    }
                    // Check for usage in switches
                    this.switchService
                        .getSwitchList({
                            'fabric-id': fabricId.name,
                        })
                        .pipe(mergeMap((switches: Switch[]) => from(switches)))
                        .subscribe((sw: Switch) => {
                            if (sw['model-id'] === sm['switch-model-id']) {
                                sm[ISINUSE] = 'true';
                            }
                        });
                    this.data.push(sm);
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

    getSortedData(data: SwitchModel[]): SwitchModel[] {
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
                case 'pipeline':
                    return compare(a.pipeline, b.pipeline, isAsc);
                default:
                    return 0;
            }
        });
    }
}
