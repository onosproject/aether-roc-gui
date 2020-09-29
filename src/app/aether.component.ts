/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, Input} from '@angular/core';

@Component({
    selector: 'aether-root',
    templateUrl: './aether.component.html',
    styleUrls: ['./aether.component.scss']
})
export class AetherComponent {
    userProfileDisplay: boolean = false;

    constructor(
    ) {
    }

    showhelp(): void {
        alert('Showing help');
    }

    signingOut(): void {
        alert('signing out');
    }
}
