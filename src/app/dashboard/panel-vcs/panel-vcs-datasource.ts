/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {RocDataSource} from '../../roc-data-source';
import {VcsVcs} from '../../../openapi3/aether/3.0.0/models/vcs-vcs';
import {Vcs} from '../../../openapi3/aether/3.0.0/models/vcs';
import {Service as AetherService} from '../../../openapi3/aether/3.0.0/services/service';
import {BasketService} from '../../basket.service';

export class PanelVcsDatasource extends RocDataSource<VcsVcs, Vcs> {
    constructor(
        protected aetherService: AetherService,
        protected bs: BasketService,
        protected target: string,
    ) {
        super( aetherService, bs, target,
            '/vcs-3.0.0', 'vcs' );
    }
}
