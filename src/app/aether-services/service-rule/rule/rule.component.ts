/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {Service as AetherService} from '../../../../openapi3/aether/2.1.0/services';
import {ServiceRuleServiceRule} from '../../../../openapi3/aether/2.1.0/models';
import {ServiceRuleDatasource} from './rule-datasource';
import {AETHER_TARGETS} from '../../../../environments/environment';
import {BasketService} from '../../../basket.service';

@Component({
    selector: 'aether-rule',
    templateUrl: './rule.component.html',
    styleUrls: ['../../../common-profiles.component.scss']
})
export class RuleComponent implements AfterViewInit, OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<ServiceRuleServiceRule>;
    dataSource: ServiceRuleDatasource;
    selectedServiceRule: ServiceRuleServiceRule;
    displayedColumns = [
        'id',
        'name',
        'description',
        'qci',
        'uplink',
        'downlink',
        'priority',
        'capability',
        'vulnerability',
        'edit',
        'delete'
    ];

    constructor(
        private aetherService: AetherService,
        private basketService: BasketService,
    ) {
    }

    ngOnInit(): void {
        this.dataSource = new ServiceRuleDatasource(this.aetherService, this.basketService, AETHER_TARGETS[0]);
        console.log(this.dataSource);
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
        this.dataSource.loadData(this.aetherService.getServiceRule({
            target: AETHER_TARGETS[0]
        }));
        console.log(this.dataSource);
    }
}
