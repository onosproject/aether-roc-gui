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
import { BasketService } from '../../basket.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { EnterprisesEnterpriseService } from '../../../openapi3/aether/2.0.0/services';
import { ActivatedRoute } from '@angular/router';
import { RocUsageBase, UsageColumns } from '../../roc-usage-base';

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
    @Input() enterpriseID: string;
    @Output() closeShowParentCardEvent = new EventEmitter<boolean>();

    constructor(
        protected fb: FormBuilder,
        private basketService: BasketService,
        protected route: ActivatedRoute,
        private siteService: EnterprisesEnterpriseService
    ) {
        super(
            'Enterprises-2.0.0',
            ['enterprise', 'traffic-class'],
            ['enterprise-id', 'traffic-class-id']
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
                                    this.enterpriseID,
                                    s['site-id'],
                                    dg['device-group-id'],
                                ],
                                'display-name': dg['display-name'],
                                route: '/device-group/device-group-edit',
                            } as UsageColumns;
                            this.parentModulesArray.push(displayParentModules);
                        }
                    });
                    s.slice.forEach((sl) => {
                        sl['priority-traffic-rule'].forEach((ptr) => {
                            if (ptr['traffic-class'] === this.trafficClassID) {
                                const displayParentModules = {
                                    type: 'Slice',
                                    'attr-names': [
                                        'enterprise-id',
                                        'site-id',
                                        'slice-id',
                                    ],
                                    ids: [
                                        this.enterpriseID,
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
                });
                displayData.application.forEach((appElement) => {
                    appElement.endpoint.forEach((appEndpointElement) => {
                        if (
                            appEndpointElement['traffic-class'] ===
                            this.trafficClassID
                        ) {
                            const displayParentModules = {
                                type: 'Application',
                                'attr-names': [
                                    'enterprise-id',
                                    'application-id',
                                ],
                                ids: [
                                    this.enterpriseID,
                                    appElement['application-id'],
                                ],
                                'display-name': appElement['display-name'],
                                route: '/application/application-edit',
                            } as UsageColumns;
                            this.parentModulesArray.push(displayParentModules);
                        }
                    });
                });
                this.table.dataSource = this.parentModulesArray;
            });
    }
}
