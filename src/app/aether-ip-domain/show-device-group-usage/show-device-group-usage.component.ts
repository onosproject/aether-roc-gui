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
import { EnterprisesEnterpriseSiteService } from '../../../openapi3/aether/2.0.0/services';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { RocUsageBase, UsageColumns } from '../../roc-usage-base';

export interface displayedColumns {
    id;
    'display-name';
}

@Component({
    selector: 'aether-show-device-group-usage',
    templateUrl: './show-device-group-usage.component.html',
    styleUrls: ['../../common-panel.component.scss'],
})
export class ShowDeviceGroupUsageComponent
    extends RocUsageBase
    implements OnChanges
{
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<UsageColumns>;
    @Input() enterpriseID: string;
    @Input() siteID: string;
    @Input() ipDomainID: string;
    @Output() closeShowParentCardEvent = new EventEmitter<boolean>();

    constructor(
        protected fb: FormBuilder,
        protected route: ActivatedRoute,
        private siteService: EnterprisesEnterpriseSiteService
    ) {
        super(
            'enterprises-2.0.0',
            ['enterprise', 'site', 'ip-domain'],
            ['enterprise-id', 'site-id', 'ip-domain-id']
        );
    }

    ngOnChanges(): void {
        this.parentModulesArray = [];
        this.siteService
            .getEnterprisesEnterpriseSite({
                target: AETHER_TARGET,
                'enterprise-id': this.enterpriseID,
                'site-id': this.siteID,
            })
            .subscribe((displayData) => {
                displayData['device-group'].forEach((dg) => {
                    if (dg['ip-domain'] === this.ipDomainID) {
                        const displayParentModules = {
                            type: 'Device-Group',
                            'attr-names': [
                                'enterprise-id',
                                'site-id',
                                'device-group-id',
                            ],
                            ids: [
                                this.enterpriseID,
                                this.siteID,
                                dg['device-group-id'],
                            ],
                            'display-name': dg['display-name'],
                            route: '/device-group/device-group-edit',
                        } as UsageColumns;
                        this.parentModulesArray.push(displayParentModules);
                    }
                });
                this.table.dataSource = this.parentModulesArray;
            });
    }
}
