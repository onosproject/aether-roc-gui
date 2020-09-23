/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component} from '@angular/core';
import {ConnectivityService} from './connectivity.service';

@Component({
    selector: 'aether-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'aether-roc-gui';

    constructor(
        public connectivity: ConnectivityService,
    ) {
    }
}
