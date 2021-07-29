/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {AfterViewInit, Component, Inject, Input, OnDestroy, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {VcsVcs} from '../../../openapi3/aether/3.0.0/models';
import {RocListBase} from '../../roc-list-base';
import {AETHER_TARGETS} from '../../../environments/environment';
import {OpenPolicyAgentService} from '../../open-policy-agent.service';
import {Service as AetherService} from '../../../openapi3/aether/3.0.0/services/service';
import {BasketService} from '../../basket.service';
import {PanelVcsDatasource} from './panel-vcs-datasource';
import {VcsPromDataSource} from '../../utils/vcs-prom-data-source';
import {HttpClient} from '@angular/common/http';
import {OAuthService} from 'angular-oauth2-oidc';
import {IdTokClaims} from '../../idtoken';

const vcsPromTags = [
    'vcs_latency',
    'vcs_jitter',
    'vcs_throughput',
];

@Component({
    selector: 'aether-panel-vcs',
    templateUrl: './panel-vcs.component.html',
    styleUrls: ['../../common-panel.component.scss']
})
export class PanelVcsComponent extends RocListBase<PanelVcsDatasource> implements AfterViewInit, OnDestroy {
    @Input() top: number;
    @Input() left: number;
    @Input() width: number;
    @Input() height: number;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<VcsVcs>;
    prometheusTimer: any;
    grafanaOrgIdTimer: any;
    grafanaOrgIdRetry: number = 0;
    loginTokenTimer: any;
    panelUrl: string;
    grafanaOrgId: number = 1;
    grafanaOrgName: string;
    promData: VcsPromDataSource;

    displayedColumns = [
        'id',
        'description',
        'latency',
        'jitter',
        'throughput',
        'monitor'
    ];

    constructor(
        public opaService: OpenPolicyAgentService,
        private aetherService: AetherService,
        private basketService: BasketService,
        private httpClient: HttpClient,
        private oauthService: OAuthService,
        @Inject('grafana_api_proxy') private grafanaUrl: string,
    ) {
        super(new PanelVcsDatasource(aetherService, basketService, AETHER_TARGETS[0]));
        this.promData = new VcsPromDataSource(httpClient);
    }

    onDataLoaded(ScopeOfDataSource): void {
        ScopeOfDataSource.data.forEach((vcs: VcsVcs) => {
            // Add the tag on to VCS. the data is filled in below
            vcsPromTags.forEach((tag: string) => vcs[tag] = {});
        });
        console.log('VCS Data Loaded');
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
        // Wait for token to be loaded
        this.loginTokenTimer = setInterval(() => {
            if (this.oauthService.hasValidIdToken()) {
                console.log('Load items after token is loaded');
                this.dataSource.loadData(this.aetherService.getVcs({
                    target: AETHER_TARGETS[0]
                }), this.onDataLoaded);
                const claims = this.oauthService.getIdentityClaims() as IdTokClaims;
                // TODO: enhance this - it takes the last group, having all lower case as the Grafana Org.
                this.grafanaOrgName = claims.groups.find((g) => g === g.toLowerCase());
                this.panelUrl = this.vcsPanelUrl(this.grafanaOrgId, this.grafanaOrgName);
                clearInterval(this.loginTokenTimer);
            }
        }, 10);

        this.prometheusTimer = setInterval(() => this.promData.loadData(vcsPromTags).subscribe(
            (resultItem) => {
                // Tag these new attributes on to the data in the main data source
                // associate it with the right VCS
                if (this.dataSource.data.length === 0) {
                    clearInterval(this.prometheusTimer);
                    console.log('No VCS to monitor');
                    return;
                }
                this.dataSource.data.forEach((vcs) => {
                    if (vcs[resultItem.metric.__name__] === undefined) {
                        vcs[resultItem.metric.__name__] = {};
                    }
                    if (resultItem.metric.vcs_id === vcs.id) {
                        vcs[resultItem.metric.__name__][vcs.id] = resultItem.value[1];
                        // console.log('Wrote ', resultItem.metric.__name__, vcs.id, resultItem.value[1]);
                    }
                });
            },
            (err) => console.log('error polling ', err),
        ), 2000);
    }

    ngOnDestroy(): void {
        clearInterval(this.prometheusTimer);
        clearInterval(this.grafanaOrgIdTimer);
        clearInterval(this.loginTokenTimer);
    }

    vcsPanelUrl(orgId: number, orgName: string, vcsName?: string): string {
        if (vcsName === undefined) {
            return this.grafanaUrl + '/d-solo/vcs-' + orgName + '-all?orgId=' + orgId +
                '&theme=light&panelId=1';
        }
        return this.grafanaUrl + '/d-solo/vcs-' + vcsName + '?orgId=' + orgId +
            '&theme=light&panelId=1';
    }
}
