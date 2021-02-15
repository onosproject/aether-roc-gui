/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IdTokClaims} from '../aether.component';

@Component({
    selector: 'aether-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['../common-panel.component.scss']
})
export class UserProfileComponent {
    @Output() closeEvent = new EventEmitter<boolean>();

    constructor() {
    }

    get idTokClaims(): IdTokClaims {
        const idTokClaims = localStorage.getItem('id_token_claims_obj');
        if (idTokClaims !== null) {
            return JSON.parse(idTokClaims) as IdTokClaims;
        }
        return {} as IdTokClaims;
    }

    closeCard(): void {
        this.closeEvent.emit(true);
    }
}
