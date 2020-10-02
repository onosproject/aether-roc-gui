/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {
    AfterViewInit,
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {SubscriberUeDataSource} from './subscriber-ue-datasource';
import {AetherV100TargetSubscriberUe} from '../../../openapi3/aether/1.0.0/models';
import {
    AetherV100TargetService,
    ApiService
} from '../../../openapi3/aether/1.0.0/services';
import {AETHER_TARGETS} from '../../../environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router';

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
    selectedSubscriber: AetherV100TargetSubscriberUe;

    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    displayedColumns = [
        'ueid',
        'priority',
        'enabled',
        'edit',
        'delete'
    ];

    constructor(
        private aetherV100TargetService: AetherV100TargetService,
        private aetherApiService: ApiService,
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
        this.dataSource = new SubscriberUeDataSource(this.aetherV100TargetService, this.aetherApiService, AETHER_TARGETS);
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
        this.dataSource.loadSubscriberUe();
    }

    deleteSubscriberUe(ueid: string): void {
        this.dataSource.deleteSubscriberUe(ueid, this.snackBar);
    }

    openSnackBar(message: string, durationMs: number, action: string): void {
        this.snackBar.open(message, action, {
            duration: durationMs,
        });
    }

}
