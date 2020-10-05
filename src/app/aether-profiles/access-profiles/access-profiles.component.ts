/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {UpProfilesDatasource} from '../up-profiles/up-profiles-datasource';
import {AetherV100TargetService} from '../../../openapi3/aether/1.0.0/services/aether-v-100-target.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router';
import {AETHER_TARGETS} from '../../../environments/environment';
import {AetherV100TargetAccessProfileAccessProfile} from '../../../openapi3/aether/1.0.0/models';
import {AccessProfilesDatasource} from './access-profiles-datasource';

@Component({
    selector: 'aether-access-profiles',
    templateUrl: './access-profiles.component.html',
    styleUrls: ['../common-profiles.component.scss']
})
export class AccessProfilesComponent implements AfterViewInit, OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<AetherV100TargetAccessProfileAccessProfile>;
    dataSource: AccessProfilesDatasource;
    selectedAccessProfile: AetherV100TargetAccessProfileAccessProfile;

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
        private aetherV100TargetService: AetherV100TargetService,
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
        this.dataSource = new AccessProfilesDatasource(this.aetherV100TargetService, AETHER_TARGETS);
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
