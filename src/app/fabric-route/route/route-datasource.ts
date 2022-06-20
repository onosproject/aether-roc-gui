/*
 * SPDX-FileCopyrightText: 2022-present Intel Corporation
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { compare, RocDataSource } from '../../roc-data-source';
import { Route, RouteList } from '../../../openapi3/sdn-fabric/0.1.0/models';
import { BasketService, FORDELETE, STRIKETHROUGH } from '../../basket.service';
import { EnterpriseService as FabricService } from '../../enterprise.service';
import { from, Observable } from 'rxjs';
import { TargetName } from '../../../openapi3/top/level/models/target-name';
import { mergeMap, skipWhile } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

export class RouteDatasource extends RocDataSource<Route, RouteList> {
    constructor(
        public bs: BasketService,
        protected fabricService: FabricService
    ) {
        super(bs, fabricService, undefined, ['route-0.1.0'], ['route-id']);
    }

    loadData(
        dataSourceObservable: Observable<RouteList>,
        onDataLoaded: (
            dataSourceThisScope: RocDataSource<Route, RouteList>
        ) => void,
        fabricId?: TargetName
    ): void {
        dataSourceObservable
            .pipe(
                skipWhile((x) => x === undefined),
                mergeMap((items: Route[]) => from(items))
            )
            .subscribe(
                (rt: Route) => {
                    rt['fabric-id'] = fabricId.name;
                    const fullPath = this.deletePath(
                        fabricId.name,
                        rt['route-id']
                    );
                    if (this.bs.containsDeleteEntry(fullPath)) {
                        rt[FORDELETE] = STRIKETHROUGH;
                    }
                    this.data.push(rt);
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

    getSortedData(data: Route[]): Route[] {
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
                default:
                    return 0;
            }
        });
    }
}
