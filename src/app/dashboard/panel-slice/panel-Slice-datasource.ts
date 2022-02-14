/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { RocDataSource } from '../../roc-data-source';
import { Service as AetherService } from '../../../openapi3/aether/2.0.0/services';
import { BasketService } from '../../basket.service';
import { EnterprisesEnterpriseSiteSlice } from '../../../openapi3/aether/2.0.0/models';

export class PanelSliceDatasource extends RocDataSource<
    EnterprisesEnterpriseSiteSlice,
    any
> {
    constructor(
        protected aetherService: AetherService,
        public bs: BasketService,
        protected target: string
    ) {
        super(aetherService, bs, target, '/slice-2.0.0', 'slice');
    }
}
