/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import {AfterViewInit, Component, ViewChild} from '@angular/core'
import {OpenPolicyAgentService} from 'src/app/open-policy-agent.service'
import {MatPaginator} from '@angular/material/paginator'
import {MatSort} from '@angular/material/sort'
import {MatTable} from '@angular/material/table'
import {Service as AetherService} from '../../../openapi3/aether/4.0.0/services'
import {AETHER_TARGETS} from '../../../environments/environment'
import {BasketService} from '../../basket.service'
import {RocListBase} from '../../roc-list-base'
import {TemplateDatasource} from './template-datasource'
import {TemplateTemplate} from '../../../openapi3/aether/4.0.0/models'
import {HexPipe} from '../../utils/hex.pipe'


@Component({
    selector: 'aether-template',
    templateUrl: './template.component.html',
    styleUrls: ['../../common-profiles.component.scss']
})
export class TemplateComponent extends RocListBase<TemplateDatasource> implements AfterViewInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<TemplateTemplate>;
    sdAsInt = HexPipe.hexAsInt;

    displayedColumns = [
        'id',
        'description',
        'sd',
        'sst',
        'default-behavior',
        'slice',
        'edit',
        'delete'
    ];

    constructor(
        public opaService: OpenPolicyAgentService,
        private aetherService: AetherService,
        private basketService: BasketService,
    ) {
        super(basketService, new TemplateDatasource(aetherService, basketService, AETHER_TARGETS[0]),
            'template-4.0.0', 'template')
        super.reqdAttr = ['default-behavior']
    }

    onDataLoaded(ScopeOfDataSource: TemplateDatasource): void {
        const basketPreview = ScopeOfDataSource.bs.buildPatchBody().Updates
        if ('Template-4.0.0' in basketPreview && 'template' in basketPreview['Template-4.0.0']) {
            basketPreview['Template-4.0.0'].template.forEach((basketItems) => {
                ScopeOfDataSource.data.forEach((listItem, listItemCount) => {
                    if (basketItems.id === listItem.id) {
                        if (basketItems['display-name']) {
                            ScopeOfDataSource.data[listItemCount]['display-name'] = basketItems['display-name']
                        }
                        if (basketItems.description) {
                            ScopeOfDataSource.data[listItemCount].description = basketItems.description
                        }
                        if (basketItems.sd) {
                            ScopeOfDataSource.data[listItemCount].sd = basketItems.sd
                        }
                        if (basketItems.sst) {
                            ScopeOfDataSource.data[listItemCount].sst = basketItems.sst
                        }
                        if (basketItems['default-behavior']) {
                            ScopeOfDataSource.data[listItemCount]['default-behavior'] = basketItems['default-behavior']
                        }
                        if (basketItems.device && basketItems.device.mbr) {
                            ScopeOfDataSource.data[listItemCount].device.mbr.uplink = basketItems.device.mbr.uplink
                            ScopeOfDataSource.data[listItemCount].device.mbr.downlink = basketItems.device.mbr.downlink
                        }
                        if (basketItems.slice && basketItems.slice.mbr) {
                            ScopeOfDataSource.data[listItemCount].slice.mbr.uplink = basketItems.slice.mbr.uplink
                            ScopeOfDataSource.data[listItemCount].slice.mbr.downlink = basketItems.slice.mbr.downlink
                        }
                    }
                })
            })
        }
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
        this.table.dataSource = this.dataSource
        this.dataSource.loadData(this.aetherService.getTemplate({
            target: AETHER_TARGETS[0]
        }), this.onDataLoaded)
    }

}
