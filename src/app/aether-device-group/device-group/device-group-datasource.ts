/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import {Service as AetherService} from '../../../openapi3/aether/3.0.0/services';
import {BasketService} from '../../basket.service';
import {RocDataSource} from '../../roc-data-source';
import {DeviceGroupDeviceGroup} from '../../../openapi3/aether/3.0.0/models';
import {DeviceGroup} from '../../../openapi3/aether/3.0.0/models';

export class DeviceGroupDatasource extends RocDataSource<DeviceGroupDeviceGroup, DeviceGroup> {

    constructor(
        protected aetherService: AetherService,
        protected bs: BasketService,
        protected target: string,
    ) {
        super(aetherService, bs, target, '/device-group-3.0.0', 'device-group');
    }
}
