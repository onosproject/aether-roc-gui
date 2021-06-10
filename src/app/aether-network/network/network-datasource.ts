/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import {Network, NetworkNetwork} from '../../../openapi3/aether/3.0.0/models';
import {Service as AetherService} from '../../../openapi3/aether/3.0.0/services';
import {BasketService} from '../../basket.service';
import {RocDataSource} from '../../roc-data-source';

export class NetworkDatasource extends RocDataSource<NetworkNetwork, Network> {

    constructor(
        protected aetherService: AetherService,
        protected bs: BasketService,
        protected target: string,
    ) {
        super( aetherService, bs, target,
            '/network-3.0.0', 'network' );
    }
}
