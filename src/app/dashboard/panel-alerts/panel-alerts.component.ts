/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'aether-panel-alerts',
    templateUrl: './panel-alerts.component.html',
    styleUrls: ['../../common-panel.component.scss']
})
export class PanelAlertsComponent implements OnInit {
    @Input() top: number;
    @Input() left: number;
    @Input() width: number;
    @Input() height: number;

    constructor() {
    }

    ngOnInit(): void {
    }

}
