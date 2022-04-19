/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { BasketService, FORDELETE, STRIKETHROUGH } from '../../basket.service';
import { compare, RocDataSource } from '../../roc-data-source';
import { Observable } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { EnterpriseService } from '../../enterprise.service';
import { Site, SiteList } from '../../../openapi3/aether/2.1.0/models';
import { TargetName } from '../../../openapi3/top/level/models';

export class SiteDatasource extends RocDataSource<Site, SiteList> {
    constructor(
        protected enterpriseService: EnterpriseService,
        public bs: BasketService
    ) {
        super(bs, enterpriseService, undefined, ['site-2.1.0'], ['site-id']);
    }

    // TODO - move this back in to the roc-data-source base class
    //  do the same for panel-site-datasource.ts
    loadData(
        dataSourceObservable: Observable<SiteList>,
        onDataLoaded: (
            dataSourceThisScope: RocDataSource<Site, SiteList>
        ) => void,
        enterpriseId?: TargetName
    ): void {
        dataSourceObservable.pipe(skipWhile((x) => x === undefined)).subscribe(
            (value: SiteList) => {
                value.forEach((s) => {
                    s['enterprise-id'] = enterpriseId.name;
                    const fullPath = this.deletePath(
                        enterpriseId.name,
                        s['site-id']
                    );
                    if (this.bs.containsDeleteEntry(fullPath)) {
                        s[FORDELETE] = STRIKETHROUGH;
                    }
                    this.data.push(s);
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

    getSortedData(data: Site[]): Site[] {
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
                case 'site':
                    return compare(a['site-id'], b['site-id'], isAsc);
                default:
                    return 0;
            }
        });
    }
}
