/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'aether-ue-monitor',
    templateUrl: './ue-monitor.component.html',
    styleUrls: ['../../common-panel.component.scss']
})
export class UeMonitorComponent {
    @Input() ueId: number;
    @Input() fullImsi: string;
    @Input() grafanaOrgId: number = 1;
    @Input() grafanaOrgName: string;

    @Output() closeEvent = new EventEmitter<boolean>();

    constructor(
        @Inject('grafana_api_proxy') private grafanaUrl: string,
    ) {
    }

    closeCard(): void {
        this.closeEvent.emit(true);
    }

    generateConnectivityPanelUrl(orgId: number, orgName: string, ueId: number, panel: number): string {
        // <iframe src="http://localhost:8183/grafana/d-solo/ue-41/ue-41-connectivity-and-
        // throughput?orgId=1&theme=light&panelId=1" width="450" height="200" frameborder="0"></iframe>
        return this.grafanaUrl + '/d-solo/ue-' + ueId + '?orgId=' + orgId +
            '&theme=light&panelId=' + panel;
    }
}
