/*
 * SPDX-FileCopyrightText: 2022-present Intel Corporation
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { RocListBase } from '../../roc-list-base';
import { RouteDatasource } from './route-datasource';
import { Route } from '../../../openapi3/sdn-fabric/0.1.0/models';
import { BasketService } from '../../basket.service';
import { OpenPolicyAgentService } from '../../open-policy-agent.service';
import { EnterpriseService as FabricService } from '../../enterprise.service';
import { RouteService } from '../../../openapi3/sdn-fabric/0.1.0/services';
import { routePath } from '../../models-info';

@Component({
    selector: 'aether-route',
    templateUrl: './route.component.html',
    styleUrls: ['../../common-profiles.component.scss'],
})
export class RouteComponent
    extends RocListBase<RouteDatasource, Route>
    implements AfterViewInit
{
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<Route>;
    displayedColumns = [
        'id',
        'description',
        'fabric',
        'address',
        'prefix',
        'metric',
        'edit',
        'delete',
    ];

    constructor(
        private routeService: RouteService,
        private basketService: BasketService,
        public opaService: OpenPolicyAgentService,
        protected fabricService: FabricService
    ) {
        super(basketService, new RouteDatasource(basketService, fabricService));
    }

    onDataLoaded(): void {
        this.dataSource.merge(
            this.bs.buildPatchBody().Updates,
            this.dataSource.data,
            routePath,
            []
        );
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;

        this.fabricService.enterprises.forEach((fabricId) => {
            this.dataSource.loadData(
                this.routeService.getRouteList({
                    'fabric-id': fabricId.name,
                }),
                this.onDataLoaded.bind(this),
                fabricId
            );
        });
    }
}
