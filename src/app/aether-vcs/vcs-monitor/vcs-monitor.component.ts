/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {RocMonitorBase} from '../../roc-monitor-base';
import {ActivatedRoute, Router} from '@angular/router';
import {
    ApListApListService,
    Service as AetherService, TrafficClassTrafficClassService,
    UpfUpfService, VcsVcsService
} from '../../../openapi3/aether/3.0.0/services';
import {AETHER_TARGETS} from '../../../environments/environment';
import {filter, mergeMap, pluck} from 'rxjs/operators';
import {
    ApListApList,
    ApplicationApplication,
    DeviceGroupDeviceGroup, TrafficClassTrafficClass, UpfUpf,
    VcsVcs
} from '../../../openapi3/aether/3.0.0/models';
import {from} from 'rxjs';
import {IdTokClaims} from '../../idtoken';
import {OAuthService} from 'angular-oauth2-oidc';
import {VcsPromDataSource} from '../../utils/vcs-prom-data-source';
import {HttpClient} from '@angular/common/http';

const vcsPromTags = [
    'vcs_latency',
    'vcs_jitter',
    'vcs_throughput',
];

@Component({
    selector: 'aether-vcs-monitor',
    templateUrl: './vcs-monitor.component.html',
    styleUrls: ['../../common-profiles.component.scss']
})
export class VcsMonitorComponent extends RocMonitorBase implements OnInit, OnDestroy {

    performancePanels: string[] = [];
    ueConnectivityPanels: string[] = [];
    thisVcs: VcsVcs;
    deviceGroups: Map<DeviceGroupDeviceGroup, boolean>;
    applications: Map<ApplicationApplication, boolean>;
    apList: ApListApList;
    upf: UpfUpf;
    trafficClass: TrafficClassTrafficClass;
    connectivityPanelUrl: string;
    performancePanelUrl: string;
    grafanaOrgId: number = 1;
    grafanaOrgName: string;

    prometheusTimer: any;
    throughput: number;
    latency: number;
    jitter: number;
    promData: VcsPromDataSource;

    constructor(
        protected aetherService: AetherService,
        protected vcsService: VcsVcsService,
        protected upfService: UpfUpfService,
        protected tcService: TrafficClassTrafficClassService,
        protected apListService: ApListApListService,
        protected route: ActivatedRoute,
        protected router: Router,
        private httpClient: HttpClient,
        private oauthService: OAuthService,
        @Inject('grafana_api_proxy') private grafanaUrl: string,
    ) {
        super(route, router);
        this.deviceGroups = new Map<DeviceGroupDeviceGroup, boolean>();
        this.applications = new Map<ApplicationApplication, boolean>();
        this.promData = new VcsPromDataSource(httpClient);
    }

    ngOnInit(): void {
        super.init();
        this.getChildrenOfVcs();
        if (this.oauthService.hasValidIdToken()) {
            const claims = this.oauthService.getIdentityClaims() as IdTokClaims;
            // TODO: enhance this - it takes the last group, having all lower case as the Grafana Org.
            this.grafanaOrgName = claims.groups.find((g) => g === g.toLowerCase());
            this.connectivityPanelUrl = this.generateConnectivityPanelUrl(this.grafanaOrgId, this.grafanaOrgName, this.id);
            this.performancePanelUrl = this.generatePerformancePanelUrl(this.grafanaOrgId, this.grafanaOrgName, this.id);
        }

        this.prometheusTimer = setInterval(() => {
            console.log('Get performance of ', this.id);
            this.promData.loadData(vcsPromTags).pipe(
                filter((resultItem) => resultItem.metric.vcs_id === this.id),
            ).subscribe(
                (resultItem) => {
                    switch (resultItem.metric.__name__) {
                        case 'vcs_latency':
                            this.latency = resultItem.value[1];
                            break;
                        case 'vcs_jitter':
                            this.jitter = resultItem.value[1];
                            break;
                        case 'vcs_throughput':
                            this.throughput = resultItem.value[1];
                            break;
                        default:
                            console.warn('Unexpected name in ResultItem', resultItem.metric.__name__);
                    }
                }
            );
        }, 2000);
    }

    ngOnDestroy(): void {
        clearInterval(this.prometheusTimer);
    }

    private getChildrenOfVcs(): void {
        this.vcsService.getVcsVcs({target: AETHER_TARGETS[0], id: this.id}).subscribe(
            (vcs) => {
                console.log('Found VCS', vcs.id, 'Has device Groups', vcs['device-group'], 'applications', vcs.application);
                this.thisVcs = vcs;
                const enabledDg = new Map<string, boolean>();
                vcs['device-group'].forEach((dg) => {
                    enabledDg.set(dg['device-group'], dg.enable);
                });
                const allowedApp = new Map<string, boolean>();
                vcs.application.forEach((app) => {
                    allowedApp.set(app.application, app.allow);
                });
                this.getDeviceGroupDetails(enabledDg);
                this.getApplicationDetails(allowedApp);
                this.getAccessPoints(vcs.ap);
                this.getUpf(vcs.upf);
                this.getTrafficClass(vcs['traffic-class']);
            },
            (err) => console.warn('VCS', this.id, 'not found.', err)
        );
    }

    private getDeviceGroupDetails(deviceGroups: Map<string, boolean>): void {
        this.aetherService.getDeviceGroup({target: AETHER_TARGETS[0]}).pipe(
            pluck('device-group'),
            mergeMap((items: DeviceGroupDeviceGroup[]) => from(items)),
            filter((dg: DeviceGroupDeviceGroup) => deviceGroups.has(dg.id))
        ).subscribe(
            (dg) => this.deviceGroups.set(dg, deviceGroups.get(dg.id)),
            (err => console.warn('Error getting device-group'))
        );
    }

    private getApplicationDetails(application: Map<string, boolean>): void {
        this.aetherService.getApplication({target: AETHER_TARGETS[0]}).pipe(
            pluck('application'),
            mergeMap((items: ApplicationApplication[]) => from(items)),
            filter((app: ApplicationApplication) => application.has(app.id))
        ).subscribe(
            (app) => this.applications.set(app, application.get(app.id)),
            (err) => console.warn('Error getting application')
        );
    }

    private getAccessPoints(aplist: string): void {
        this.apListService.getApListApList({target: AETHER_TARGETS[0], id: aplist}).subscribe(
            (apList: ApListApList) => this.apList = apList,
            (err) => console.warn('Error in getting APList')
        );
    }

    private getUpf(upfID: string): void {
        this.upfService.getUpfUpf({target: AETHER_TARGETS[0], id: upfID}).subscribe(
            (upf: UpfUpf) => this.upf = upf,
            (err) => console.warn('Error in getting UPF')
        );
    }

   private getTrafficClass(trafficClassId: string): void {
        this.tcService.getTrafficClassTrafficClass({target: AETHER_TARGETS[0], id: trafficClassId}).subscribe(
            (tc: TrafficClassTrafficClass) => this.trafficClass = tc,
            (err) => console.warn('Error in getting Traffic Class')
        );
    }

    generateConnectivityPanelUrl(orgId: number, orgName: string, vcsName: string): string {
        return this.grafanaUrl + '/d-solo/' + vcsName + '-ue-conn?orgId=' + orgId +
            '&theme=light&panelId=1';
    }

    generatePerformancePanelUrl(orgId: number, orgName: string, vcsName: string): string {
        return this.grafanaUrl + '/d-solo/vcs-' + vcsName + '?orgId=' + orgId +
            '&theme=light&panelId=1';
    }
}