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
    selector: 'aether-show-vcs-usage',
    templateUrl: './show-vcs-usage.component.html',
    styleUrls: ['../../common-panel.component.scss'],
})
export class ShowVcsUsageComponent implements OnChanges {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<displayedColumns>;
    @Input() enterpriseID: string;
    @Input() siteID: string;
    @Input() deviceGroupID: string;
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
                'enterprise-id': this.enterpriseID,
                'site-id': this.siteID,
            })
            .subscribe((displayData) => {
                displayData.slice.forEach((sliceElement) => {
                    sliceElement['device-group'].forEach((dg) => {
                        if (dg['device-group'] === this.deviceGroupID) {
                            const displayParentModules = {
                                id: sliceElement['slice-id'],
                                'display-name': sliceElement['display-name'],
                            };
                            this.parentModulesArray.push(displayParentModules);
                        }
                    });
                });
                this.table.dataSource = this.parentModulesArray;
            });
    }

    keepCardOpen(cancelled: boolean): void {
        this.closeShowParentCardEvent.emit(cancelled);
    }
}
