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
        public bs: BasketService,
        protected target: string
    ) {
        super(aetherService, bs, target, '/template-4.0.0', 'template');
    }

    getSortedData(data: TemplateTemplate[]): TemplateTemplate[] {
        if (
            !this.sort.active ||
            this.sort.direction === '' ||
            this.sort.active === 'id' ||
            this.sort.active === 'description'
        ) {
            return super.getSortedData(data);
        }
        return data.sort((a: TemplateTemplate, b: TemplateTemplate) => {
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
