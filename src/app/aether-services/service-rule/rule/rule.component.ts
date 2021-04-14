/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {Service as AetherService} from '../../../../openapi3/aether/2.1.0/services';
import {ServiceRuleServiceRule} from '../../../../openapi3/aether/2.1.0/models';
import {ServiceRuleDatasource} from './rule-datasource';
import {AETHER_TARGETS} from '../../../../environments/environment';
import {BasketService} from '../../../basket.service';
import {OpenPolicyAgentService} from '../../../open-policy-agent.service';
import {RocListBase} from '../../../roc-list-base';

@Component({
    selector: 'aether-rule',
    templateUrl: './rule.component.html',
    styleUrls: ['../../../common-profiles.component.scss']
})
export class RuleComponent extends RocListBase<ServiceRuleDatasource> implements AfterViewInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<ServiceRuleServiceRule>;
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
        public opaService: OpenPolicyAgentService,
    ) {
        super(new ServiceRuleDatasource(aetherService, basketService, AETHER_TARGETS[0]));
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
