/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Service as AetherService } from '../../../openapi3/aether/2.0.0/services';
import { BasketService } from '../../basket.service';
import { compare, RocDataSource } from '../../roc-data-source';
import { EnterprisesEnterpriseSiteIpDomain } from '../../../openapi3/aether/2.0.0/models';

export class IpDomainDatasource extends RocDataSource<
    EnterprisesEnterpriseSiteIpDomain,
    any
> {
    constructor(
        protected aetherService: AetherService,
        public bs: BasketService,
        protected target: string
    ) {
        super(aetherService, bs, target, '/ip-domain-2.0.0', 'ip-domain');
    }
    getSortedData(
        data: EnterprisesEnterpriseSiteIpDomain[]
    ): EnterprisesEnterpriseSiteIpDomain[] {
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
                case 'dnn':
                    return compare(a.dnn, b.dnn, isAsc);
                case 'mtu':
                    return compare(a.mtu, b.mtu, isAsc);
                case 'admin-status':
                    return compare(a['admin-status'], b['admin-status'], isAsc);
                case 'subnet':
                    return compare(a.subnet, b.subnet, isAsc);
                default:
                    return 0;
            }
        });
    }
}
