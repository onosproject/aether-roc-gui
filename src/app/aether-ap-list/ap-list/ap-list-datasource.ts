/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import {Service as AetherService} from '../../../openapi3/aether/4.0.0/services';
import {ApListApList} from '../../../openapi3/aether/4.0.0/models/ap-list-ap-list';
import {ApList} from '../../../openapi3/aether/4.0.0/models/ap-list';
import {BasketService} from '../../basket.service';
import {RocDataSource} from '../../roc-data-source';


export class ApListDatasource extends RocDataSource<ApListApList, ApList> {

    constructor(
        protected aetherService: AetherService,
        protected bs: BasketService,
        protected target: string,
    ) {
        super(aetherService, bs, target, '/ap-list-4.0.0', 'ap-list');
    }
}
