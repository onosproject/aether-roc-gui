/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
    OpenPolicyAgentService,
    AETHER_ROC_ADMIN_USER,
} from '../../open-policy-agent.service';
import { ApiService as TopLevelApiService } from '../../../openapi3/top/level/services';

@Component({
    selector: 'aether-sdcore',
    templateUrl: './sdcore.component.html',
    styleUrls: ['../../common-profiles.component.scss'],
})
export class SdcoreComponent {
    AETHER_ROC_ADMIN_USER = AETHER_ROC_ADMIN_USER;

    constructor(
        private topLevelService: TopLevelApiService,
        public opaService: OpenPolicyAgentService,
        protected snackBar: MatSnackBar,
        @Inject('sdcore-adapter-service') public sdcoreAdapter: string
    ) {}

    synchronize(): void {
        this.topLevelService
            .sdcorePushConfigTopLevel({
                service: this.sdcoreAdapter,
            })
            .subscribe(
                (value) => {
                    this.snackBar.open('Synchronizing: ' + value, undefined, {
                        duration: 2000,
                    });
                },
                (err) =>
                    this.snackBar.open('Error:' + err.error, 'Dismiss', {
                        duration: 20000,
                    })
            );
    }
}
