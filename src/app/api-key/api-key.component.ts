/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import {Component, EventEmitter, Input, Output} from '@angular/core'

@Component({
    selector: 'aether-api-key',
    templateUrl: './api-key.component.html',
    styleUrls: ['../common-panel.component.scss']
})
export class ApiKeyComponent {
    @Input() apiKey: string;
    @Input() expiry: Date;
    @Output() closeEvent = new EventEmitter<boolean>();

    closeCard(): void {
        this.closeEvent.emit(true)
    }
}
