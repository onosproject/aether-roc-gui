/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, Input, OnInit } from '@angular/core';
import { SocketService } from '../../socket.service';
import { Observable } from 'rxjs';
import { switchAll, tap, pluck, map } from 'rxjs/operators';
import { Service as AetherService } from '../../../openapi3/aether/4.0.0/services';
import { PROMETHEUS_PROXY } from '../../../environments/environment';
import { OAuthService } from 'angular-oauth2-oidc';

const RECEIVER = 'receiver';
const COMMON_LABELS = 'commonLabels';

export interface PromAlert {
    status: string;
    labels: PromAlertLabel;
    annotations: PromAlertAnnotations;
    startsAt: Date;
    endsAt: Date;
    generatorURL: string;
    fingerprint: string;
}

export interface PromAlertAnnotations {
    description: string;
    summary: string;
}

export interface PromAlertLabel {
    alertname: string;
    direction: string;
    id: string;
    instance: string;
    job: string;
    severity: string;
    slice: string;
    vcs_id: string;
}

export interface PromAlerts {
    alerts: unknown[];
    commonAnnotations: unknown;
    commonLabels: unknown;
    externalURL: string;
    groupKey: string;
    groupLabels: unknown;
    receiver: string;
    status: string;
    truncatedAlerts: number;
    version: string;
}

@Component({
    selector: 'aether-panel-alerts',
    templateUrl: './panel-alerts.component.html',
    styleUrls: [
        '../../common-panel.component.scss',
        '../panel-dashboard.component.scss',
    ],
})
export class PanelAlertsComponent implements OnInit {
    @Input() top: number;
    @Input() left: number;
    @Input() width: number;
    @Input() height: number;
    public dataObs: Observable<PromAlert[]>;
    private loginTokenTimer: unknown;
    public selectedAlert: PromAlert;

    public static relativePromLink(url: string): string {
        const prefix = /http(.*):9090/;
        return url.replace(prefix, PROMETHEUS_PROXY);
    }

    constructor(
        private socketService: SocketService,
        private aetherService: AetherService,
        private oauthService: OAuthService
    ) {}

    ngOnInit(): void {
        this.dataObs = this.openWebSocket();
    }

    // Produces an Observable to use with <mat-table>
    openWebSocket(): Observable<PromAlert[]> {
        return this.socketService
            .subscribe('truncatedAlerts')
            .pipe(
                // First subscribe returns an Observable of Observables (1) - here that is flattened down
                switchAll()
            )
            .pipe(
                tap((m) =>
                    console.log(
                        'Prometheus alerts from "',
                        m[RECEIVER],
                        '"',
                        m[COMMON_LABELS]
                    )
                ),
                pluck('alerts'),
                map((alerts: PromAlert[]) =>
                    alerts.filter((alert) => alert.status === 'firing')
                )
            );
    }

    // ngOnDestroy(): void {
    //     // <mat-table> automatically calls unsubscribe() on exit
    // }

    showPrometheus(url: string): void {
        if (url === undefined) {
            return undefined;
        }
        window.open(PanelAlertsComponent.relativePromLink(url), '_blank');
    }
}
