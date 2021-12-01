/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import { Vcs, VcsVcs } from '../../../openapi3/aether/4.0.0/models';
import { Service as AetherService } from '../../../openapi3/aether/4.0.0/services';
import { BasketService } from '../../basket.service';
import { compare, RocDataSource } from '../../roc-data-source';

export class VcsDatasource extends RocDataSource<VcsVcs, Vcs> {
    constructor(
        protected aetherService: AetherService,
        protected bs: BasketService,
        protected target: string,
        protected DBAttr: string = 'default-behavior',
        protected enterpriseAttr: string = 'enterprise',
        protected siteAttr: string = 'site',
        protected upfAttr: string = 'upf',
        protected CEPAttr: string = 'config-endpoint',
        protected portAttr: string = 'port'
    ) {
        super(aetherService, bs, target, '/vcs-4.0.0', 'vcs');
    }

    getSortedData(data) {
        if (
            !this.sort.active ||
            this.sort.direction === '' ||
            this.sort.active === 'id' ||
            this.sort.active === 'description'
        ) {
            return super.getSortedData(data);
        }

        return data.sort((a, b) => {
            const isAsc = this.sort.direction === 'asc';
            switch (this.sort.active) {
                case 'port':
                    return compare(a[this.portAttr], b[this.portAttr], isAsc);
                case 'config-endpoint':
                    return compare(a[this.CEPAttr], b[this.CEPAttr], isAsc);
                case 'upf':
                    return compare(a[this.upfAttr], b[this.upfAttr], isAsc);
                case 'site':
                    return compare(a[this.siteAttr], b[this.siteAttr], isAsc);
                case 'default-behavior':
                    return compare(a[this.DBAttr], b[this.DBAttr], isAsc);
                case 'enterprise':
                    return compare(
                        a[this.enterpriseAttr],
                        b[this.enterpriseAttr],
                        isAsc
                    );
                default:
                    return 0;
            }
        });
    }
}
