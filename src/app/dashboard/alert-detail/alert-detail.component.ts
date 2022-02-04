/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PromAlert } from '../panel-alerts/panel-alerts.component';

@Component({
    selector: 'aether-alert-detail',
    templateUrl: './alert-detail.component.html',
    styleUrls: ['../../common-panel.component.scss'],
})
export class AlertDetailComponent {
    @Input() alert: PromAlert;
    @Output() closeEvent = new EventEmitter<boolean>();

    closeCard(): void {
        this.closeEvent.emit(true);
    }
}
