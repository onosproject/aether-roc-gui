/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {Service as AetherService} from '../../../openapi3/aether/2.1.0/services';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router';
import {AETHER_TARGETS} from '../../../environments/environment';
import {ApnProfileApnProfile} from '../../../openapi3/aether/2.1.0/models';
import {ApnProfilesDatasource} from './apn-profiles-datasource';
import {BasketService} from '../../basket.service';

@Component({
    selector: 'aether-apn-profiles',
    templateUrl: './apn-profiles.component.html',
    styleUrls: ['../../common-profiles.component.scss']
})
export class ApnProfilesComponent implements AfterViewInit, OnInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<ApnProfileApnProfile>;
    dataSource: ApnProfilesDatasource;
    selectedApnProfile: ApnProfileApnProfile;

    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    displayedColumns = [
        'id',
        // 'name',
        'description',
        'apn-name',
        'dns-primary',
        'dns-secondary',
        'mtu',
        'gx-enabled',
        'edit',
        'delete'
    ];

    constructor(
        private aetherService: AetherService,
        private basketService: BasketService,
    ) {
    }

    ngOnInit(): void {
        this.dataSource = new ApnProfilesDatasource(this.aetherService, this.basketService, AETHER_TARGETS[0]);
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
        this.dataSource.loadData(this.aetherService.getApnProfile({
            target: AETHER_TARGETS[0]
        }));
    }

    deleteApnProfileApnProfile(id: string): void {
        this.dataSource.delete(id);
    }
}
