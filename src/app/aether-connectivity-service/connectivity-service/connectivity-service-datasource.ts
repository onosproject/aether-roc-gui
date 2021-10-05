/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import {Service as AetherService} from '../../../openapi3/aether/4.0.0/services';
import {
    ConnectivityService,
    ConnectivityServiceConnectivityService,
} from '../../../openapi3/aether/4.0.0/models';
import {BasketService} from '../../basket.service';
import {RocDataSource} from '../../roc-data-source';

export class ConnectivityServiceDatasource extends RocDataSource<ConnectivityServiceConnectivityService, ConnectivityService> {

    constructor(
        protected aetherService: AetherService,
        protected bs: BasketService,
        protected target: string,
    ) {
        super(aetherService, bs, target,
            '/connectivity-service-4.0.0', 'connectivity-service',
        );
    }
}
