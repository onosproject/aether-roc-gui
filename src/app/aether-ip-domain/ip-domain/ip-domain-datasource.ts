/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import { Service as AetherService } from '../../../openapi3/aether/4.0.0/services';
import { BasketService } from '../../basket.service';
import { compare, RocDataSource } from '../../roc-data-source';
import { IpDomainIpDomain } from '../../../openapi3/aether/4.0.0/models/ip-domain-ip-domain';
import { IpDomain } from '../../../openapi3/aether/4.0.0/models/ip-domain';

export class IpDomainDatasource extends RocDataSource<
    IpDomainIpDomain,
    IpDomain
> {
    constructor(
        protected aetherService: AetherService,
        protected bs: BasketService,
        protected target: string,
        protected subnetAttr: string = 'subnet',
        protected AdminStatusAttr: string = 'admin-status',
        protected mtuAttr: string = 'mtu',
        protected dnnAttr: string = 'dnn',
        protected enterpriseAttr: string = 'enterprise'
    ) {
        super(aetherService, bs, target, '/ip-domain-4.0.0', 'ip-domain');
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
                case 'dnn':
                    return compare(a[this.dnnAttr], b[this.dnnAttr], isAsc);
                case 'mtu':
                    return compare(a[this.mtuAttr], b[this.mtuAttr], isAsc);
                case 'admin-status':
                    return compare(
                        a[this.AdminStatusAttr],
                        b[this.AdminStatusAttr],
                        isAsc
                    );
                case 'subnet':
                    return compare(
                        a[this.subnetAttr],
                        b[this.subnetAttr],
                        isAsc
                    );
                case 'enterprise':
                    return compare(
                        a[this.enterpriseAttr],
                        b[this.enterpriseAttr],
                        isAsc
                    );
                default:
                    return 0;
            }
        });
    }
}
