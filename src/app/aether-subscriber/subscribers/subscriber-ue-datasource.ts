/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import {Subscriber, SubscriberUe} from '../../../openapi3/aether/2.1.0/models';
import {Service as AetherService} from '../../../openapi3/aether/2.1.0/services';
import {BasketService} from '../../basket.service';
import {RocDataSource} from '../../roc-data-source';

export class SubscriberUeDataSource extends RocDataSource<SubscriberUe, Subscriber> {

    constructor(
        protected aetherService: AetherService,
        protected bs: BasketService,
        protected target: string,
    ) {
        super(aetherService, bs, target,
            '/subscriber-2.1.0', 'ue',
        );
    }

}
