/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import { Service as AetherService } from '../../../openapi3/aether/4.0.0/services';
import {
    Application,
    ApplicationApplication,
} from '../../../openapi3/aether/4.0.0/models';
import { BasketService } from '../../basket.service';
import { RocDataSource } from '../../roc-data-source';

export class ApplicationDatasource extends RocDataSource<
    ApplicationApplication,
    Application
> {
    constructor(
        protected aetherService: AetherService,
        protected bs: BasketService,
        protected target: string
    ) {
        super(aetherService, bs, target, '/application-4.0.0', 'application');
    }
}
