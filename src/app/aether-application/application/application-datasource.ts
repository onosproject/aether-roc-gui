/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import { Service as AetherService } from '../../../openapi3/aether/4.0.0/services';
import {
    Application,
    ApplicationApplication,
} from '../../../openapi3/aether/4.0.0/models';
import { BasketService } from '../../basket.service';
import { compare, RocDataSource } from '../../roc-data-source';

export class ApplicationDatasource extends RocDataSource<
    ApplicationApplication,
    Application
> {
    constructor(
        protected aetherService: AetherService,
        public bs: BasketService,
        protected target: string,
    ) {
        super(aetherService, bs, target, '/application-4.0.0', 'application');
    }

    getSortedData(data: ApplicationApplication[]): ApplicationApplication[] {
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
                    return compare(
                        a.address,
                        b.address,
                        isAsc
                    );
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
