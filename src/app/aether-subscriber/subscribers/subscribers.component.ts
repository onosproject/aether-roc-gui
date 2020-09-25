/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {SubscriberUeDataSource} from './subscriber-ue-datasource';
import {AetherV100TargetSubscriberUe} from '../../../openapi3/aether/1.0.0/models';
import {AetherV100TargetService} from '../../../openapi3/aether/1.0.0/services';
import {TARGETS} from '../../../environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'aether-subscribers',
    templateUrl: './subscribers.component.html',
    styleUrls: ['./subscribers.component.scss']
})
export class SubscribersComponent implements AfterViewInit, OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<AetherV100TargetSubscriberUe>;
    dataSource: SubscriberUeDataSource;

    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    displayedColumns = [
        'ueid',
        'priority',
        'enabled',
    ];

    constructor(
        private aetherV100TargetService: AetherV100TargetService,
        private snackBar: MatSnackBar
    ) {
    }

    ngOnInit(): void {
        this.dataSource = new SubscriberUeDataSource(this.aetherV100TargetService, TARGETS);
        this.openSnackBar('BUG: When the page is displayed, the entries are not displayed.' +
            ' Click in the header to display them');
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
        this.dataSource.loadSubscriberUe(this.table);
    }

    openSnackBar(message: string): void {
        this.snackBar.open(message, undefined, {
            duration: 5000,
        });
    }

}
