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
import { mergeMap } from 'rxjs/operators';
import { from } from 'rxjs';
import {
    ApplicationService,
    SiteService,
} from '../../../openapi3/aether/2.1.0/services';
import { Application, Site } from '../../../openapi3/aether/2.1.0/models';
import { TargetName } from '../../../openapi3/top/level/models';

export interface displayedColumns {
    'parent-module': string;
    id: string;
    'display-name': string;
}

@Component({
    selector: 'aether-show-usage',
    templateUrl: './show-usage.component.html',
    styleUrls: ['../../common-panel.component.scss'],
})
export class ShowUsageComponent extends RocUsageBase implements OnChanges {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<UsageColumns>;
    @Input() trafficClassID: string;
    @Input() enterpriseID: TargetName = { name: undefined };
    @Output() closeShowParentCardEvent = new EventEmitter<boolean>();

    constructor(
        protected fb: FormBuilder,
        protected route: ActivatedRoute,
        protected siteService: SiteService,
        protected applicationService: ApplicationService
    ) {
        super('traffic-class-2.1.0', ['traffic-class'], ['traffic-class-id']);
    }

    ngOnChanges(): void {
        this.parentModulesArray = [];
        this.siteService
            .getSiteList({
                'enterprise-id': this.enterpriseID.name,
            })
            .pipe(mergeMap((items: Site[]) => from(items)))
            .subscribe(
                (s) => {
                    s['device-group'].forEach((dg) => {
                        if (dg['traffic-class'] === this.trafficClassID) {
                            const displayParentModules = {
                                type: 'Device Group',
                                'attr-names': [
                                    'enterprise-id',
                                    'site-id',
                                    'device-group-id',
                                ],
                                ids: [
                                    this.enterpriseID.name,
                                    s['site-id'],
                                    dg['device-group-id'],
                                ],
                                'display-name': dg['display-name'],
                                route: '/device-group/device-group-edit',
                            } as UsageColumns;
                            this.parentModulesArray.push(displayParentModules);
                        }
                    });
                    if (s.slice) {
                        s.slice.forEach((sl) => {
                            sl['priority-traffic-rule'].forEach((ptr) => {
                                if (
                                    ptr['traffic-class'] === this.trafficClassID
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
                                            sl['slice-id'],
                                        ],
                                        'display-name': sl['display-name'],
                                        route: '/slice/slice-edit',
                                    } as UsageColumns;
                                    this.parentModulesArray.push(
                                        displayParentModules
                                    );
                                }
                            });
                        });
                    }
                },
                (err) => console.error(err),
                () => {
                    // When finished, get the application endpoints
                    this.applicationService
                        .getApplicationList({
                            'enterprise-id': this.enterpriseID.name,
                        })
                        .pipe(mergeMap((items: Application[]) => from(items)))
                        .subscribe(
                            (appElement) => {
                                appElement.endpoint.forEach(
                                    (appEndpointElement) => {
                                        if (
                                            appEndpointElement[
                                                'traffic-class'
                                            ] === this.trafficClassID
                                        ) {
                                            const displayParentModules = {
                                                type: 'Application',
                                                'attr-names': [
                                                    'enterprise-id',
                                                    'application-id',
                                                ],
                                                ids: [
                                                    this.enterpriseID.name,
                                                    appElement[
                                                        'application-id'
                                                    ],
                                                ],
                                                'display-name':
                                                    appElement['display-name'],
                                                route: '/application/application-edit',
                                            } as UsageColumns;
                                            this.parentModulesArray.push(
                                                displayParentModules
                                            );
                                        }
                                    }
                                );
                            },
                            (err) => {
                                if (err.status != 404) {
                                    console.error(err);
                                } else {
                                    this.table.dataSource =
                                        this.parentModulesArray;
                                }
                            },
                            () => {
                                console.log(
                                    'Completed usage search for',
                                    this.trafficClassID
                                );
                                this.table.dataSource = this.parentModulesArray;
                            }
                        );
                }
            );
    }
}
