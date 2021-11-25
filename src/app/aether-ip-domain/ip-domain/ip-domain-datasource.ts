/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import { Service as AetherService } from '../../../openapi3/aether/4.0.0/services';
import { BasketService } from '../../basket.service';
import { RocDataSource } from '../../roc-data-source';
import { IpDomainIpDomain } from '../../../openapi3/aether/4.0.0/models/ip-domain-ip-domain';
import { IpDomain } from '../../../openapi3/aether/4.0.0/models/ip-domain';

export class IpDomainDatasource extends RocDataSource<
    IpDomainIpDomain,
    IpDomain
> {
    constructor(
        protected aetherService: AetherService,
        protected bs: BasketService,
        protected target: string
    ) {
        super(aetherService, bs, target, '/ip-domain-4.0.0', 'ip-domain');
    }
}
