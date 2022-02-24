/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { RocMonitorBase } from '../../roc-monitor-base';
import { ActivatedRoute, Router } from '@angular/router';
import {
    EnterprisesEnterpriseSiteService,
    EnterprisesEnterpriseTrafficClassService,
    EnterprisesEnterpriseSiteUpfService,
    EnterprisesEnterpriseSiteSliceService,
    EnterprisesEnterpriseService,
} from '../../../openapi3/aether/2.0.0/services';
import {
    AETHER_TARGET,
    PERFORMANCE_METRICS_ENABLED,
} from '../../../environments/environment';
import { filter, mergeMap, pluck } from 'rxjs/operators';
import {
    EnterprisesEnterpriseApplication,
    EnterprisesEnterpriseSiteDeviceGroup,
    EnterprisesEnterpriseSite,
    EnterprisesEnterpriseTrafficClass,
    EnterprisesEnterpriseSiteUpf,
    EnterprisesEnterpriseSiteSlice,
} from '../../../openapi3/aether/2.0.0/models';
import { from } from 'rxjs';
import { IdTokClaims } from '../../idtoken';
import { OAuthService } from 'angular-oauth2-oidc';
import { VcsPromDataSource } from '../../utils/vcs-prom-data-source';
import { HttpClient } from '@angular/common/http';

const vcsPromTags = ['vcs_latency', 'vcs_jitter', 'vcs_throughput'];

