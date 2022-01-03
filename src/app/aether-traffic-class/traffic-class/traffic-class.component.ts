/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { RocListBase } from '../../roc-list-base';
import { TrafficClassDatasource } from './traffic-class-datasource';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TrafficClassTrafficClass } from '../../../openapi3/aether/4.0.0/models';
import { Service as AetherService } from '../../../openapi3/aether/4.0.0/services';
import { BasketService } from '../../basket.service';
import { OpenPolicyAgentService } from '../../open-policy-agent.service';
import { AETHER_TARGETS } from '../../../environments/environment';
import * as _ from 'lodash';

@Component({
    selector: 'aether-traffic-class',
    templateUrl: './traffic-class.component.html',
    styleUrls: ['../../common-profiles.component.scss'],
})
export class TrafficClassComponent
    extends RocListBase<TrafficClassDatasource>
    implements AfterViewInit
{
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<TrafficClassTrafficClass>;

    displayedColumns = [
        'id',
        'description',
        'pelr',
        'pdb',
        'arp',
        'qci',
        'edit',
        'Usage/delete',
    ];

    constructor(
        private aetherService: AetherService,
        private basketService: BasketService,
        public opaService: OpenPolicyAgentService
    ) {
        super(
            basketService,
            new TrafficClassDatasource(
                aetherService,
                basketService,
                AETHER_TARGETS[0]
            ),
            'Traffic-class-4.0.0',
            'traffic-class'
        );
    }

    onDataLoaded(ScopeOfDataSource: TrafficClassDatasource): void {
        const basketPreview = ScopeOfDataSource.bs.buildPatchBody().Updates;
        this.usageArray = [];
        this.aetherService
            .getDeviceGroup({
                target: AETHER_TARGETS[0],
            })
            .subscribe((displayData) => {
                this.usageArray = this.usageArray.concat(
                    _.differenceWith(
                        ScopeOfDataSource.data,
                        displayData['device-group'],
                        function (ScopeOfDataSourceObject, displayDataObject) {
                            return (
                                ScopeOfDataSourceObject.id ===
                                displayDataObject.device['traffic-class']
                            );
                        }
                    )
                );
            });
        this.aetherService
            .getApplication({
                target: AETHER_TARGETS[0],
            })
            .subscribe((displayData) => {
                this.usageArray = this.usageArray.concat(
                    _.differenceWith(
                        this.usageArray,
                        displayData.application,
                        function (ScopeOfDataSourceObject, displayDataObject) {
                            return (
                                ScopeOfDataSourceObject.id ===
                                displayDataObject['traffic-class']
                            );
                        }
                    )
                );
            });
        if (
            this.pathRoot in basketPreview &&
            'traffic-class' in basketPreview[this.pathRoot]
        ) {
            ScopeOfDataSource.merge(
                basketPreview['Traffic-class-4.0.0']['traffic-class']
            );
        }
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
        this.dataSource.loadData(
            this.aetherService.getTrafficClass({
                target: AETHER_TARGETS[0],
            }),
            this.onDataLoaded.bind(this)
        );
    }
}
