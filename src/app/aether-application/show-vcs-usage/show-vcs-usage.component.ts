/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import {
    OnChanges,
    Component,
    EventEmitter,
    Input,
    Output,
    ViewChild,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AETHER_TARGET } from '../../../environments/environment';
import { Service as AetherService } from '../../../openapi3/aether/2.0.0/services/service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { EnterprisesEnterpriseSiteService } from '../../../openapi3/aether/2.0.0/services/enterprises-enterprise-site.service';
import { ActivatedRoute } from '@angular/router';
import { EnterprisesEnterpriseService } from '../../../openapi3/aether/2.0.0/services/enterprises-enterprise.service';

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
    @Input() applicationID: string;
    @Output() closeShowParentCardEvent = new EventEmitter<boolean>();

    parentModulesArray: Array<displayedColumns> = [];
    displayColumns = ['id', 'display-name'];

    constructor(
        protected fb: FormBuilder,
        protected route: ActivatedRoute,
        protected siteService: EnterprisesEnterpriseService
    ) {}

    ngOnChanges(): void {
        this.parentModulesArray = [];
        this.siteService
            .getEnterprisesEnterprise({
                target: AETHER_TARGET,
                'enterprise-id': this.enterpriseID,
            })
            .subscribe((displayData) => {
                displayData.site.forEach((s) => {
                    s.slice.forEach((sliceElement) => {
                        sliceElement.filter.forEach((filterElement) => {
                            if (
                                filterElement.application === this.applicationID
                            ) {
                                const displayParentModules = {
                                    id: filterElement.application,
                                    'display-name':
                                        filterElement['display-name'],
                                };
                                this.parentModulesArray.push(
                                    displayParentModules
                                );
                            }
                            this.table.dataSource = this.parentModulesArray;
                        });
                    });
                });
            });
    }

    keepCardOpen(cancelled: boolean): void {
        this.closeShowParentCardEvent.emit(cancelled);
    }
}
