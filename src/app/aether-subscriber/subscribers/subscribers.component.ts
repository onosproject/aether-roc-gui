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
import {SubscriberUe} from '../../../openapi3/aether/2.0.0/models';
import {
    Service as AetherService,
    ApiService
} from '../../../openapi3/aether/2.0.0/services';
import {AETHER_TARGETS} from '../../../environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'aether-subscribers',
    templateUrl: './subscribers.component.html',
    styleUrls: ['../../common-profiles.component.scss', './subscribers.component.scss']
})
export class SubscribersComponent implements AfterViewInit, OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<SubscriberUe>;
    dataSource: SubscriberUeDataSource;
    selectedSubscriber: SubscriberUe;

    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    displayedColumns = [
        'id',
        'enterprise',
        'imsi',
        'priority',
        'enabled',
        'serving-plmn',
        'profiles',
        'edit',
        'delete'
    ];

    constructor(
        private aetherService: AetherService,
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
        this.dataSource = new SubscriberUeDataSource(this.aetherService, this.aetherApiService, AETHER_TARGETS);
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
        this.dataSource.loadSubscriberUe();
    }

    deleteSubscriberUe(id: string): void {
        this.dataSource.deleteSubscriberUe(id, this.snackBar);
    }

    openSnackBar(message: string, durationMs: number, action: string): void {
        this.snackBar.open(message, action, {
            duration: durationMs,
        });
    }

}
