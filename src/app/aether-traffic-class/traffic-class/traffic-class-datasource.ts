/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import { compare, RocDataSource } from '../../roc-data-source';
import { TrafficClassTrafficClass } from '../../../openapi3/aether/4.0.0/models';
import { TrafficClass } from '../../../openapi3/aether/4.0.0/models';
import { Service as AetherService } from '../../../openapi3/aether/4.0.0/services';
import { BasketService } from '../../basket.service';

export class TrafficClassDatasource extends RocDataSource<
    TrafficClassTrafficClass,
    TrafficClass
> {
    constructor(
        protected aetherService: AetherService,
        public bs: BasketService,
        protected target: string,
        protected pelrAttr: string = 'pelr',
        protected pdbAttr: string = 'pdb',
        protected arpAttr: string = 'arp',
        protected qciAttr: string = 'qci'
    ) {
        super(
            aetherService,
            bs,
            target,
            '/traffic-class-4.0.0',
            'traffic-class'
        );
    }

    getSortedData(
        data: TrafficClassTrafficClass[]
    ): TrafficClassTrafficClass[] {
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
                case 'qci':
                    return compare(a[this.qciAttr], b[this.qciAttr], isAsc);
                case 'arp':
                    return compare(a[this.arpAttr], b[this.arpAttr], isAsc);
                case 'pdb':
                    return compare(a[this.pdbAttr], b[this.pdbAttr], isAsc);
                case 'pelr':
                    return compare(a[this.pelrAttr], b[this.pelrAttr], isAsc);
                default:
                    return 0;
            }
        });
    }
}
