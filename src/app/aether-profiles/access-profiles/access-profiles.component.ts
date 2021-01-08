/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {Service as AetherV200TargetService} from '../../../openapi3/aether/2.0.0/services/service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router';
import {AETHER_TARGETS} from '../../../environments/environment';
import {AccessProfileAccessProfile as AetherV200TargetAccessProfileAccessProfile} from '../../../openapi3/aether/2.0.0/models';
import {AccessProfilesDatasource} from './access-profiles-datasource';

@Component({
    selector: 'aether-access-profiles',
    templateUrl: './access-profiles.component.html',
    styleUrls: ['../../common-profiles.component.scss']
})
export class AccessProfilesComponent implements AfterViewInit, OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<AetherV200TargetAccessProfileAccessProfile>;
    dataSource: AccessProfilesDatasource;
    selectedAccessProfile: AetherV200TargetAccessProfileAccessProfile;

    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    displayedColumns = [
        'id',
        // 'name',
        'description',
        'type',
        'filter',
        'edit',
        'delete'
    ];

    constructor(
        private aetherV200TargetService: AetherV200TargetService,
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
        this.dataSource = new AccessProfilesDatasource(this.aetherV200TargetService, AETHER_TARGETS);
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
        this.dataSource.loadAccessProfileAccessProfile();
    }

    openSnackBar(message: string, durationMs: number, action: string): void {
        this.snackBar.open(message, action, {
            duration: durationMs,
        });
    }


}
