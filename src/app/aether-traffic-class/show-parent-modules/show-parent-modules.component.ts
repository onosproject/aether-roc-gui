/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {AfterViewInit, Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {RocListBase} from "../../roc-list-base";
import {VcsDatasource} from "../../aether-vcs/vcs/vcs-datasource";
import {AETHER_TARGETS} from "../../../environments/environment";
import {BasketService} from "../../basket.service";
import {Service as AetherService} from "../../../openapi3/aether/3.0.0/services/service";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from "@angular/material/sort";
import {MatTable} from "@angular/material/table";

export interface displayedColumns {
    'parent-module'
    'id';
    'display-name';
}

@Component({
    selector: 'aether-show-parent-modules',
    templateUrl: './show-parent-modules.component.html',
    styleUrls: [
        '../../common-panel.component.scss',
    ]
})

export class ShowParentModulesComponent implements AfterViewInit {

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
        private aetherService: AetherService,
    ) {
    }

    ngAfterViewInit(): void {
        this.aetherService.getVcs({
            target: AETHER_TARGETS[0]
        }).subscribe(displayData => {
            displayData.vcs.forEach(vcsElement => {
                if (vcsElement["traffic-class"] === this.trafficClassID) {
                    let displayParentModules = {
                        'id': vcsElement.id,
                        'display-name': vcsElement["display-name"],
                        'parent-module': "VCS"
                    }
                    this.parentModulesArray.push(displayParentModules);
                }
            })
            this.aetherService.getTemplate({
                target: AETHER_TARGETS[0]
            }).subscribe(displayData => {
                displayData.template.forEach(templateElement => {
                    if (templateElement["traffic-class"] === this.trafficClassID) {
                        let displayParentModules = {
                            'id': templateElement.id,
                            'display-name': templateElement["display-name"],
                            'parent-module': "Template"
                        }
                        this.parentModulesArray.push(displayParentModules);
                    }
                    this.table.dataSource = this.parentModulesArray;
                })
            })
        })
    }

    keepCardOpen(cancelled: boolean): void {
        this.closeShowParentCardEvent.emit(cancelled);
    }

}
