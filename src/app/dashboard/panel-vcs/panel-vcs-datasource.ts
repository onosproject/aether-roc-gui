/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import { RocDataSource } from '../../roc-data-source';

import { Vcs } from '../../../openapi3/aether/2.0.0/models/vcs';
import { Service as AetherService } from '../../../openapi3/aether/2.0.0/services/service';
import { BasketService } from '../../basket.service';
import { EnterpriseEnterpriseSiteVcs } from '../../../openapi3/aether/2.0.0/models/enterprise-enterprise-site-vcs';

export class PanelVcsDatasource extends RocDataSource<
    EnterpriseEnterpriseSiteVcs,
    Vcs
> {
    constructor(
        protected aetherService: AetherService,
        public bs: BasketService,
        protected target: string
    ) {
        super(aetherService, bs, target, '/vcs-4.0.0', 'vcs');
    }
}
