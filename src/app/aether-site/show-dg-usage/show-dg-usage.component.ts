/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
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
import { AETHER_TARGETS } from '../../../environments/environment';
import { BasketService } from '../../basket.service';
import { Service as AetherService } from '../../../openapi3/aether/4.0.0/services/service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';

export interface displayedColumns {
    id;
    'display-name';
}

@Component({
    selector: 'aether-show-dg-usage',
    templateUrl: './show-dg-usage.component.html',
    styleUrls: ['../../common-panel.component.scss'],
})
export class ShowDgUsageComponent implements OnChanges {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<displayedColumns>;
    @Input() siteID: string;
    @Output() closeShowParentCardEvent = new EventEmitter<boolean>();

    parentModulesArray: Array<displayedColumns> = [];
    displayColumns = ['parent-module', 'id', 'display-name'];

    constructor(
        protected fb: FormBuilder,
        private basketService: BasketService,
        private aetherService: AetherService
    ) {}

    ngOnChanges(): void {
        this.parentModulesArray = [];
        this.aetherService
            .getDeviceGroup({
                target: AETHER_TARGETS[0],
            })
            .subscribe((displayData) => {
                displayData['device-group'].forEach((deviceGroupElement) => {
                    if (deviceGroupElement.site === this.siteID) {
                        const displayParentModules = {
                            id: deviceGroupElement.id,
                            'display-name': deviceGroupElement['display-name'],
                            'parent-module': 'Device Group',
                        };
                        this.parentModulesArray.push(displayParentModules);
                    }
                });
                this.aetherService
                    .getVcs({
                        target: AETHER_TARGETS[0],
                    })
                    .subscribe((displayData) => {
                        displayData.vcs.forEach((VCSElement) => {
                            if (VCSElement.site === this.siteID) {
                                const displayParentModules = {
                                    id: VCSElement.id,
                                    'display-name': VCSElement['display-name'],
                                    'parent-module': 'VCS',
                                };
                                this.parentModulesArray.push(
                                    displayParentModules
                                );
                            }
                        });
                        this.aetherService
                            .getUpf({
                                target: AETHER_TARGETS[0],
                            })
                            .subscribe((displayData) => {
                                displayData.upf.forEach((UPFElement) => {
                                    if (UPFElement.site === this.siteID) {
                                        const displayParentModules = {
                                            id: UPFElement.id,
                                            'display-name':
                                                UPFElement['display-name'],
                                            'parent-module': 'UPF',
                                        };
                                        this.parentModulesArray.push(
                                            displayParentModules
                                        );
                                    }
                                    this.table.dataSource =
                                        this.parentModulesArray;
                                });
                            });
                    });
            });
    }

    keepCardOpen(cancelled: boolean): void {
        this.closeShowParentCardEvent.emit(cancelled);
    }
}
