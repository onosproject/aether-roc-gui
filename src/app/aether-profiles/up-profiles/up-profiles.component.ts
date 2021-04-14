/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {UpProfileUpProfile} from '../../../openapi3/aether/2.1.0/models';
import {Service as AetherService} from '../../../openapi3/aether/2.1.0/services';
import {AETHER_TARGETS} from '../../../environments/environment';
import {UpProfilesDatasource} from './up-profiles-datasource';
import {BasketService} from '../../basket.service';
import {OpenPolicyAgentService} from '../../open-policy-agent.service';
import {RocListBase} from '../../roc-list-base';

@Component({
    selector: 'aether-up-profiles',
    templateUrl: './up-profiles.component.html',
    styleUrls: ['../../common-profiles.component.scss']
})
export class UpProfilesComponent extends RocListBase<UpProfilesDatasource> implements AfterViewInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<UpProfileUpProfile>;

    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    displayedColumns = [
        'id',
        'description',
        'userplane',
        'accesscontrol',
        'edit',
        'delete'
    ];

    constructor(
        private aetherService: AetherService,
        private basketService: BasketService,
        public opaService: OpenPolicyAgentService,
    ) {
        super(new UpProfilesDatasource(aetherService, basketService, AETHER_TARGETS[0]));
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
        this.dataSource.loadData(this.aetherService.getUpProfile({
            target: AETHER_TARGETS[0]
        }));
    }
}
