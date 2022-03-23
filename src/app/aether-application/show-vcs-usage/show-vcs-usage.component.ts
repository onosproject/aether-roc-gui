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
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { EnterprisesEnterpriseService } from '../../../openapi3/aether/2.0.0/services';
import { RocUsageBase, UsageColumns } from '../../roc-usage-base';

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
    @Input() applicationID: string;
    @Output() closeShowParentCardEvent = new EventEmitter<boolean>();

    constructor(
        protected fb: FormBuilder,
        protected route: ActivatedRoute,
        protected siteService: EnterprisesEnterpriseService
    ) {
        super(
            'enterprises-2.0.0',
            ['enterprise', 'application'],
            ['enterprise-id', 'application-id']
        );
    }

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
                                    type: 'Slice',
                                    'attr-names': [
                                        'enterprise-id',
                                        'site-id',
                                        'slice-id',
                                    ],
                                    ids: [
                                        displayData['enterprise-id'],
                                        s['site-id'],
                                        sliceElement['slice-id'],
                                    ],
                                    'display-name':
                                        sliceElement['display-name'],
                                    route: '/slice/slice-edit',
                                } as UsageColumns;
                                this.parentModulesArray.push(
                                    displayParentModules
                                );
                            }
                        });
                        this.table.dataSource = this.parentModulesArray;
                    });
                });
            });
    }
}
