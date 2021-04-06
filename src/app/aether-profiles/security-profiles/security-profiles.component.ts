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
import {ApiService, Service as AetherService} from '../../../openapi3/aether/2.1.0/services';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router';
import {SecurityProfilesDatasource} from './security-profiles-datasource';
import {AETHER_TARGETS} from '../../../environments/environment';

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
        // 'name',
        'description',
        'key',
        'opc',
        'sqn',
        'edit',
        'delete'
    ];

    constructor(
        private aetherService: AetherService,
        private apiService: ApiService,
        private snackBar: MatSnackBar,
        private activatedRoute: ActivatedRoute
    ) {
        this.activatedRoute.paramMap.subscribe(params => {
            const lc = params.get('lastChange');
            if (lc != null) {
                this.openSnackBar('Change saved as ' + lc, 2000, undefined);
                console.log('Got params', lc);
            }
        });
    }

    ngOnInit(): void {
        this.dataSource = new SecurityProfilesDatasource(this.aetherService, this.apiService, AETHER_TARGETS);
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
        this.dataSource.loadSecurityProfileSecurityProfile();
    }

    openSnackBar(message: string, durationMs: number, action: string): void {
        this.snackBar.open(message, action, {
            duration: durationMs,
        });
    }

    deleteSecurityProfileSecurityProfile(id: string): void {
        this.dataSource.deleteSecurityProfileSecurityProfile(id, this.snackBar);
    }
}
