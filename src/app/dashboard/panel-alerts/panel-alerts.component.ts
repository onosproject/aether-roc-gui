/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {SocketService} from '../../socket.service';
import {from, Subscription, throwError} from 'rxjs';
import {switchAll, tap, pluck, mergeMap} from 'rxjs/operators';
import {Service as AetherService} from '../../../openapi3/aether/3.0.0/services';
import {AETHER_TARGETS} from '../../../environments/environment';
import {VcsVcs} from '../../../openapi3/aether/3.0.0/models/vcs-vcs';
import {OAuthService} from 'angular-oauth2-oidc';

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
    alerts: any[];
    commonAnnotations: any;
    commonLabels: any;
    externalURL: string;
    groupKey: string;
    groupLabels: any;
    receiver: string;
    status: string;
    truncatedAlerts: number;
    version: string;
}

@Component({
    selector: 'aether-panel-alerts',
    templateUrl: './panel-alerts.component.html',
    styleUrls: ['../../common-panel.component.scss']
})
export class PanelAlertsComponent implements OnInit, OnDestroy {
    @Input() top: number;
    @Input() left: number;
    @Input() width: number;
    @Input() height: number;

    private loginTokenTimer: any;
    protected wsSub: Subscription;
    public vcsAlerts: Map<string, PromAlert[]>;

    constructor(
        private socketService: SocketService,
        private aetherService: AetherService,
        private oauthService: OAuthService,
    ) {
        this.vcsAlerts = new Map();

    }

    ngOnInit(): void {
        // Wait for token to be loaded
        this.loginTokenTimer = setInterval(() => {
            if (this.oauthService.hasValidIdToken()) {
                console.log('Load VCS after token is loaded');
                this.aetherService.getVcs({target: AETHER_TARGETS[0]}).pipe(
                    pluck('vcs'),
                    mergeMap((items: VcsVcs[]) => from(items)),
                ).subscribe(
                    (vcs) => {
                        this.vcsAlerts.set(vcs.id, new Array<PromAlert>());
                        this.openWebSocket();
                    }
                );
                clearInterval(this.loginTokenTimer);
            }
        }, 10);
    }

    private openWebSocket(): void {
        this.wsSub = this.socketService.subscribe('truncatedAlerts').pipe(
            // First subscribe returns an Observable of Observables (1) - here that is flattened down
            switchAll(),
        ).pipe(
            tap(m => console.log('Prometheus alerts from "', m[RECEIVER], '"', m[COMMON_LABELS])),
            pluck('alerts'),
        ).subscribe(
            (alerts: PromAlert[]) => {
                this.vcsAlerts.forEach((vcs, id) => {
                    vcs.length = 0;
                });
                alerts.filter((alert) => alert.status === 'firing').forEach((alert) => {
                    console.log('Handling', alert.labels.alertname);
                    switch (alert.labels.alertname) {
                        case 'UeThroughputLow':
                        case 'UeLatencyHigh':
                        case 'UeJitterHigh':
                            if (this.vcsAlerts.has(alert.labels.slice)) {
                                this.vcsAlerts.get(alert.labels.slice).push(alert);
                            }
                            break;
                        case 'VcsLatencyHigh':
                        case 'VcsThroughputLow':
                            if (this.vcsAlerts.has(alert.labels.vcs_id)) {
                                this.vcsAlerts.get(alert.labels.vcs_id).push(alert);
                            }
                            break;
                        default:
                            console.warn('Unhandled alert type', alert.labels.alertname);
                    }
                });
            },
            (err) => throwError(err),
            () => {
                console.log('Websocket complete');
                this.wsSub.unsubscribe();
            }
        );
    }

    ngOnDestroy(): void {
        this.wsSub.unsubscribe();
    }
}
