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
import {ServicePolicyServicePolicy} from '../../../../openapi3/aether/2.1.0/models';
import {ServicePolicyDatasource} from './policy-datasource';
import {AETHER_TARGETS} from '../../../../environments/environment';
import {BasketService, TYPE} from '../../../basket.service';
import {OpenPolicyAgentService} from '../../../open-policy-agent.service';
import {RocListBase} from '../../../roc-list-base';
import {FormArray} from '@angular/forms';

@Component({
    selector: 'aether-policy',
    templateUrl: './policy.component.html',
    styleUrls: ['../../../common-profiles.component.scss']
})
export class PolicyComponent extends RocListBase<ServicePolicyDatasource> implements AfterViewInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<ServicePolicyServicePolicy>;
    displayedColumns = [
        'id',
        'name',
        'description',
        'uplink',
        'downlink',
        'qci',
        'arp',
        'rules',
        'edit',
        'delete'
    ];

    constructor(
        private aetherService: AetherService,
        private basketService: BasketService,
        public opaService: OpenPolicyAgentService,
    ) {
        super(new ServicePolicyDatasource(aetherService, basketService, AETHER_TARGETS[0]));
    }

    onDataLoaded(ScopeOfDataSource): void {
        const basketPreview = ScopeOfDataSource.bs.buildPatchBody().Updates;
        if ('service-policy-2.1.0' in basketPreview && 'service-policy' in basketPreview['service-policy-2.1.0']) {
            basketPreview['service-policy-2.1.0']['service-policy'].forEach((basketItems) => {
                ScopeOfDataSource.data.forEach((listItem, listItemCount) => {
                    if (basketItems.id === listItem.id) {
                        if (basketItems['display-name']) {
                            ScopeOfDataSource.data[listItemCount]['display-name'] = basketItems['display-name'];
                        }
                        if (basketItems.ambr && basketItems.ambr.uplink) {
                            ScopeOfDataSource.data[listItemCount].ambr.uplink = basketItems.ambr.uplink;
                        }
                        if (basketItems.ambr && basketItems.ambr.downlink) {
                            ScopeOfDataSource.data[listItemCount].ambr.downlink = basketItems.ambr.downlink;
                        }
                        if (basketItems.qci){
                            ScopeOfDataSource.data[listItemCount].qci = basketItems.qci;
                        }
                        if (basketItems.arp) {
                            ScopeOfDataSource.data[listItemCount].arp = basketItems.arp;
                        }
                        if (basketItems.description) {
                            ScopeOfDataSource.data[listItemCount].description = basketItems.description;
                        }
                        if (basketItems.rules){
                            if (ScopeOfDataSource.data[listItemCount].rules.length === 0) {
                                ScopeOfDataSource.data[listItemCount].rules = basketItems.rules;
                            } else {
                                for (const eachValueRule of basketItems.rules) {
                                    let eachFormRulePosition = 0;
                                    for (const eachRule of ScopeOfDataSource.data[listItemCount].rules){
                                        if (eachValueRule.rule === eachRule.rule){
                                            ScopeOfDataSource.data[listItemCount].rules[eachFormRulePosition].enabled
                                            = eachValueRule.enabled;
                                        }
                                        eachFormRulePosition++;
                                    }
                                }
                            }
                        }
                    }
                });
            });
        }
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
        this.dataSource.loadData(this.aetherService.getServicePolicy({
            target: AETHER_TARGETS[0]
        }), this.onDataLoaded);
    }
}
