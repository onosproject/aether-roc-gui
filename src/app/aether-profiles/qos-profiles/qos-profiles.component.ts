/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {AetherV100TargetService} from '../../../openapi3/aether/1.0.0/services/aether-v-100-target.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router';
import {AETHER_TARGETS} from '../../../environments/environment';
import {AetherV100TargetQosProfileQosProfile} from '../../../openapi3/aether/1.0.0/models';
import {QosProfilesDatasource} from './qos-profiles-datasource';

@Component({
    selector: 'aether-qos-profiles',
    templateUrl: './qos-profiles.component.html',
    styleUrls: ['../common-profiles.component.scss']
})
export class QosProfilesComponent implements AfterViewInit, OnInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<AetherV100TargetQosProfileQosProfile>;
    dataSource: QosProfilesDatasource;
    selectedUpProfile: AetherV100TargetQosProfileQosProfile;

    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    displayedColumns = [
        'id',
        'description',
        'uplink',
        'downlink',
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
        this.dataSource = new QosProfilesDatasource(this.aetherV100TargetService, AETHER_TARGETS);
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
        this.dataSource.loadQosProfileQosProfile();
    }

    openSnackBar(message: string, durationMs: number, action: string): void {
        this.snackBar.open(message, action, {
            duration: durationMs,
        });
    }
}
