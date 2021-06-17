/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import {RocDataSource} from '../../roc-data-source';
import {TrafficClassTrafficClass} from '../../../openapi3/aether/3.0.0/models/traffic-class-traffic-class';
import {TrafficClass} from '../../../openapi3/aether/3.0.0/models/traffic-class';
import {Service as AetherService} from '../../../openapi3/aether/3.0.0/services/service';
import {BasketService} from '../../basket.service';

export class TrafficClassDatasource extends RocDataSource<TrafficClassTrafficClass, TrafficClass> {
    constructor(
        protected aetherService: AetherService,
        protected bs: BasketService,
        protected target: string,
    ) {
        super(aetherService, bs, target,
            '/traffic-class-3.0.0', 'traffic-class',
        );
    }
}
