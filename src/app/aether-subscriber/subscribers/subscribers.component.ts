/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {
    AfterViewInit,
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {SubscriberUeDataSource} from './subscriber-ue-datasource';
import {SubscriberUe} from '../../../openapi3/aether/2.1.0/models';
import {Service as AetherService} from '../../../openapi3/aether/2.1.0/services';
import {AETHER_TARGETS} from '../../../environments/environment';
import {BasketService} from '../../basket.service';
import {OpenPolicyAgentService} from '../../open-policy-agent.service';
import {RocListBase} from '../../roc-list-base';
import {Router, RouterEvent, NavigationEnd} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
    selector: 'aether-subscribers',
    templateUrl: './subscribers.component.html',
    styleUrls: ['../../common-profiles.component.scss', './subscribers.component.scss']
})
export class SubscribersComponent extends RocListBase<SubscriberUeDataSource> implements OnInit, AfterViewInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<SubscriberUe>;

    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    displayedColumns = [
        'id',
        'enterprise',
        'imsi',
        'priority',
        'enabled',
        'serving-plmn',
        'profiles',
        'edit',
        'delete'
    ];

    constructor(
        private aetherService: AetherService,
        private basketService: BasketService,
        public opaService: OpenPolicyAgentService,
        private router: Router
    ) {
        super(new SubscriberUeDataSource(aetherService, basketService, AETHER_TARGETS[0]));
    }

    ngOnInit(): void {
        // This is so we can navigate to same URL
        this.router.events.pipe(
            filter((event: RouterEvent) => event instanceof NavigationEnd)
        ).subscribe(() => {
            this.ngAfterViewInit();
        });
    }

    onDataLoaded(ScopeOfDataSource):void{
        const basketPreview = ScopeOfDataSource.bs.buildPatchBody().Updates;
        if ('subscriber-2.1.0' in basketPreview && 'ue' in basketPreview['subscriber-2.1.0']) {
            basketPreview['subscriber-2.1.0']['ue'].forEach((basketItems) => {
                ScopeOfDataSource.data.forEach((listItem, listItemCount)=>{
                    if (basketItems.id === listItem.id) {
                        if(basketItems.priority) {
                            ScopeOfDataSource.data[listItemCount].priority = basketItems.priority;
                        }
                        if (basketItems['serving-plmn'] && basketItems['serving-plmn'].mcc) {
                            ScopeOfDataSource.data[listItemCount]['serving-plmn'].mcc = basketItems['serving-plmn'].mcc;
                        }
                        if (basketItems['serving-plmn'] && basketItems['serving-plmn'].mnc) {
                            ScopeOfDataSource.data[listItemCount]['serving-plmn'].mnc = basketItems['serving-plmn'].mnc;
                        }
                        if (basketItems['serving-plmn'] && basketItems['serving-plmn'].tac) {
                            ScopeOfDataSource.data[listItemCount]['serving-plmn'].tac = basketItems['serving-plmn'].tac;
                        }
                        if (basketItems.profiles && basketItems.profiles['apn-profile']) {
                            ScopeOfDataSource.data[listItemCount].profiles['apn-profile'] = basketItems.profiles['apn-profile'];
                        }
                        if (basketItems.profiles && basketItems.profiles['qos-profile']) {
                            ScopeOfDataSource.data[listItemCount].profiles['qos-profile'] = basketItems.profiles['qos-profile'];
                        }
                        if (basketItems.profiles && basketItems.profiles['up-profile']) {
                            ScopeOfDataSource.data[listItemCount].profiles['up-profile'] = basketItems.profiles['up-profile'];
                        }
                        if (basketItems.profiles && basketItems.profiles['security-profile']) {
                            ScopeOfDataSource.data[listItemCount].profiles['security-profile'] = basketItems.profiles['security-profile'];
                        }
                        if ('enabled' in basketItems){
                            ScopeOfDataSource.data[listItemCount].enabled = basketItems.enabled;
                        }
                        if (basketItems['imsi-range-from']){
                            ScopeOfDataSource.data[listItemCount]['imsi-range-from'] = basketItems['imsi-range-from'];
                        }
                        if (basketItems['imsi-range-to']){
                            ScopeOfDataSource.data[listItemCount]['imsi-range-to'] = basketItems['imsi-range-to'];
                        }
                        if (basketItems['imsi-wildcard']){
                            ScopeOfDataSource.data[listItemCount]['imsi-wildcard'] = basketItems['imsi-wildcard'];
                        }
                        if (basketItems['requested-apn']){
                            ScopeOfDataSource.data[listItemCount]['requested-apn'] = basketItems['requested-apn'];
                        }
                        if (basketItems.enterprise){
                            ScopeOfDataSource.data[listItemCount].enterprise = basketItems.enterprise;
                        }
                        if (basketItems.rules){
                            if (ScopeOfDataSource.data[listItemCount].rules.length === 0) {
                                ScopeOfDataSource.data[listItemCount].rules = basketItems.rules;
                            } else {
                                for (const eachValueRule of basketItems.rules) {
                                    let eachFormRulePosition = 0;
                                    for (const eachRule of ScopeOfDataSource.data[listItemCount].rules){
                                        if (eachValueRule.rule === eachRule.rule){
                                            ScopeOfDataSource.data[listItemCount].rules[eachFormRulePosition].enabled = eachValueRule.enabled;
                                        }
                                        eachFormRulePosition++;
                                    }
                                }
                            }
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
        this.dataSource.loadData(this.aetherService.getSubscriber({
            target: AETHER_TARGETS[0]
        }),this.onDataLoaded);
    }
}
