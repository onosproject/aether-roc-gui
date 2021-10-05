/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import {Site, SiteSite} from '../../../openapi3/aether/4.0.0/models';
import {Service as AetherService} from '../../../openapi3/aether/4.0.0/services';
import {BasketService} from '../../basket.service';
import {RocDataSource} from '../../roc-data-source';

export class SiteDatasource extends RocDataSource<SiteSite, Site> {

    constructor(
        protected aetherService: AetherService,
        protected bs: BasketService,
        protected target: string,
    ) {
        super( aetherService, bs, target,
            '/site-4.0.0', 'site' );
    }
}
