/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {PERFORMANCE_METRICS_ENABLED} from '../../../environments/environment';

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

    performanceMetricsEnabled: boolean = PERFORMANCE_METRICS_ENABLED;

    constructor(
        @Inject('grafana_api_proxy') private grafanaUrl: string,
    ) {
    }

    closeCard(): void {
        this.closeEvent.emit(true);
    }

    generateConnectivityPanelUrl(orgId: number, orgName: string, ueId: number, panel: number): string {
        let baseUrl = `${this.grafanaUrl}/d-solo/ue-conn/ue-connectivity?orgId=${orgId}&theme=light&panelId=${panel}`;

        // Filter for IMSI
        baseUrl += `&var-imsi=${ueId}`;

        return baseUrl
    }
}
