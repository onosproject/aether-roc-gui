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
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { RocUsageBase, UsageColumns } from '../../roc-usage-base';
import { SiteDeviceGroupService } from '../../../openapi3/aether/2.1.0/services';
import { mergeMap } from 'rxjs/operators';
import { from } from 'rxjs';
import { SiteDeviceGroup } from '../../../openapi3/aether/2.1.0/models';
import { TargetName } from '../../../openapi3/top/level/models/target-name';

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
    @Input() enterpriseID: TargetName = { name: undefined };
    @Input() siteID: string;
    @Input() ipDomainID: string;
    @Output() closeShowParentCardEvent = new EventEmitter<boolean>();

    constructor(
        protected fb: FormBuilder,
        protected route: ActivatedRoute,
        private deviceGroupService: SiteDeviceGroupService
    ) {
        super('site-2.1.0', ['site', 'ip-domain'], ['site-id', 'ip-domain-id']);
    }

    ngOnChanges(): void {
        this.parentModulesArray = [];
        this.deviceGroupService
            .getSiteDeviceGroupList({
                'enterprise-id': this.enterpriseID,
                'site-id': this.siteID,
            })
            .pipe(mergeMap((items: SiteDeviceGroup[]) => from(items)))
            .subscribe(
                (dg) => {
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
                },
                (err) => console.error(err),
                () => (this.table.dataSource = this.parentModulesArray)
            );
    }
}
