/*
 * SPDX-FileCopyrightText: 2022-present Intel Corporation
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { SwitchPortService } from '../../../openapi3/sdn-fabric/0.1.0/services';
import { BasketService } from '../../basket.service';
import { OpenPolicyAgentService } from '../../open-policy-agent.service';
import { EnterpriseService as FabricService } from '../../enterprise.service';
import { RocListBase } from '../../roc-list-base';
import { PortDatasource } from './port.datasource';
import { SwitchPort } from '../../../openapi3/sdn-fabric/0.1.0/models';
import { ActivatedRoute } from '@angular/router';
import { TargetName } from '../../../openapi3/top/level/models/target-name';
import { switchPath } from '../../models-info';

@Component({
    selector: 'aether-port',
    templateUrl: './port.component.html',
    styleUrls: ['../../common-profiles.component.scss'],
})
export class PortComponent
    extends RocListBase<PortDatasource, SwitchPort>
    implements AfterViewInit, OnInit
{
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<SwitchPort>;

    public fabric: TargetName = { name: undefined };
    public switchId: string;

    displayedColumns = [
        'id',
        'description',
        'speed',
        'dhcp-connect-point',
        'vlans-untagged',
        'vlans-tagged',
        'observed-speed',
        'connected',
        'edit',
        'delete',
    ];

    constructor(
        private switchPortService: SwitchPortService,
        private basketService: BasketService,
        public opaService: OpenPolicyAgentService,
        protected fabricService: FabricService,
        protected route: ActivatedRoute
    ) {
        super(basketService, new PortDatasource(basketService, fabricService));
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe((value) => {
            this.fabric.name = value.get('fabric');
            this.switchId = value.get('switch');
            console.log('Params', this.fabric.name, this.switchId);
        });
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
        this.dataSource.loadData(
            this.switchPortService.getSwitchPortList({
                'fabric-id': this.fabric.name,
                'switch-id': this.switchId,
            }),
            this.onDataLoaded.bind(this),
            this.fabric
        );
    }

    onDataLoaded(): void {
        this.dataSource.merge(
            this.bs.buildPatchBody().Updates,
            this.dataSource.data,
            switchPath,
            []
        );
    }
}
