/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {RocMonitorBase} from '../../roc-monitor-base';
import {ActivatedRoute, Router} from '@angular/router';
import {
    Service as AetherService,
    SiteSiteService
} from '../../../openapi3/aether/4.0.0/services';
import {AETHER_TARGETS, PERFORMANCE_METRICS_ENABLED} from '../../../environments/environment';
import {filter} from 'rxjs/operators';
import {SiteSite} from '../../../openapi3/aether/4.0.0/models';
import {IdTokClaims} from '../../idtoken';
import {OAuthService} from 'angular-oauth2-oidc';
import {SitePromDataSource} from '../../utils/site-prom-data-source';
import {HttpClient} from '@angular/common/http';

const sitePromTags = [
    'aetheredge_e2e_tests_ok',
    'aetheredge_in_maintenance_window',
    'aetheredge_e2e_tests_down'
];

@Component({
    selector: 'aether-site-monitor',
    templateUrl: './site-monitor.component.html',
    styleUrls: ['../../common-profiles.component.scss']
})
export class SiteMonitorComponent extends RocMonitorBase implements OnInit, OnDestroy {

    performancePanels: string[] = [];
    ueConnectivityPanels: string[] = [];
    thisSite: SiteSite;

    clusterAvailabilityPanelUrl: string;
    agentAvailabilityPanelUrl: string;
    grafanaOrgId: number = 1;
    grafanaOrgName: string;

    prometheusTimer: any;
    health: string;
    promData: SitePromDataSource;

    performanceMetricsEnabled: boolean = PERFORMANCE_METRICS_ENABLED;

    constructor(
        protected aetherService: AetherService,
        protected siteService: SiteSiteService,
        protected route: ActivatedRoute,
        protected router: Router,
        private httpClient: HttpClient,
        private oauthService: OAuthService,
        @Inject('grafana_api_proxy') private grafanaUrl: string,
    ) {
        super(route, router);
        this.promData = new SitePromDataSource(httpClient);
    }

    ngOnInit(): void {
        super.init();
        if (this.oauthService.hasValidIdToken()) {
            const claims = this.oauthService.getIdentityClaims() as IdTokClaims;
            // TODO: enhance this - it takes the last group, having all lower case as the Grafana Org.
            this.getSite();
            this.grafanaOrgName = claims.groups.find((g) => g === g.toLowerCase());
            this.clusterAvailabilityPanelUrl = this.generateClusterAvailabilityPanelUrl(this.grafanaOrgId, this.grafanaOrgName, this.id);
            this.agentAvailabilityPanelUrl = this.generateAgentAvailabilityPanelUrl(this.grafanaOrgId, this.grafanaOrgName, this.id);
        }

        this.prometheusTimer = setInterval(() => {
            console.log('Get connectivity of', this.id);
            this.promData.loadData(sitePromTags).subscribe(
                (resultItem) => {
                    this.thisSite["monitoring"]["edge-device"]
                        .filter((device) => device["name"] === resultItem.metric.name)
                        .forEach((device) => {
                            if(resultItem.metric.__name__ === 'aetheredge_e2e_tests_ok') {
                                device["health"] = resultItem.value[1] > 0 ? "Online" : "Offline";
                            }

                            if(resultItem.metric.__name__ === 'aetheredge_e2e_tests_down') {
                                device["health"] = resultItem.value[1] > 0 ? "Tests Down" : device["health"];
                            }

                            if(resultItem.metric.__name__ === 'aetheredge_in_maintenance_window') {
                                device["health"] = resultItem.value[1] > 0 ? "Maintenance" : device["health"];
                            }
                        })
                }
            );
        }, 2000);
    }

    ngOnDestroy(): void {
        clearInterval(this.prometheusTimer);
    }

    private getSite(): void {
        this.siteService.getSiteSite({target: AETHER_TARGETS[0], id: this.id}).subscribe(
            (site) => {
                console.log('Found Site', site.id);
                this.thisSite = site;
            },
            (err) => console.warn('Site', this.id, 'not found.', err)
        );
    }

    generateClusterAvailabilityPanelUrl(orgId: number, orgName: string, siteName: string): string {
        // This will show the Cluster metrics
        return this.grafanaUrl + '/d-solo/site-' + siteName + '/site-' + siteName + '-availability?orgId=' + orgId +
            '&theme=light&panelId=1';
    }

    generateAgentAvailabilityPanelUrl(orgId: number, orgName: string, siteName: string): string {
        // This will show the E2E metrics for tests, maintenance window, agent down
        return this.grafanaUrl + '/d-solo/site-' + siteName + '/site-' + siteName + '-availability?orgId=' + orgId +
            '&theme=light&panelId=2';
    }
}
