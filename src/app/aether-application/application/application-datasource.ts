/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
    BasketService,
    FORDELETE,
    ISINUSE,
    STRIKETHROUGH,
} from '../../basket.service';
import { compare, RocDataSource } from '../../roc-data-source';
import {
    Application,
    ApplicationList,
} from '../../../openapi3/aether/2.1.0/models';
import { Observable } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { EnterpriseService } from '../../enterprise.service';
import { TargetName } from '../../../openapi3/top/level/models';

export class ApplicationDatasource extends RocDataSource<
    Application,
    ApplicationList
> {
    constructor(
        public bs: BasketService,
        protected enterpriseService: EnterpriseService
    ) {
        super(
            bs,
            enterpriseService,
            'application-2.1.0',
            ['application'],
            ['application-id']
        );
    }

    loadData(
        dataSourceObservable: Observable<ApplicationList>,
        onDataLoaded: (
            dataSourceThisScope: RocDataSource<Application, ApplicationList>
        ) => void,
        enterpriseId?: TargetName
    ): void {
        dataSourceObservable.pipe(skipWhile((x) => x === undefined)).subscribe(
            (appList: ApplicationList) => {
                appList.forEach((app: Application) => {
                    app['enterprise-id'] = enterpriseId.name;
                    const fullPath = this.deletePath(
                        enterpriseId.name,
                        app['application-id']
                    );
                    if (this.bs.containsDeleteEntry(fullPath)) {
                        app[FORDELETE] = STRIKETHROUGH;
                    }
                    // Check for usages in slices
                    // TODO: make a separate call to get slices for all sites to see if this is in use
                    // if (value.site) {
                    //     value.site.forEach((site) => {
                    //         if (site.slice) {
                    //             site.slice.forEach((slice) => {
                    //                 if (slice.filter) {
                    //                     slice.filter.forEach(
                    //                         (filter) => {
                    //                             if (
                    //                                 filter.application ===
                    //                                 app[
                    //                                     'application-id'
                    //                                 ]
                    //                             ) {
                    //                                 app[ISINUSE] =
                    //                                     'true'; // Any match will set it
                    //                             }
                    //                         }
                    //                     );
                    //                 }
                    //             });
                    //         }
                    //     });
                    // }
                    this.data.push(app);
                });
            },
            (error) => {
                console.warn('Error getting data from ', enterpriseId, error);
            },
            () => {
                // table.refreshRows() does not seem to work - using this trick instead
                // const basketPreview = this.bs.buildPatchBody().Updates;
                // onDataLoaded(this);
                this.paginator._changePageSize(this.paginator.pageSize);
            }
        );
    }

    getSortedData(data: Application[]): Application[] {
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
