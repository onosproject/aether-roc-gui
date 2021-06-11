/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import {Vcs, VcsVcs} from '../../../openapi3/aether/3.0.0/models';
import {Service as AetherService} from '../../../openapi3/aether/3.0.0/services';
import {BasketService} from '../../basket.service';
import {RocDataSource} from '../../roc-data-source';

export class VcsDatasource extends RocDataSource<VcsVcs, Vcs> {

    constructor(
        protected aetherService: AetherService,
        protected bs: BasketService,
        protected target: string,
    ) {
        super( aetherService, bs, target,
            '/vcs-3.0.0', 'vcs' );
    }
}
