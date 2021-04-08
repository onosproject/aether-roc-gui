/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import {Service as AetherService} from '../../../openapi3/aether/2.1.0/services';
import {QosProfile, QosProfileQosProfile} from '../../../openapi3/aether/2.1.0/models';
import {BasketService} from '../../basket.service';
import {RocDataSource} from '../../roc-data-source';

export class QosProfilesDatasource extends RocDataSource<QosProfileQosProfile, QosProfile> {

    constructor(
        protected aetherService: AetherService,
        protected bs: BasketService,
        protected target: string,
    ) {
        super(aetherService, bs, target,
            '/qos-profile-2.1.0', 'qos-profile',
        );
    }
}
