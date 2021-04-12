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
import {SubscriberUe} from '../../../openapi3/aether/2.1.0/models';
import {Service as AetherService} from '../../../openapi3/aether/2.1.0/services';
import {AETHER_TARGETS} from '../../../environments/environment';
import {BasketService} from '../../basket.service';

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
        private basketService: BasketService,
    ) {
    }

    ngOnInit(): void {
        this.dataSource = new SubscriberUeDataSource(this.aetherService, this.basketService, AETHER_TARGETS[0]);
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
        this.dataSource.loadData(this.aetherService.getSubscriber({
            target: AETHER_TARGETS[0]
        }));
    }

    deleteSubscriberUe(id: string): void {
        this.dataSource.delete(id);
    }
}
