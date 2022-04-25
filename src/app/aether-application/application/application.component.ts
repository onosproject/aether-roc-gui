/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import {
    ApplicationService,
    SiteService,
} from '../../../openapi3/aether/2.1.0/services';
import { BasketService } from '../../basket.service';
import { OpenPolicyAgentService } from '../../open-policy-agent.service';
import { RocListBase } from '../../roc-list-base';
import { ApplicationDatasource } from './application-datasource';
import { applicationModelPath } from '../../models-info';
import { EnterpriseService } from '../../enterprise.service';
import { Application } from '../../../openapi3/aether/2.1.0/models';

@Component({
    selector: 'aether-application',
    templateUrl: './application.component.html',
    styleUrls: ['../../common-profiles.component.scss'],
})
export class ApplicationComponent
    extends RocListBase<ApplicationDatasource, Application>
    implements AfterViewInit
{
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<Application>;
    displayedColumns = [
        'id',
        'description',
        'enterprise',
        'address',
        'Endpoint',
        'edit',
        'Usage/delete',
    ];

    constructor(
        private applicationsService: ApplicationService,
        protected siteService: SiteService,
        private basketService: BasketService,
        public opaService: OpenPolicyAgentService,
        protected enterpriseService: EnterpriseService
    ) {
        super(
            basketService,
            new ApplicationDatasource(
                basketService,
                enterpriseService,
                siteService
            )
        );
        super.reqdAttr = ['address'];
    }

    onDataLoaded(): void {
        this.dataSource.merge(
            this.bs.buildPatchBody().Updates,
            this.dataSource.data,
            applicationModelPath,
            [{ fieldName: 'endpoint', idAttr: 'endpoint-id' }]
        );
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;

        this.enterpriseService.enterprises.forEach((enterpriseId) => {
            this.dataSource.loadData(
                this.applicationsService.getApplicationList({
                    'enterprise-id': enterpriseId.name,
                }),
                this.onDataLoaded.bind(this),
                enterpriseId
            );
        });
    }
}
