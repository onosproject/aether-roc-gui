/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import {Upf, UpfUpf} from '../../../openapi3/aether/4.0.0/models';
import {Service as AetherService} from '../../../openapi3/aether/4.0.0/services';
import {BasketService} from '../../basket.service';
import {RocDataSource} from '../../roc-data-source';

export class UpfDatasource extends RocDataSource<UpfUpf, Upf> {

    constructor(
        protected aetherService: AetherService,
        protected bs: BasketService,
        protected target: string,
    ) {
        super( aetherService, bs, target,
            '/upf-4.0.0', 'upf' );
    }
}
