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
import {Observable} from "rxjs";

@Component({
    selector: 'aether-rule',
    templateUrl: './rule.component.html',
    styleUrls: ['../../../common-profiles.component.scss']
})
export class RuleComponent extends RocListBase<ServiceRuleDatasource> implements AfterViewInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<ServiceRuleServiceRule>;
    pathRoot = 'service-rule-2.1.0';
    pathListAttr = 'service-rule';
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
        const thisComponent = this;
    }

    onDataLoaded(ScopeOfDataSource):void{
        const basketPreview = ScopeOfDataSource.bs.buildPatchBody().Updates;
        if ('service-rule-2.1.0' in basketPreview && 'service-rule' in basketPreview['service-rule-2.1.0']) {
            basketPreview['service-rule-2.1.0']['service-rule'].forEach((basketItems) => {
                ScopeOfDataSource.data.forEach((listItem, listItemCount)=>{
                    if (basketItems.id === listItem.id) {
                        if(basketItems['display-name']) {
                            ScopeOfDataSource.data[listItemCount]['display-name'] = basketItems['display-name'];
                        }
                        if(basketItems.qos && basketItems.qos[ 'guaranteed-bitrate'] && basketItems.qos[ 'guaranteed-bitrate'][ 'downlink']) {
                            ScopeOfDataSource.data[listItemCount].qos['guaranteed-bitrate']['downlink'] = basketItems.qos['guaranteed-bitrate']['downlink'];
                        }
                        if(basketItems.qos && basketItems.qos[ 'guaranteed-bitrate'] && basketItems.qos[ 'guaranteed-bitrate'].uplink) {
                            ScopeOfDataSource.data[listItemCount].qos['guaranteed-bitrate'].uplink = basketItems.qos['guaranteed-bitrate'].uplink;
                        }
                        if(basketItems.qos && basketItems.qos['aggregate-maximum-bitrate'] && basketItems.qos['aggregate-maximum-bitrate'].downlink) {
                            ScopeOfDataSource.data[listItemCount].qos['aggregate-maximum-bitrate'].downlink = basketItems.qos['aggregate-maximum-bitrate'].downlink;
                        }
                        if(basketItems.qos && basketItems.qos['aggregate-maximum-bitrate'] && basketItems.qos['aggregate-maximum-bitrate'].uplink) {
                            ScopeOfDataSource.data[listItemCount].qos['aggregate-maximum-bitrate'].uplink = basketItems.qos['aggregate-maximum-bitrate'].uplink;
                        }
                        if(basketItems.qos && basketItems.qos['maximum-requested-bandwidth'] && basketItems.qos['maximum-requested-bandwidth'].downlink) {
                            ScopeOfDataSource.data[listItemCount].qos['maximum-requested-bandwidth'].downlink = basketItems.qos['maximum-requested-bandwidth'].downlink;
                        }
                        if(basketItems.qos && basketItems.qos['maximum-requested-bandwidth'] && basketItems.qos['maximum-requested-bandwidth'].uplink) {
                            ScopeOfDataSource.data[listItemCount].qos['maximum-requested-bandwidth'].uplink = basketItems.qos['maximum-requested-bandwidth'].uplink;
                        }
                        if(basketItems.qos && basketItems.qos.arp && basketItems.qos.arp.priority ) {
                            ScopeOfDataSource.data[listItemCount].qos.arp.priority = basketItems.qos.arp.priority;
                        }
                        if(basketItems.qos && basketItems.qos.arp && 'preemption-capability' in basketItems.qos.arp ) {
                            ScopeOfDataSource.data[listItemCount].qos.arp['preemption-capability'] = basketItems.qos.arp['preemption-capability'];
                        }
                        if(basketItems.qos && basketItems.qos.arp && 'preemption-vulnerability' in basketItems.qos.arp) {
                            ScopeOfDataSource.data[listItemCount].qos.arp['preemption-vulnerability'] = basketItems.qos.arp['preemption-vulnerability'];
                        }
                        if(basketItems.qos && basketItems.qos.qci ) {
                            ScopeOfDataSource.data[listItemCount].qos.qci = basketItems.qos.qci;
                        }
                        if(basketItems.flow && basketItems.flow.specification ) {
                            ScopeOfDataSource.data[listItemCount].flow.specification = basketItems.flow.specification;
                        }
                        if(basketItems.description ) {
                            ScopeOfDataSource.data[listItemCount].description = basketItems.description;
                        }
                        if(basketItems['charging-rule-name'] ) {
                            ScopeOfDataSource.data[listItemCount]['charging-rule-name'] = basketItems['charging-rule-name'];
                        }
                    }
                })
            });
        }
    }

ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
        this.dataSource.loadData(this.aetherService.getServiceRule({
            target: AETHER_TARGETS[0]
        }),this.onDataLoaded);
        console.log(this.dataSource.data,"this.dataSource.data.length")
    }
}
