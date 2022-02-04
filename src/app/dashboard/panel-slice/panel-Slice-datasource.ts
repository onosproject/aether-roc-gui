/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { RocDataSource } from '../../roc-data-source';
import { Slice } from '../../../openapi3/aether/2.0.0/models/slice';
import { Service as AetherService } from '../../../openapi3/aether/2.0.0/services/service';
import { BasketService } from '../../basket.service';
import { EnterpriseEnterpriseSiteSlice } from '../../../openapi3/aether/2.0.0/models/enterprise-enterprise-site-slice';

export class PanelSliceDatasource extends RocDataSource<
    EnterpriseEnterpriseSiteSlice,
    Slice
> {
    constructor(
        protected aetherService: AetherService,
        public bs: BasketService,
        protected target: string
    ) {
        super(aetherService, bs, target, '/slice-2.0.0', 'slice');
    }
}
