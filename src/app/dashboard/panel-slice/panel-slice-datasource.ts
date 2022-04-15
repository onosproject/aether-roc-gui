/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { RocDataSource } from '../../roc-data-source';
import { BasketService, FORDELETE, STRIKETHROUGH } from '../../basket.service';
import { Observable } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { EnterpriseService } from '../../enterprise.service';
import { SiteSlice, SiteList } from '../../../openapi3/aether/2.1.0/models';
import { TargetName } from '../../../openapi3/top/level/models';

export class PanelSliceDatasource extends RocDataSource<SiteSlice, SiteList> {
    constructor(
        protected enterpriseService: EnterpriseService,
        public bs: BasketService
    ) {
        super(
            bs,
            enterpriseService,
            'site-2.1.0',
            ['site', 'slice'],
            ['site-id', 'slice-id']
        );
    }

    // TODO - move this back in to the roc-data-source base class
    loadData(
        dataSourceObservable: Observable<SiteList>,
        onDataLoaded: (
            dataSourceThisScope: RocDataSource<SiteSlice, SiteList>
        ) => void,
        enterpriseId?: TargetName
    ): void {
        dataSourceObservable.pipe(skipWhile((x) => x === undefined)).subscribe(
            (value: SiteList) => {
                value.forEach((s) => {
                    if (s.slice) {
                        s.slice.forEach((i) => {
                            i['enterprise-id'] = enterpriseId.name;
                            i['site-id'] = s['site-id'];
                            const fullPath = this.deletePath(
                                enterpriseId.name,
                                s['site-id'],
                                i['slice-id']
                            );
                            if (this.bs.containsDeleteEntry(fullPath)) {
                                i[FORDELETE] = STRIKETHROUGH;
                            }
                            this.data.push(i);
                        });
                    }
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
}
