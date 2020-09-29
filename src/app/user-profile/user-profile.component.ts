/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'aether-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
    @Input() name: string;
    @Input() email: string;
    @Input() groups: string[];
    @Output() closeEvent = new EventEmitter<boolean>();

    constructor() {
    }

    ngOnInit(): void {
    }

    closeCard(): void {
        this.closeEvent.emit(true);
    }
}
