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
import { AETHER_TARGET } from '../../../environments/environment';
import { OpenPolicyAgentService } from '../../open-policy-agent.service';
import { Service as AetherService } from '../../../openapi3/aether/2.0.0/services';
import { BasketService } from '../../basket.service';
import { PanelSiteDatasource } from './panel-site-datasource';
import { SitePromDataSource } from '../../utils/site-prom-data-source';
import { HttpClient } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';
import { EnterprisesEnterpriseSite } from '../../../openapi3/aether/2.0.0/models';

const sitePromTags = [
    'agentsSum',
    'agentsCount',
    'clusterNodesSum',
    'clusterNodesCount',
];

@Component({
    selector: 'aether-panel-site',
    templateUrl: './panel-site.component.html',
    styleUrls: [
        '../../common-panel.component.scss',
        '../panel-dashboard.component.scss',
    ],
})
export class PanelSiteComponent
    extends RocListBase<PanelSiteDatasource>
    implements AfterViewInit, OnDestroy
{
    @Input() top: number;
    @Input() left: number;
    @Input() width: number;
    @Input() height: number;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<EnterprisesEnterpriseSite>;
    prometheusTimer: ReturnType<typeof setTimeout>;

    promData: SitePromDataSource;

    displayedColumns = ['id', 'description', 'agents', 'cluster', 'monitor'];

    constructor(
        public opaService: OpenPolicyAgentService,
        private aetherService: AetherService,
        private basketService: BasketService,
        private httpClient: HttpClient,
        private oauthService: OAuthService,
        @Inject('grafana_api_proxy') private grafanaUrl: string
    ) {
        super(
            basketService,
            new PanelSiteDatasource(
                aetherService,
                basketService,
                AETHER_TARGET
            ),
            'Enterprises-2.0.0',
            'site'
        );
        this.promData = new SitePromDataSource(httpClient);
    }

    onDataLoaded(): void {
        console.log('Site Data Loaded');
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;

        this.dataSource.loadData(
            this.aetherService.getEnterprises({
                target: AETHER_TARGET,
            }),
            this.onDataLoaded.bind(this)
        );

        this.prometheusTimer = setInterval(() => {
            if (this.dataSource.data.length === 0) {
                clearInterval(this.prometheusTimer);
                console.log('No Site to monitor');
                return;
            }

            this.dataSource.data.forEach((site) => {
                if (site.monitoring['edge-device'].length === 0) {
                    return;
                }

                sitePromTags.forEach((tag) => {
                    const url = this.promData.queryBuilder(tag, site);

                    this.promData.loadData(url).subscribe(
                        (resultItem) => {
                            site[tag] = resultItem.value[1];
                        },
                        (err) =>
                            console.log(
                                site['site-id'],
                                'has error polling metrics',
                                err
                            )
                    );
                });
            });
        }, 3000);
    }

    ngOnDestroy(): void {
        clearInterval(this.prometheusTimer);
    }
}
