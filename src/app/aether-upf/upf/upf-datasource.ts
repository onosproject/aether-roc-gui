/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import { Upf, UpfUpf } from '../../../openapi3/aether/4.0.0/models';
import { Service as AetherService } from '../../../openapi3/aether/4.0.0/services';
import { BasketService } from '../../basket.service';
import { compare, RocDataSource } from '../../roc-data-source';

export class UpfDatasource extends RocDataSource<UpfUpf, Upf> {
    constructor(
        protected aetherService: AetherService,
        public bs: BasketService,
        protected target: string
    ) {
        super(aetherService, bs, target, '/upf-4.0.0', 'upf');
    }

    getSortedData(data: UpfUpf[]): UpfUpf[] {
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
                    return compare(a.site, b.site, isAsc);
                case 'enterprise':
                    return compare(a.enterprise, b.enterprise, isAsc);
                case 'address':
                    return compare(a.address, b.address, isAsc);
                case 'port':
                    return compare(a.port, b.port, isAsc);
                default:
                    return 0;
            }
        });
    }
}
