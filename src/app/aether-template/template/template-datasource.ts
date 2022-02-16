/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
    Enterprises,
    EnterprisesEnterprise,
    EnterprisesEnterpriseTemplate,
} from '../../../openapi3/aether/2.0.0/models';
import { Service as AetherService } from '../../../openapi3/aether/2.0.0/services';
import { BasketService } from '../../basket.service';
import { compare, RocDataSource } from '../../roc-data-source';
import { from, Observable } from 'rxjs';
import { map, mergeMap, skipWhile } from 'rxjs/operators';

export class TemplateDatasource extends RocDataSource<
    EnterprisesEnterpriseTemplate,
    Enterprises
> {
    constructor(
        protected aetherService: AetherService,
        public bs: BasketService,
        protected target: string
    ) {
        super(aetherService, bs, target, '/template-2.0.0', 'template');
    }

    loadData(
        dataSourceObservable: Observable<Enterprises>,
        onDataLoaded: (
            dataSourceThisScope: RocDataSource<
                EnterprisesEnterpriseTemplate,
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
                    value.template.forEach((tp) => {
                        if (
                            !this.bs.containsDeleteEntry(
                                '/enterprises/enterprise[' +
                                    value['enterprise-id'] +
                                    '/template[template-id=' +
                                    tp['template-id'] +
                                    ']'
                            )
                        ) {
                            tp['enterprise-id'] = value['enterprise-id'];
                            this.data.push(tp);
                        } else {
                            console.log(
                                'template-id is already in basket',
                                tp['template-id']
                            );
                        }
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

    getSortedData(
        data: EnterprisesEnterpriseTemplate[]
    ): EnterprisesEnterpriseTemplate[] {
        if (
            !this.sort.active ||
            this.sort.direction === '' ||
            this.sort.active === 'id' ||
            this.sort.active === 'description'
        ) {
            return super.getSortedData(data);
        }
        return data.sort(
            (
                a: EnterprisesEnterpriseTemplate,
                b: EnterprisesEnterpriseTemplate
            ) => {
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
            }
        );
    }
}
