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
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { RocUsageBase, UsageColumns } from '../../roc-usage-base';
import { SiteService } from '../../../openapi3/aether/2.1.0/services';
import { mergeMap } from 'rxjs/operators';
import { from } from 'rxjs';
import { Site } from '../../../openapi3/aether/2.1.0/models';
import { TargetName } from '../../../openapi3/top/level/models';

@Component({
    selector: 'aether-show-vcs-usage',
    templateUrl: './show-vcs-usage.component.html',
    styleUrls: ['../../common-panel.component.scss'],
})
export class ShowVcsUsageComponent extends RocUsageBase implements OnChanges {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<UsageColumns>;
    @Input() enterpriseID: TargetName = { name: undefined };
    @Input() applicationID: string;
    @Output() closeShowParentCardEvent = new EventEmitter<boolean>();

    constructor(
        protected fb: FormBuilder,
        protected route: ActivatedRoute,
        protected siteService: SiteService
    ) {
        super('application-2.1.0', ['application'], ['application-id']);
    }

    ngOnChanges(): void {
        this.parentModulesArray = [];
        this.siteService
            .getSiteList({
                'enterprise-id': this.enterpriseID.name,
            })
            .pipe(mergeMap((sites: Site[]) => from(sites)))
            .subscribe(
                (s) => {
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
                                        this.enterpriseID.name,
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
                    });
                },
                (err) => console.error(err),
                () => (this.table.dataSource = this.parentModulesArray)
            );
    }
}
