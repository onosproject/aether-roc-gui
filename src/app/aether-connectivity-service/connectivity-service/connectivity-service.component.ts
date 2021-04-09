/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {ConnectivityServiceConnectivityService} from '../../../openapi3/aether/2.1.0/models';
import {Service as AetherService} from '../../../openapi3/aether/2.1.0/services';
import {ConnectivityServiceDatasource} from './connectivity-service-datasource';
import {AETHER_TARGETS} from '../../../environments/environment';
import {BasketService} from '../../basket.service';

@Component({
    selector: 'aether-connectivity-service',
    templateUrl: './connectivity-service.component.html',
    styleUrls: ['../../common-profiles.component.scss']
})
export class ConnectivityServiceComponent implements AfterViewInit, OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<ConnectivityServiceConnectivityService>;
    dataSource: ConnectivityServiceDatasource;
    seleectedConnectivityService: ConnectivityServiceConnectivityService;

    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    displayedColumns = [
        'id',
        // 'name',
        'description',
        'spgwc-endpoint',
        'hss-endpoint',
        'pcrf-endpoint',
        'edit',
        'delete'
    ];

    constructor(
        private aetherService: AetherService,
        private basketService: BasketService,
    ) {
    }

    ngOnInit(): void {
        this.dataSource = new ConnectivityServiceDatasource(this.aetherService, this.basketService, AETHER_TARGETS[0]);
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
        this.dataSource.loadData(this.aetherService.getConnectivityService({
            target: AETHER_TARGETS[0]
        }));
    }

    deleteConnectivityServiceConnectivityService(id: string): void {
        this.dataSource.delete(id);
    }
}
