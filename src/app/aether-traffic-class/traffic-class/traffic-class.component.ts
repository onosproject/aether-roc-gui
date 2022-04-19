/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { RocListBase } from '../../roc-list-base';
import { TrafficClassDatasource } from './traffic-class-datasource';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { BasketService } from '../../basket.service';
import { OpenPolicyAgentService } from '../../open-policy-agent.service';
import { trafficClassModelPath } from '../../models-info';
import { EnterpriseService } from '../../enterprise.service';
import {
    ApplicationService,
    SiteService,
    TrafficClassService,
} from '../../../openapi3/aether/2.1.0/services';
import { TrafficClass } from '../../../openapi3/aether/2.1.0/models';

@Component({
    selector: 'aether-traffic-class',
    templateUrl: './traffic-class.component.html',
    styleUrls: ['../../common-profiles.component.scss'],
})
export class TrafficClassComponent
    extends RocListBase<TrafficClassDatasource, TrafficClass>
    implements AfterViewInit
{
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<TrafficClass>;

    displayedColumns = [
        'id',
        'description',
        'enterprise',
        'pelr',
        'pdb',
        'arp',
        'qci',
        'edit',
        'Usage/delete',
    ];

    modelPath = ['traffic-class-2.1.0', 'traffic-class', 'traffic-class-id'];

    constructor(
        protected enterpriseService: EnterpriseService,
        protected applicationService: ApplicationService,
        protected siteService: SiteService,
        private basketService: BasketService,
        public opaService: OpenPolicyAgentService,
        private trafficClassService: TrafficClassService
    ) {
        super(
            basketService,
            new TrafficClassDatasource(
                enterpriseService,
                applicationService,
                siteService,
                basketService
            )
        );
    }

    onDataLoaded(): void {
        this.dataSource.merge(
            this.bs.buildPatchBody().Updates,
            this.dataSource.data,
            trafficClassModelPath
        );
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
        this.enterpriseService.enterprises.forEach((enterpriseId) => {
            this.dataSource.loadData(
                this.trafficClassService.getTrafficClassList({
                    'enterprise-id': enterpriseId.name,
                }),
                this.onDataLoaded.bind(this),
                enterpriseId
            );
        });
    }
}
