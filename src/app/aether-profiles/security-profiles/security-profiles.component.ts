/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {SecurityProfileSecurityProfile} from '../../../openapi3/aether/2.1.0/models';
import {Service as AetherService} from '../../../openapi3/aether/2.1.0/services';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SecurityProfilesDatasource} from './security-profiles-datasource';
import {AETHER_TARGETS} from '../../../environments/environment';
import {BasketService} from '../../basket.service';

@Component({
    selector: 'aether-security-profiles',
    templateUrl: './security-profiles.component.html',
    styleUrls: ['../../common-profiles.component.scss']
})
export class SecurityProfilesComponent implements AfterViewInit, OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<SecurityProfileSecurityProfile>;
    dataSource: SecurityProfilesDatasource;
    selectedUpProfile: SecurityProfileSecurityProfile;

    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    displayedColumns = [
        'id',
        'description',
        'key',
        'opc',
        'sqn',
        'edit',
        'delete'
    ];

    constructor(
        private aetherService: AetherService,
        private basketService: BasketService,
    ) {
    }

    ngOnInit(): void {
        this.dataSource = new SecurityProfilesDatasource(this.aetherService, this.basketService, AETHER_TARGETS[0]);
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
        this.dataSource.loadData(this.aetherService.getSecurityProfile({
            target: AETHER_TARGETS[0]
        }));
    }

    deleteSecurityProfileSecurityProfile(id: string): void {
        this.dataSource.delete(id);
    }
}
