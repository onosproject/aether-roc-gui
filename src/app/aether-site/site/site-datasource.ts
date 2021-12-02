/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import { Site, SiteSite } from '../../../openapi3/aether/4.0.0/models';
import { Service as AetherService } from '../../../openapi3/aether/4.0.0/services';
import { BasketService } from '../../basket.service';
import { compare, RocDataSource } from '../../roc-data-source';

export class SiteDatasource extends RocDataSource<SiteSite, Site> {
    constructor(
        protected aetherService: AetherService,
        public bs: BasketService,
        protected target: string,
    ) {
        super(aetherService, bs, target, '/site-4.0.0', 'site');
    }

    getSortedData(data: SiteSite[]): SiteSite[] {
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
                case 'enterprise':
                    return compare(
                        a.enterprise,
                        b.enterprise,
                        isAsc
                    );
                default:
                    return 0;
            }
        });
    }
}
