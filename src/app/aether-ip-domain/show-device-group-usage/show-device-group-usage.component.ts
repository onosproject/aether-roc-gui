/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    ViewChild,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AETHER_TARGET } from '../../../environments/environment';
import {
    EnterprisesEnterpriseSiteService,
    Service as AetherService,
} from '../../../openapi3/aether/2.0.0/services';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

export interface displayedColumns {
    id;
    'display-name';
}

@Component({
    selector: 'aether-show-device-group-usage',
    templateUrl: './show-device-group-usage.component.html',
    styleUrls: ['../../common-panel.component.scss'],
})
export class ShowDeviceGroupUsageComponent implements OnChanges {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<displayedColumns>;
    @Input() ipDomainID: string;
    @Output() closeShowParentCardEvent = new EventEmitter<boolean>();

    parentModulesArray: Array<displayedColumns> = [];
    displayColumns = ['id', 'display-name'];

    constructor(
        protected fb: FormBuilder,
        protected route: ActivatedRoute,
        private siteService: EnterprisesEnterpriseSiteService
    ) {}

    ngOnChanges(): void {
        this.parentModulesArray = [];
        this.siteService
            .getEnterprisesEnterpriseSite({
                target: AETHER_TARGET,
                'enterprise-id': this.route.snapshot.params['enterprise-id'],
                'site-id': this.route.snapshot.params['site-id'],
            })
            .subscribe((displayData) => {
                displayData['device-group'].forEach((deviceGroupElement) => {
                    if (deviceGroupElement['ip-domain'] === this.ipDomainID) {
                        const displayParentModules = {
                            id: deviceGroupElement.id,
                            'display-name': deviceGroupElement['display-name'],
                        };
                        this.parentModulesArray.push(displayParentModules);
                    }
                });
                this.table.dataSource = this.parentModulesArray;
            });
    }

    keepCardOpen(cancelled: boolean): void {
        this.closeShowParentCardEvent.emit(cancelled);
    }
}
