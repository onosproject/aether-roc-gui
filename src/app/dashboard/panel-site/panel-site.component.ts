/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {AfterViewInit, Component, Inject, Input, OnDestroy, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {SiteSite} from '../../../openapi3/aether/3.0.0/models';
import {RocListBase} from '../../roc-list-base';
import {AETHER_TARGETS} from '../../../environments/environment';
import {OpenPolicyAgentService} from '../../open-policy-agent.service';
import {Service as AetherService} from '../../../openapi3/aether/3.0.0/services/service';
import {BasketService} from '../../basket.service';
import {PanelSiteDatasource} from './panel-site-datasource';
import {SitePromDataSource} from '../../utils/site-prom-data-source';
import {HttpClient} from '@angular/common/http';
import {OAuthService} from 'angular-oauth2-oidc';
import {IdTokClaims} from '../../idtoken';

const sitePromTags = [
    'aetheredge_e2e_tests_ok',
    'aetheredge_in_maintenance_window'
];

@Component({
    selector: 'aether-panel-site',
    templateUrl: './panel-site.component.html',
    styleUrls: ['../../common-panel.component.scss']
})
export class PanelSiteComponent extends RocListBase<PanelSiteDatasource> implements AfterViewInit, OnDestroy {
    @Input() top: number;
    @Input() left: number;
    @Input() width: number;
    @Input() height: number;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<SiteSite>;
    prometheusTimer: any;

    loginTokenTimer: any;
    promData: SitePromDataSource;

    displayedColumns = [
        'id',
        'description',
        'health',
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
        super(basketService, new PanelSiteDatasource(aetherService, basketService, AETHER_TARGETS[0]),
            'site-v3.0.0', 'site');
        this.promData = new SitePromDataSource(httpClient);
    }

    onDataLoaded(ScopeOfDataSource): void {
        ScopeOfDataSource.data.forEach((site: SiteSite) => {
            // Add the tag on to Site. the data is filled in below
            sitePromTags.forEach((tag: string) => site[tag] = {});
        });
        console.log('Site Data Loaded');
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
        // Wait for token to be loaded
        this.loginTokenTimer = setInterval(() => {
            if (this.oauthService.hasValidIdToken()) {
                console.log('Load items after token is loaded');
                this.dataSource.loadData(this.aetherService.getSite({
                    target: AETHER_TARGETS[0]
                }), this.onDataLoaded);
                const claims = this.oauthService.getIdentityClaims() as IdTokClaims;
                // TODO: enhance this - it takes the last group, having all lower case as the Grafana Org.
                clearInterval(this.loginTokenTimer);
            }
        }, 10);

        this.prometheusTimer = setInterval(() => this.promData.loadData(sitePromTags).subscribe(
            (resultItem) => {
                // Tag these new attributes on to the data in the main data source
                // associate it with the right Site
                if (this.dataSource.data.length === 0) {
                    clearInterval(this.prometheusTimer);
                    console.log('No Site to monitor');
                    return;
                }
                this.dataSource.data.forEach((site) => {
                    // Site object will have list of Monitoring agent (name, display-name, description)
                    if(resultItem.metric.name.includes(site.id)) {
                        if (resultItem.metric.__name__ === 'aetheredge_e2e_tests_ok') {
                            site['health'] = resultItem.value[1] > 0 ? "Online" : "Offline";
                        }
                        if (resultItem.metric.__name__ === 'aetheredge_in_maintenance_window') {
                            site['health'] = resultItem.value[1] > 0 ? "In Maintenance" : site['health'];
                        }
                    }
                });
            },
            (err) => console.log('error polling ', err),
        ), 2000);
    }

    ngOnDestroy(): void {
        clearInterval(this.prometheusTimer);
        clearInterval(this.loginTokenTimer);
    }
}