@Component({
    selector: 'aether-vcs-monitor',
    templateUrl: './slice-monitor.component.html',
    styleUrls: ['../../common-profiles.component.scss'],
})
export class SliceMonitorComponent
    extends RocMonitorBase
    implements OnInit, OnDestroy
{
    performancePanels: string[] = [];
    ueConnectivityPanels: string[] = [];
    thisVcs: EnterprisesEnterpriseSiteSlice;
    deviceGroups: Map<EnterprisesEnterpriseSiteDeviceGroup, boolean>;
    applications: Map<EnterprisesEnterpriseApplication, boolean>;
    upf: EnterprisesEnterpriseSiteUpf;
    site: EnterprisesEnterpriseSite;
    trafficClass: EnterprisesEnterpriseTrafficClass;
    connectivityPanelUrl: string;
    performancePanelUrl: string;
    grafanaOrgId = 1;
    grafanaOrgName: string;

    prometheusTimer: ReturnType<typeof setTimeout>;
    throughput: unknown;
    latency: unknown;
    jitter: unknown;
    promData: VcsPromDataSource;

    performanceMetricsEnabled: boolean = PERFORMANCE_METRICS_ENABLED;

    constructor(
        protected sliceService: EnterprisesEnterpriseSiteSliceService,
        protected upfService: EnterprisesEnterpriseSiteUpfService,
        protected tcService: EnterprisesEnterpriseTrafficClassService,
        protected siteService: EnterprisesEnterpriseSiteService,
        protected enterpriseService: EnterprisesEnterpriseService,
        protected route: ActivatedRoute,
        protected router: Router,
        private httpClient: HttpClient,
        private oauthService: OAuthService,
        @Inject('grafana_api_proxy') private grafanaUrl: string
    ) {
        super(route, router);
        this.deviceGroups = new Map<
            EnterprisesEnterpriseSiteDeviceGroup,
            boolean
        >();
        this.applications = new Map<
            EnterprisesEnterpriseApplication,
            boolean
        >();
        this.promData = new VcsPromDataSource(httpClient);
    }

    ngOnInit(): void {
        super.init();
        this.getChildrenOfVcs();
        if (this.oauthService.hasValidIdToken()) {
            const claims = this.oauthService.getIdentityClaims() as IdTokClaims;
            // TODO: enhance this - it takes the last group, having all lower case as the Grafana Org.
            this.grafanaOrgName = claims.groups.find(
                (g) => g === g.toLowerCase()
            );
            this.connectivityPanelUrl = this.generateConnectivityPanelUrl(
                this.grafanaOrgId,
                this.grafanaOrgName,
                this.id
            );
            this.performancePanelUrl = this.generatePerformancePanelUrl(
                this.grafanaOrgId,
                this.grafanaOrgName,
                this.id
            );
        }

        this.prometheusTimer = setInterval(() => {
            console.log('Get performance of ', this.id);
            this.promData
                .loadData(vcsPromTags)
                .pipe(
                    filter((resultItem) => resultItem.metric.vcs_id === this.id)
                )
                .subscribe((resultItem) => {
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
                            console.warn(
                                'Unexpected name in ResultItem',
                                resultItem.metric.__name__
                            );
                    }
                });
        }, 2000);
    }

    ngOnDestroy(): void {
        clearInterval(this.prometheusTimer);
    }

    private getChildrenOfVcs(): void {
        this.sliceService
            .getEnterprisesEnterpriseSiteSlice({
                target: AETHER_TARGET,
                'enterprise-id': this.route.snapshot.params['enterprise-id'],
                'site-id': this.route.snapshot.params['site-id'],
                'slice-id': this.id,
            })
            .subscribe(
                (vcs) => {
                    console.log(
                        'Found Slice',
                        vcs['slice-id'],
                        'Has device Groups',
                        vcs['device-group'],
                        'applications',
                        vcs.filter
                    );
                    this.thisVcs = vcs;
                    const enabledDg = new Map<string, boolean>();
                    vcs['device-group'].forEach((dg) => {
                        enabledDg.set(dg['device-group'], dg.enable);
                    });
                    const allowedApp = new Map<string, boolean>();
                    vcs.filter.forEach((app) => {
                        allowedApp.set(app.application, app.allow);
                    });
                    this.getDeviceGroupDetails(enabledDg);
                    this.getApplicationDetails(allowedApp);
                    this.getUpf(vcs.upf);
                },
                (err) => console.warn('Slice', this.id, 'not found.', err)
            );
    }

    private getDeviceGroupDetails(deviceGroups: Map<string, boolean>): void {
        this.siteService
            .getEnterprisesEnterpriseSite({
                target: AETHER_TARGET,
                'enterprise-id': this.route.snapshot.params['enterprise-id'],
                'site-id': this.route.snapshot.params['site-id'],
            })
            .pipe(
                pluck('device-group'),
                mergeMap((items: EnterprisesEnterpriseSiteDeviceGroup[]) =>
                    from(items)
                ),
                filter((dg: EnterprisesEnterpriseSiteDeviceGroup) =>
                    deviceGroups.has(dg['device-group-id'])
                )
            )
            .subscribe(
                (dg) => {
                    this.deviceGroups.set(
                        dg,
                        deviceGroups.get(dg['device-group-id'])
                    );
                    // this.getSite(dg.);
                },
                (err) => console.warn('Error getting device-group', err)
            );
    }

    private getSite(siteID: string): void {
        this.siteService
            .getEnterprisesEnterpriseSite({
                target: AETHER_TARGET,
                'enterprise-id': this.route.snapshot.params['enterprise-id'],
                'site-id': siteID,
            })
            .subscribe(
                (value: EnterprisesEnterpriseSite) => (this.site = value),
                (err) => console.warn('Error loading site', siteID, err)
            );
    }

    private getApplicationDetails(application: Map<string, boolean>): void {
        this.enterpriseService
            .getEnterprisesEnterprise({
                target: AETHER_TARGET,
                'enterprise-id': this.route.snapshot.params['enterprise-id'],
            })
            .pipe(
                pluck('application'),
                mergeMap((items: EnterprisesEnterpriseApplication[]) =>
                    from(items)
                ),
                filter((app: EnterprisesEnterpriseApplication) =>
                    application.has(app['application-id'])
                )
            )
            .subscribe(
                (app) =>
                    this.applications.set(
                        app,
                        application.get(app['application-id'])
                    ),
                (err) => console.warn('Error getting application', err)
            );
    }

    private getUpf(upfID: string): void {
        this.upfService
            .getEnterprisesEnterpriseSiteUpf({
                target: AETHER_TARGET,
                'enterprise-id': this.route.snapshot.params['enterprise-id'],
                'site-id': this.route.snapshot.params['site-id'],
                'upf-id': upfID,
            })
            .subscribe(
                (upf: EnterprisesEnterpriseSiteUpf) => (this.upf = upf),
                (err) => console.warn('Error in getting UPF', err)
            );
    }

    generateConnectivityPanelUrl(
        orgId: number,
        orgName: string,
        vcsName: string
    ): string {
        return (
            this.grafanaUrl +
            '/d-solo/' +
            vcsName +
            '-ue-conn?orgId=' +
            orgId +
            '&theme=light&panelId=1'
        );
    }

    generatePerformancePanelUrl(
        orgId: number,
        orgName: string,
        vcsName: string
    ): string {
        return (
            this.grafanaUrl +
            '/d-solo/slice-' +
            vcsName +
            '?orgId=' +
            orgId +
            '&theme=light&panelId=1'
        );
    }
}
