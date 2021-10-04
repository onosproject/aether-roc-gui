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
    SiteSiteService
} from '../../../openapi3/aether/3.0.0/services';
import {AETHER_TARGETS, PERFORMANCE_METRICS_ENABLED} from '../../../environments/environment';
import {filter, mergeMap, pluck} from 'rxjs/operators';
import {SiteSite} from '../../../openapi3/aether/3.0.0/models';
import {from} from 'rxjs';
import {IdTokClaims} from '../../idtoken';
import {OAuthService} from 'angular-oauth2-oidc';
import {SitePromDataSource} from '../../utils/site-prom-data-source';
import {HttpClient} from '@angular/common/http';

const sitePromTags = [
    'aetheredge_e2e_tests_ok',
    'aetheredge_in_maintenance_window'
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
            console.log('Get performance of ', this.id);
            this.promData.loadData(sitePromTags).pipe(
                filter((resultItem) => resultItem.metric.name === this.id),
            ).subscribe(
                (resultItem) => {
                    if (resultItem.metric.__name__ === 'aetheredge_e2e_tests_ok') {
                        this.health = resultItem.value[1] > 0 ? "Online" : "Offline";
                    }
                    if (resultItem.metric.__name__ === 'aetheredge_in_maintenance_window') {
                        this.health = resultItem.value[1] > 0 ? "In Maintenance" : this.health;
                    }
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
        return this.grafanaUrl + '/d-solo/' + siteName + '-cluster?orgId=' + orgId +
            '&theme=light&panelId=1';
    }

    generateAgentAvailabilityPanelUrl(orgId: number, orgName: string, siteName: string): string {
        return this.grafanaUrl + '/d-solo/' + siteName + '-agent?orgId=' + orgId +
            '&theme=light&panelId=1';
    }
}
