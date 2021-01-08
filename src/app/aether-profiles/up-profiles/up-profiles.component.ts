/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {UpProfileUpProfile as AetherV200TargetUpProfileUpProfile} from '../../../openapi3/aether/2.0.0/models/up-profile-up-profile';
import {Service as AetherV200TargetService} from '../../../openapi3/aether/2.0.0/services/service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router';
import {AETHER_TARGETS} from '../../../environments/environment';
import {UpProfilesDatasource} from './up-profiles-datasource';

@Component({
    selector: 'aether-up-profiles',
    templateUrl: './up-profiles.component.html',
    styleUrls: ['../../common-profiles.component.scss']
})
export class UpProfilesComponent implements AfterViewInit, OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<AetherV200TargetUpProfileUpProfile>;
    dataSource: UpProfilesDatasource;
    selectedUpProfile: AetherV200TargetUpProfileUpProfile;

    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    displayedColumns = [
        'id',
        // 'name',
        'description',
        'userplane',
        'accesscontrol',
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
        this.dataSource = new UpProfilesDatasource(this.aetherV200TargetService, AETHER_TARGETS);
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
        this.dataSource.loadUpProfileUpProfile();
    }

    openSnackBar(message: string, durationMs: number, action: string): void {
        this.snackBar.open(message, action, {
            duration: durationMs,
        });
    }

}
