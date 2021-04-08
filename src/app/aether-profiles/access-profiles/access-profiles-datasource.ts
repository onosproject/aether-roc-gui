/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import {Service as AetherService} from '../../../openapi3/aether/2.1.0/services';
import {AccessProfile, AccessProfileAccessProfile} from '../../../openapi3/aether/2.1.0/models';
import {BasketService} from '../../basket.service';
import {RocDataSource} from '../../roc-data-source';

export class AccessProfilesDatasource extends RocDataSource<AccessProfileAccessProfile, AccessProfile> {

    constructor(
        protected aetherService: AetherService,
        protected bs: BasketService,
        protected target: string,
    ) {
        super(aetherService, bs, target,
            '/access-profile-2.1.0', 'access-profile',
        );
    }
}
