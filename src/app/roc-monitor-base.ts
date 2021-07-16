/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {ActivatedRoute, Router} from '@angular/router';

export abstract class RocMonitorBase {

    id: string;

    protected constructor(
        protected route: ActivatedRoute,
        protected router: Router,
    ) {
    }

    init(): void {
        this.route.paramMap.subscribe(
            value => {
                this.id = value.get('id');
            }
        );
    }
}
