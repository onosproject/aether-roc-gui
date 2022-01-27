/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import { RocDataSource } from '../../roc-data-source';
import { Site } from '../../../openapi3/aether/2.0.0/models/site';
import { Service as AetherService } from '../../../openapi3/aether/2.0.0/services/service';
import { BasketService } from '../../basket.service';
import { EnterpriseEnterpriseSite } from '../../../openapi3/aether/2.0.0/models/enterprise-enterprise-site';

export class PanelSiteDatasource extends RocDataSource<
    EnterpriseEnterpriseSite,
    Site
> {
    constructor(
        protected aetherService: AetherService,
        public bs: BasketService,
        protected target: string
    ) {
        super(aetherService, bs, target, '/site-v4.0.0', 'site');
    }
}
