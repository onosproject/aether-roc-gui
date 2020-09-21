/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component} from '@angular/core';
import {ConnectivityService} from '../../../onos-gui/web/onos-gui/src/app/connectivity.service';

@Component({
    selector: 'app-root',
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
