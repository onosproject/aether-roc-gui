/*
 * SPDX-FileCopyrightText: 2022-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { compare, RocDataSource } from '../../roc-data-source';
import { BasketService, FORDELETE, STRIKETHROUGH } from '../../basket.service';
import { Observable } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { EnterpriseService } from '../../enterprise.service';
import { SiteSmallCell, SiteList } from '../../../openapi3/aether/2.1.0/models';
import { TargetName } from '../../../openapi3/top/level/models';
import { HttpErrorResponse } from '@angular/common/http';

export class SmallCellDatasource extends RocDataSource<
    SiteSmallCell,
    SiteList
> {
    constructor(
        protected enterpriseService: EnterpriseService,
        public bs: BasketService
    ) {
        super(
            bs,
            enterpriseService,
            undefined,
            ['site-2.1.0', 'small-cell'],
            ['site-id', 'small-cell-id']
        );
    }

    loadData(
        dataSourceObservable: Observable<SiteList>,
        onDataLoaded: (
            dataSourceThisScope: RocDataSource<SiteSmallCell, SiteList>
        ) => void,
        enterpriseId?: TargetName
    ): void {
        dataSourceObservable.pipe(skipWhile((x) => x === undefined)).subscribe(
            (value: SiteList) => {
                value.forEach((s) => {
                    if (s['small-cell']) {
                        s['small-cell'].forEach((sc) => {
                            sc['enterprise-id'] = enterpriseId.name;
                            sc['site-id'] = s['site-id'];
                            const fullPath = this.deletePath(
                                enterpriseId.name,
                                s['site-id'],
                                sc['small-cell-id']
                            );
                            if (this.bs.containsDeleteEntry(fullPath)) {
                                sc[FORDELETE] = STRIKETHROUGH;
                            }
                            this.data.push(sc);
                        });
                    }
                });
            },
            (error) => {
                if (
                    error instanceof HttpErrorResponse &&
                    error['status'] === 404
                ) {
                    return;
                }
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

    getSortedData(data: SiteSmallCell[]): SiteSmallCell[] {
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
                case 'tac':
                    return compare(a['tac'], b['tac'], isAsc);
                default:
                    return 0;
            }
        });
    }
}
