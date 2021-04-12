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
import {AETHER_TARGETS} from '../../../environments/environment';
import {AccessProfileAccessProfile} from '../../../openapi3/aether/2.1.0/models';
import {AccessProfilesDatasource} from './access-profiles-datasource';
import {BasketService} from '../../basket.service';

@Component({
    selector: 'aether-access-profiles',
    templateUrl: './access-profiles.component.html',
    styleUrls: ['../../common-profiles.component.scss']
})
export class AccessProfilesComponent implements AfterViewInit, OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<AccessProfileAccessProfile>;
    dataSource: AccessProfilesDatasource;
    selectedAccessProfile: AccessProfileAccessProfile;

    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    displayedColumns = [
        'id',
        'description',
        'type',
        'filter',
        'edit',
        'delete'
    ];

    constructor(
        private aetherService: AetherService,
        private basketService: BasketService,
    ) {
    }

    ngOnInit(): void {
        this.dataSource = new AccessProfilesDatasource(this.aetherService, this.basketService, AETHER_TARGETS[0]);
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
        this.dataSource.loadData(this.aetherService.getAccessProfile({
            target: AETHER_TARGETS[0]
        }));
    }

    deleteAccessProfileAccessProfile(id: string): void {
        this.dataSource.delete(id);
    }
}
