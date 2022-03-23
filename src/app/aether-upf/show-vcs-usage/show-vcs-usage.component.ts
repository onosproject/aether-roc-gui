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
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { EnterprisesEnterpriseSiteService } from '../../../openapi3/aether/2.0.0/services';
import { ActivatedRoute } from '@angular/router';
import { RocUsageBase, UsageColumns } from '../../roc-usage-base';

export interface displayedColumns {
    id;
    'display-name';
}

@Component({
    selector: 'aether-show-vcs-usage',
    templateUrl: './show-vcs-usage.component.html',
    styleUrls: ['../../common-panel.component.scss'],
})
export class ShowVcsUsageComponent extends RocUsageBase implements OnChanges {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<UsageColumns>;
    @Input() enterpriseID: string;
    @Input() siteID: string;
    @Input() upfID: string;
    @Output() closeShowParentCardEvent = new EventEmitter<boolean>();

    constructor(
        protected fb: FormBuilder,
        protected route: ActivatedRoute,
        protected siteService: EnterprisesEnterpriseSiteService
    ) {
        super(
            'enterprises-2.0.0',
            ['enterprise', 'site', 'upf'],
            ['enterprise-id', 'site-id', 'upf-id']
        );
    }

    ngOnChanges(): void {
        this.parentModulesArray = [];
        this.siteService
            .getEnterprisesEnterpriseSite({
                target: AETHER_TARGET,
                'site-id': this.siteID,
                'enterprise-id': this.enterpriseID,
            })
            .subscribe((displayData) => {
                displayData.slice.forEach((sliceElement) => {
                    if (sliceElement.upf === this.upfID) {
                        const displayParentModules = {
                            type: 'Slice',
                            'attr-names': [
                                'enterprise-id',
                                'site-id',
                                'slice-id',
                            ],
                            ids: [
                                this.enterpriseID,
                                this.siteID,
                                sliceElement['slice-id'],
                            ],
                            'display-name': sliceElement['display-name'],
                            route: '/slice/slice-edit',
                        } as UsageColumns;
                        this.parentModulesArray.push(displayParentModules);
                    }
                });
                this.table.dataSource = this.parentModulesArray;
            });
    }
}
