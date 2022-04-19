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
import {
    SiteService,
    SiteSliceService,
} from '../../../openapi3/aether/2.1.0/services';
import { mergeMap } from 'rxjs/operators';
import { SiteDeviceGroup } from '../../../openapi3/aether/2.1.0/models/site-device-group';
import { from } from 'rxjs';
import { SiteSlice } from '../../../openapi3/aether/2.1.0/models/site-slice';

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
    @Input() deviceGroupID: string;
    @Output() closeShowParentCardEvent = new EventEmitter<boolean>();

    constructor(
        protected fb: FormBuilder,
        protected route: ActivatedRoute,
        private siteService: SiteService,
        private sliceService: SiteSliceService
    ) {
        super(
            'site-2.1.0',
            ['site', 'device-group'],
            ['site-id', 'device-group-id']
        );
    }

    ngOnChanges(): void {
        this.parentModulesArray = [];
        this.sliceService
            .getSiteSliceList({
                'enterprise-id': this.enterpriseID,
                'site-id': this.siteID,
            })
            .pipe(mergeMap((items: SiteSlice[]) => from(items)))
            .subscribe(
                (sliceElement) => {
                    sliceElement['device-group'].forEach((dg) => {
                        if (dg['device-group'] === this.deviceGroupID) {
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
                },
                (err) => console.error(err),
                () => (this.table.dataSource = this.parentModulesArray)
            );
    }
}
