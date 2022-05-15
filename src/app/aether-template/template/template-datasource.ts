/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { BasketService, FORDELETE, STRIKETHROUGH } from '../../basket.service';
import { compare, RocDataSource } from '../../roc-data-source';
import { from, Observable } from 'rxjs';
import { mergeMap, skipWhile } from 'rxjs/operators';
import { EnterpriseService } from '../../enterprise.service';
import { Template, TemplateList } from '../../../openapi3/aether/2.1.0/models';
import { TargetName } from '../../../openapi3/top/level/models';
import { HttpErrorResponse } from '@angular/common/http';

export class TemplateDatasource extends RocDataSource<Template, TemplateList> {
    constructor(
        protected enterpriseService: EnterpriseService,
        public bs: BasketService
    ) {
        super(
            bs,
            enterpriseService,
            undefined,
            ['template-2.1.0'],
            ['template-id']
        );
    }

    loadData(
        dataSourceObservable: Observable<TemplateList>,
        onDataLoaded: (
            dataSourceThisScope: RocDataSource<Template, TemplateList>
        ) => void,
        enterpriseId?: TargetName
    ): void {
        dataSourceObservable
            .pipe(
                skipWhile((x) => x === undefined),
                mergeMap((templates: Template[]) => from(templates))
            )
            .subscribe(
                (tp: Template) => {
                    tp['enterprise-id'] = enterpriseId.name;
                    const fullPath = this.deletePath(
                        enterpriseId.name,
                        tp['template-id']
                    );
                    if (this.bs.containsDeleteEntry(fullPath)) {
                        tp[FORDELETE] = STRIKETHROUGH;
                    }
                    this.data.push(tp);
                },
                (error) => {
                    if (
                        error instanceof HttpErrorResponse &&
                        error['status'] === 404
                    ) {
                        return;
                    }
                    console.warn(
                        'Error getting data from ',
                        enterpriseId,
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

    getSortedData(data: Template[]): Template[] {
        if (
            !this.sort.active ||
            this.sort.direction === '' ||
            this.sort.active === 'id' ||
            this.sort.active === 'description'
        ) {
            return super.getSortedData(data);
        }
        return data.sort((a: Template, b: Template) => {
            const isAsc = this.sort.direction === 'asc';
            switch (this.sort.active) {
                case 'sst':
                    return compare(a.sst, b.sst, isAsc);
                case 'sd':
                    return compare(+a.sd, +b.sd, isAsc);
                case 'default-behavior':
                    return compare(
                        a['default-behavior'],
                        b['default-behavior'],
                        isAsc
                    );
                default:
                    return 0;
            }
        });
    }
}
