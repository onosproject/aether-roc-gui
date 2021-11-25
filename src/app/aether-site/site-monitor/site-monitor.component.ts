/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {
    Component,
    ElementRef,
    Inject,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { RocMonitorBase } from '../../roc-monitor-base';
import { ActivatedRoute, Router } from '@angular/router';
import {
    Service as AetherService,
    SiteSiteService,
} from '../../../openapi3/aether/4.0.0/services';
import {
    AETHER_TARGETS,
    PERFORMANCE_METRICS_ENABLED,
    PROMETHEUS_PROXY,
} from '../../../environments/environment';
import { filter } from 'rxjs/operators';
import { SiteSite } from '../../../openapi3/aether/4.0.0/models';
import { IdTokClaims } from '../../idtoken';
import { OAuthService } from 'angular-oauth2-oidc';
import { SitePromDataSource } from '../../utils/site-prom-data-source';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscriber } from 'rxjs';

const sitePromTags = [
    'aetheredge_e2e_tests_ok',
    'aetheredge_in_maintenance_window',
    'aetheredge_e2e_tests_down',
];

@Component({
    selector: 'aether-site-monitor',
    templateUrl: './site-monitor.component.html',
    styleUrls: ['../../common-profiles.component.scss'],
})
export class SiteMonitorComponent
    extends RocMonitorBase
    implements OnInit, OnDestroy
{
    performancePanels: string[] = [];
    ueConnectivityPanels: string[] = [];
    thisSite: SiteSite;

    clusterAvailabilityPanelUrl: string;
    agentAvailabilityPanelUrl: string;
    smallCellConnectivityPanelUrl: string;

    grafanaOrgId: number = 1;
    grafanaOrgName: string;

    prometheusTimer: any;
    health: string;
    promData: SitePromDataSource;

    performanceMetricsEnabled: boolean = PERFORMANCE_METRICS_ENABLED;

    @ViewChild('iframe') iframe: ElementRef;

    constructor(
        protected aetherService: AetherService,
        protected siteService: SiteSiteService,
        protected route: ActivatedRoute,
        protected router: Router,
        private httpClient: HttpClient,
        private oauthService: OAuthService,
        @Inject('grafana_api_proxy') private grafanaUrl: string
    ) {
        super(route, router);
        this.promData = new SitePromDataSource(httpClient);
    }

    ngOnInit(): void {
        super.init();
        if (this.oauthService.hasValidIdToken()) {
            const claims = this.oauthService.getIdentityClaims() as IdTokClaims;
            // TODO: enhance this - it takes the last group, having all lower case as the Grafana Org.
            this.getSite().subscribe(
                (site) => {
                    console.log('Found Site', site.id);
                    this.thisSite = site;

                    this.grafanaOrgName = claims.groups.find(
                        (g) => g === g.toLowerCase()
                    );
                    this.clusterAvailabilityPanelUrl =
                        this.generateClusterAvailabilityPanelUrl(
                            this.grafanaOrgId,
                            this.grafanaOrgName
                        );
                    this.agentAvailabilityPanelUrl =
                        this.generateAgentAvailabilityPanelUrl(
                            this.grafanaOrgId,
                            this.grafanaOrgName
                        );
                    this.smallCellConnectivityPanelUrl =
                        this.generateSmallCellConnectivityPanelUrl(
                            this.grafanaOrgId,
                            this.grafanaOrgName
                        );
                },
                (err) => console.warn('Site', this.id, 'not found.', err)
            );
        }
    }

    ngOnDestroy(): void {
        clearInterval(this.prometheusTimer);
    }

    private getSite(): Observable<SiteSite> {
        return this.siteService.getSiteSite({
            target: AETHER_TARGETS[0],
            id: this.id,
        });
    }

    generateClusterAvailabilityPanelUrl(
        orgId: number,
        orgName: string
    ): string {
        // This will show the Cluster metrics
        let baseUrl = `${this.grafanaUrl}/d-solo/site-availability/cluster-health?orgId=${orgId}&theme=light&panelId=1`;

        // Filter from ACE datasource
        baseUrl += `&var-ds=datasource-${this.thisSite.id}`;

        return baseUrl;
    }

    generateAgentAvailabilityPanelUrl(orgId: number, orgName: string): string {
        // This will show the E2E metrics for tests, maintenance window, agent down
        let baseUrl = `${this.grafanaUrl}/d-solo/site-monitoring/e2e-tests?orgId=${orgId}&theme=light&panelId=1`;

        // Filter from AMP datasource
        baseUrl += '&var-ds=datasource-amp';

        // Filter for Monitoring agents
        this.thisSite.monitoring['edge-device'].forEach((device) => {
            baseUrl += `&var-agents=${device['edge-device-id']}`;
        });

        return baseUrl;
    }

    generateSmallCellConnectivityPanelUrl(
        orgId: number,
        orgName: string
    ): string {
        // This will show the E2E metrics for tests, maintenance window, agent down
        let baseUrl = `${this.grafanaUrl}/d-solo/site-small-cell/enb-status?orgId=${orgId}&theme=light&panelId=1`;

        // Filter from ACC datasource
        baseUrl += '&var-ds=datasource-acc';

        // Filter for ENBs
        this.thisSite['small-cell'].forEach((enb) => {
            baseUrl += `&var-enb=${enb['small-cell-id']}`;
        });

        return baseUrl;
    }
}
