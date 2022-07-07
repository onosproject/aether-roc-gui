/*
 * SPDX-FileCopyrightText: 2022-present Intel Corporation
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DhcpServer } from '../../../openapi3/sdn-fabric/0.1.0/models';
import { MatSelectChange } from '@angular/material/select';

@Component({
    selector: 'aether-select-dhcp-connect-point',
    templateUrl: './select-dhcp-connect-point.component.html',
    styleUrls: ['../../common-panel.component.scss'],
})
export class SelectDhcpConnectPointComponent {
    @Input() dhcpsAvailable: DhcpServer[] = [];
    @Output() closeEvent = new EventEmitter<DhcpServer>();

    closeCard(cancelled: boolean, chosen: MatSelectChange): void {
        if (cancelled) {
            this.closeEvent.emit();
        } else {
            this.closeEvent.emit(chosen.value);
        }
    }
}
