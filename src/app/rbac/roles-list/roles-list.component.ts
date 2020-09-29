/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {MatSnackBar} from '@angular/material/snack-bar';
import {RBAC_TARGET} from '../../../environments/environment';
import {RoleDatasource} from './role-datasource';
import {RbacV100TargetRbacRole} from '../../../openapi3/rbac/1.0.0/models/rbac-v-100-target-rbac-role';
import {RbacV100TargetService} from '../../../openapi3/rbac/1.0.0/services';

@Component({
    selector: 'aether-roles-list',
    templateUrl: './roles-list.component.html',
    styleUrls: ['./roles-list.component.scss']
})
export class RolesListComponent implements AfterViewInit, OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<RbacV100TargetRbacRole>;
    dataSource: RoleDatasource;
    selectedRole: RbacV100TargetRbacRole;

    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    displayedColumns = [
        'roleid',
        'description',
        'operation',
        'type',
        'nouncount',
    ];

    constructor(
        private rbacV100TargetService: RbacV100TargetService,
        private snackBar: MatSnackBar,
    ) {
    }

    ngOnInit(): void {
        this.dataSource = new RoleDatasource(this.rbacV100TargetService, RBAC_TARGET);
        this.openSnackBar('Loading data from ' + RBAC_TARGET);
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
        this.dataSource.loadRoles();
    }

    openSnackBar(message: string): void {
        this.snackBar.open(message, undefined, {
            duration: 1000,
        });
    }

}
