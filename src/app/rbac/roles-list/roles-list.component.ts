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
import {RbacRole} from '../../../openapi3/rbac/1.0.0/models';
import {
    Service,
    ApiService,
} from '../../../openapi3/rbac/1.0.0/services';

@Component({
    selector: 'aether-roles-list',
    templateUrl: './roles-list.component.html',
    styleUrls: ['../../common-profiles.component.scss']
})
export class RolesListComponent implements AfterViewInit, OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<RbacRole>;
    dataSource: RoleDatasource;
    selectedRole: RbacRole;

    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    displayedColumns = [
        'roleid',
        'description',
        'operation',
        'type',
        'nouncount',
        'edit',
        'delete'
    ];

    constructor(
        private rbacV100TargetService: Service,
        private rbacApiService: ApiService,
        private snackBar: MatSnackBar,
    ) {
    }

    ngOnInit(): void {
        this.dataSource = new RoleDatasource(this.rbacV100TargetService, this.rbacApiService, RBAC_TARGET);
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
        this.dataSource.loadRoles(this.snackBar);
    }

    deleteRole(roleid: string): void {
        // TODO handle error
        this.dataSource.deleteRole(roleid, this.snackBar);
    }

    openSnackBar(message: string): void {
        this.snackBar.open(message, undefined, {
            duration: 1000,
        });
    }
}
