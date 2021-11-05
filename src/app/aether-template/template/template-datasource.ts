/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import {Template, TemplateTemplate} from '../../../openapi3/aether/4.0.0/models'
import {Service as AetherService} from '../../../openapi3/aether/4.0.0/services'
import {BasketService} from '../../basket.service'
import {RocDataSource} from '../../roc-data-source'

export class TemplateDatasource extends RocDataSource<TemplateTemplate, Template> {

    constructor(
        protected aetherService: AetherService,
        public bs: BasketService,
        protected target: string,
    ) {
        super(aetherService, bs, target,
            '/template-4.0.0', 'template')
    }
}
