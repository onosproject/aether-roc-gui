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
export class ShowUsageComponent implements OnChanges {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<displayedColumns>;
    @Input() trafficClassID: string;
    @Input() enterpriseID: string;
    @Output() closeShowParentCardEvent = new EventEmitter<boolean>();

    parentModulesArray: Array<displayedColumns> = [];
    displayColumns = ['parent-module', 'id', 'display-name'];

    constructor(
        protected fb: FormBuilder,
        private basketService: BasketService,
        protected route: ActivatedRoute,
        private siteService: EnterprisesEnterpriseService
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
                    s['device-group'].forEach((dg) => {
                        if (dg['traffic-class'] === this.trafficClassID) {
                            const displayParentModules = {
                                id: dg['device-group-id'],
                                'display-name': dg['display-name'],
                                'parent-module': 'Device Group',
                            };
                            this.parentModulesArray.push(displayParentModules);
                        }
                    });
                    s.slice.forEach((sl) => {
                        sl['priority-traffic-rule'].forEach((ptr) => {
                            if (ptr['traffic-class'] === this.trafficClassID) {
                                const displayParentModules = {
                                    id: ptr['priority-traffic-rule-id'],
                                    'display-name': ptr['display-name'],
                                    'parent-module': 'Priority Traffic Rule',
                                };
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
                                id: appElement['application-id'],
                                'display-name': appElement['display-name'],
                                'parent-module': 'Application Endpoint',
                            };
                            this.parentModulesArray.push(displayParentModules);
                        }
                    });
                });
                this.table.dataSource = this.parentModulesArray;
            });
    }

    keepCardOpen(cancelled: boolean): void {
        this.closeShowParentCardEvent.emit(cancelled);
    }
}
