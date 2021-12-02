/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import { Service as AetherService } from '../../../openapi3/aether/4.0.0/services';
import { BasketService } from '../../basket.service';
import { compare, RocDataSource } from '../../roc-data-source';
import { DeviceGroupDeviceGroup } from '../../../openapi3/aether/4.0.0/models';
import { DeviceGroup } from '../../../openapi3/aether/4.0.0/models';

export class DeviceGroupDatasource extends RocDataSource<
    DeviceGroupDeviceGroup,
    DeviceGroup
> {
    constructor(
        protected aetherService: AetherService,
        public bs: BasketService,
        protected target: string,
    ) {
        super(aetherService, bs, target, '/device-group-4.0.0', 'device-group');
    }

    getSortedData(data: DeviceGroupDeviceGroup[]): DeviceGroupDeviceGroup[] {
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
                case 'ip-domain':
                    return compare(a["ip-domain"], b["ip-domain"], isAsc);
                case 'site':
                    return compare(a.site, b.site, isAsc);
                default:
                    return 0;
            }
        });
    }
}
