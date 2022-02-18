/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { RocDataSource } from '../../roc-data-source';
import { Service as AetherService } from '../../../openapi3/aether/2.0.0/services';
import { BasketService } from '../../basket.service';
import {
    Enterprises,
    EnterprisesEnterprise,
    EnterprisesEnterpriseSiteSlice,
} from '../../../openapi3/aether/2.0.0/models';
import { from, Observable } from 'rxjs';
import { map, mergeMap, skipWhile } from 'rxjs/operators';

export class PanelSliceDatasource extends RocDataSource<
    EnterprisesEnterpriseSiteSlice,
    Enterprises
> {
    constructor(
        protected aetherService: AetherService,
        public bs: BasketService,
        protected target: string
    ) {
        super(aetherService, bs, target, '/slice-2.0.0', 'slice');
    }

    // TODO - move this back in to the roc-data-source base class
    loadData(
        dataSourceObservable: Observable<Enterprises>,
        onDataLoaded: (
            dataSourceThisScope: RocDataSource<
                EnterprisesEnterpriseSiteSlice,
                Enterprises
            >
        ) => void
    ): void {
        dataSourceObservable
            .pipe(
                map((x: Enterprises) => x?.enterprise),
                skipWhile((x) => x === undefined),
                mergeMap((items: EnterprisesEnterprise[]) => from(items))
            )
            .subscribe(
                (value: EnterprisesEnterprise) => {
                    value.site.forEach((s) => {
                        s.slice.forEach((i) => {
                            if (
                                !this.bs.containsDeleteEntry(
                                    '/enterprises/enterprise[' +
                                        value['enterprise-id'] +
                                        '/site[site-id=' +
                                        s['site-id'] +
                                        '/slice[slice-id=' +
                                        i['slice-id'] +
                                        ']'
                                )
                            ) {
                                i['enterprise-id'] = value['enterprise-id'];
                                i['site-id'] = s['site-id'];
                                this.data.push(i);
                            } else {
                                console.log(
                                    'slice-id is already in basket',
                                    i['slice-id']
                                );
                            }
                        });
                    });
                },
                (error) => {
                    console.warn(
                        'Error getting data from ',
                        this.target,
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
}
