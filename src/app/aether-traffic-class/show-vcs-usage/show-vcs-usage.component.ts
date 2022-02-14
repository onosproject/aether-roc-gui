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
import { AETHER_TARGETS } from '../../../environments/environment';
import { BasketService } from '../../basket.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { EnterprisesEnterpriseService } from '../../../openapi3/aether/2.0.0/services';

export interface displayedColumns {
    'parent-module': string;
    id: string;
    'display-name': string;
}

@Component({
    selector: 'aether-show-vcs-usage',
    templateUrl: './show-vcs-usage.component.html',
    styleUrls: ['../../common-panel.component.scss'],
})
export class ShowVcsUsageComponent implements OnChanges {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<displayedColumns>;
    @Input() trafficClassID: string;
    @Output() closeShowParentCardEvent = new EventEmitter<boolean>();

    parentModulesArray: Array<displayedColumns> = [];
    displayColumns = ['parent-module', 'id', 'display-name'];

    constructor(
        protected fb: FormBuilder,
        private basketService: BasketService,
        private siteService: EnterprisesEnterpriseService
    ) {}

    ngOnChanges(): void {
        this.parentModulesArray = [];
        this.siteService
            .getEnterprisesEnterprise({
                target: AETHER_TARGETS[0],
                'enterprise-id': '??????',
            })
            .subscribe((displayData) => {
                displayData.site
                    .find((s) => s['site-id'] === '?????')
                    ['device-group'].forEach((dg) => {
                        if (
                            dg.device['traffic-class'] === this.trafficClassID
                        ) {
                            const displayParentModules = {
                                id: dg['device-group-id'],
                                'display-name': dg['display-name'],
                                'parent-module': 'Device Group',
                            };
                            this.parentModulesArray.push(displayParentModules);
                        }
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
                                'parent-module': 'Application',
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
