/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import {
    AfterViewInit,
    Component,
    Inject,
    Input,
    OnDestroy,
    ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { RocListBase } from '../../roc-list-base';
import { PERFORMANCE_METRICS_ENABLED } from '../../../environments/environment';
import { OpenPolicyAgentService } from '../../open-policy-agent.service';
import { BasketService } from '../../basket.service';
import { PanelSliceDatasource } from './panel-slice-datasource';
import { VcsPromDataSource } from '../../utils/vcs-prom-data-source';
import { HttpClient } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';
import { IdTokClaims } from '../../idtoken';
import { RocDataSource } from '../../roc-data-source';
import { EnterpriseService } from '../../enterprise.service';
import { SiteList, SiteSlice } from '../../../openapi3/aether/2.1.0/models';
import { SiteService } from '../../../openapi3/aether/2.1.0/services';

const vcsPromTags = ['vcs_active', 'vcs_inactive', 'vcs_idle'];

@Component({
    selector: 'aether-panel-vcs',
    templateUrl: './panel-slice.component.html',
    styleUrls: [
        '../../common-panel.component.scss',
        '../panel-dashboard.component.scss',
    ],
})
export class PanelSliceComponent
    extends RocListBase<PanelSliceDatasource, SiteSlice>
    implements AfterViewInit, OnDestroy
{
    @Input() top: number;
    @Input() left: number;
    @Input() width: number;
    @Input() height: number;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<SiteSlice>;
    loginTokenTimer;
    panelUrl: string;
    grafanaOrgId = 1;
    grafanaOrgName: string;
    promData: VcsPromDataSource;

    performanceMetricsEnabled: boolean = PERFORMANCE_METRICS_ENABLED;

    displayedColumns = [
        'id',
        'description',
        'active',
        'inactive',
        'idle',
        'monitor',
    ];

    constructor(
        public opaService: OpenPolicyAgentService,
        private siteService: SiteService,
        private basketService: BasketService,
        private httpClient: HttpClient,
        private oauthService: OAuthService,
        protected enterpriseService: EnterpriseService,
        @Inject('grafana_api_proxy') private grafanaUrl: string
    ) {
        super(
            basketService,
            new PanelSliceDatasource(enterpriseService, basketService)
        );
        super.reqdAttr = ['sd', 'traffic-class', 'sst', 'enterprise'];
        this.promData = new VcsPromDataSource(httpClient);
    }

    onDataLoaded(ScopeOfDataSource: RocDataSource<SiteSlice, SiteList>): void {
        ScopeOfDataSource.data.forEach((vcs: SiteSlice) => {
            // Add the tag on to Slice. the data is filled in below
            vcsPromTags.forEach((tag: string) => (vcs[tag] = {}));
        });
        console.log('Slice Data Loaded');
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;

        this.loginTokenTimer = setInterval(() => {
            if (this.oauthService.hasValidIdToken()) {
                const claims =
                    this.oauthService.getIdentityClaims() as IdTokClaims;
                // TODO: enhance this - it takes the last group, having all lower case as the Grafana Org.
                this.grafanaOrgName = claims.groups.find(
                    (g) => g === g.toLowerCase()
                );
                this.panelUrl = this.vcsPanelUrl(
                    this.grafanaOrgId,
                    this.grafanaOrgName
                );

                this.enterpriseService.enterprises.forEach((enterpriseId) => {
                    this.dataSource.loadData(
                        this.siteService.getSiteList({
                            'enterprise-id': enterpriseId.name,
                        }),
                        this.onDataLoaded.bind(this),
                        enterpriseId
                    );
                });

                clearInterval(this.loginTokenTimer);
            } else {
                this.enterpriseService.enterprises.forEach((enterpriseId) => {
                    this.dataSource.loadData(
                        this.siteService.getSiteList({
                            'enterprise-id': enterpriseId.name,
                        }),
                        this.onDataLoaded.bind(this),
                        enterpriseId
                    );
                });
            }
            clearInterval(this.loginTokenTimer);
        }, 1000);
    }

    ngOnDestroy(): void {
        clearInterval(this.loginTokenTimer);
    }

    vcsPanelUrl(orgId: number, orgName: string, vcsName?: string): string {
        if (vcsName === undefined) {
            return (
                this.grafanaUrl +
                '/d-solo/slice-' +
                orgName +
                '-all?orgId=' +
                orgId +
                '&theme=light&panelId=1'
            );
        }
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
