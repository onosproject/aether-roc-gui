/*
 * SPDX-FileCopyrightText: 2022-present Intel Corporation
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
import { RocUsageBase, UsageColumns } from '../../roc-usage-base';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TargetName } from '../../../openapi3/top/level/models';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SiteDeviceService } from '../../../openapi3/aether/2.1.0/services';
import { mergeMap } from 'rxjs/operators';
import { from } from 'rxjs';
import { SiteDevice } from '../../../openapi3/aether/2.1.0/models';

export interface displayedColumns {
    id;
    'display-name';
}

@Component({
    selector: 'aether-show-device-usage',
    templateUrl: './show-device-usage.component.html',
    styleUrls: ['../../common-panel.component.scss'],
})
export class ShowDeviceUsageComponent
    extends RocUsageBase
    implements OnChanges
{
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<UsageColumns>;
    @Input() enterpriseID: TargetName = { name: undefined };
    @Input() siteID: string;
    @Input() simCardID: string;
    @Output() closeShowParentCardEvent = new EventEmitter<boolean>();

    constructor(
        protected fb: FormBuilder,
        protected route: ActivatedRoute,
        private deviceService: SiteDeviceService
    ) {
        super('site-2.1.0', ['site', 'sim-card'], ['site-id', 'sim-id']);
    }

    ngOnChanges(): void {
        this.parentModulesArray = [];
        this.deviceService
            .getSiteDeviceList({
                'enterprise-id': this.enterpriseID.name,
                'site-id': this.siteID,
            })
            .pipe(mergeMap((items: SiteDevice[]) => from(items)))
            .subscribe(
                (dev) => {
                    if (dev['sim-card'] === this.simCardID) {
                        const displayParentModules = {
                            type: 'Device',
                            'attr-names': [
                                'enterprise-id',
                                'site-id',
                                'device-id',
                            ],
                            ids: [
                                this.enterpriseID.name,
                                this.siteID,
                                dev['device-id'],
                            ],
                            'display-name': dev['display-name'],
                            route: '/device/device-edit',
                        } as UsageColumns;
                        this.parentModulesArray.push(displayParentModules);
                    }
                },
                (err) => console.error(err),
                () => (this.table.dataSource = this.parentModulesArray)
            );
    }
}
