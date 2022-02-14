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
import { AETHER_TARGETS } from '../../../environments/environment';
import {
    EnterprisesEnterpriseSiteService,
    Service as AetherService,
} from '../../../openapi3/aether/2.0.0/services';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';

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
    @Input() deviceGroupID: string;
    @Output() closeShowParentCardEvent = new EventEmitter<boolean>();

    parentModulesArray: Array<displayedColumns> = [];
    displayColumns = ['id', 'display-name'];

    constructor(
        protected fb: FormBuilder,
        private siteService: EnterprisesEnterpriseSiteService
    ) {}

    ngOnChanges(): void {
        this.parentModulesArray = [];
        this.siteService
            .getEnterprisesEnterpriseSite({
                target: AETHER_TARGETS[0],
                'enterprise-id': '?????????',
                'site-id': '??????????????',
            })
            .subscribe((displayData) => {
                displayData.slice.forEach((vcsElement) => {
                    if (
                        vcsElement['device-group']?.[0]?.['device-group'] ===
                        this.deviceGroupID
                    ) {
                        const displayParentModules = {
                            id: vcsElement.id,
                            'display-name': vcsElement['display-name'],
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
