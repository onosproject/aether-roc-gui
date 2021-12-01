/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import {
    Template,
    TemplateTemplate,
} from '../../../openapi3/aether/4.0.0/models';
import { Service as AetherService } from '../../../openapi3/aether/4.0.0/services';
import { BasketService } from '../../basket.service';
import { compare, RocDataSource } from '../../roc-data-source';

export class TemplateDatasource extends RocDataSource<
    TemplateTemplate,
    Template
> {
    constructor(
        protected aetherService: AetherService,
        protected bs: BasketService,
        protected target: string,
        protected DBAttr: string = 'default-behavior',
        protected sdAttr: string = 'sd',
        protected sstAttr: string = 'sst'
    ) {
        super(aetherService, bs, target, '/template-4.0.0', 'template');
    }

    getSortedData(data) {
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
                case 'sst':
                    return compare(a[this.sstAttr], b[this.sstAttr], isAsc);
                case 'sd':
                    return compare(+a[this.sdAttr], +b[this.sdAttr], isAsc);
                case 'default-behavior':
                    return compare(a[this.DBAttr], b[this.DBAttr], isAsc);
                default:
                    return 0;
            }
        });
    }
}
