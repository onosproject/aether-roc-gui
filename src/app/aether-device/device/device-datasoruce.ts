/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import { Service as AetherService } from '../../../openapi3/aether/2.0.0/services';
import { BasketService } from '../../basket.service';
import { compare, RocDataSource } from '../../roc-data-source';
import { EnterpriseEnterpriseSiteDevice } from '../../../openapi3/aether/2.0.0/models/enterprise-enterprise-site-device';
import { Device } from '../../../openapi3/aether/2.0.0/models/device';

export class DeviceDatasource extends RocDataSource<
    EnterpriseEnterpriseSiteDevice,
    Device
> {
    constructor(
        protected aetherService: AetherService,
        public bs: BasketService,
        protected target: string
    ) {
        super(aetherService, bs, target, '/device-2.0.0', 'device');
    }
}
