/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ConnectivityService {

    vcd: any; // The veil Delegate

    constructor() {
    }

    showVeil(messages: string[]): void {
        this.vcd.show(messages);
    }

    hideVeil(): void {
        this.vcd.enabled = false;
        this.vcd.messages = [];
        this.vcd.hide();
    }

    setVeilDelegate(veil: any): void {
        this.vcd = veil;
    }
}
