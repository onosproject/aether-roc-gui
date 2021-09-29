/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {AfterViewInit, Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {RocListBase} from "../../roc-list-base";
import {AETHER_TARGETS} from "../../../environments/environment";
import {BasketService} from "../../basket.service";
import {Service as AetherService} from "../../../openapi3/aether/3.0.0/services/service";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from "@angular/material/sort";
import {MatTable} from "@angular/material/table";
import {EnterpriseDatasource} from "../../aether-enterprise/enterprise/enterprise-datasource";

export interface displayedColumns {
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
    @ViewChild(MatSort, {static: false}) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<displayedColumns>;
    @Input() connectivityServiceID: string;
    @Output() closeShowParentCardEvent = new EventEmitter<boolean>();

    parentModulesArray: Array<displayedColumns> = [];
    displayColumns = ['id', 'display-name'];

    constructor(
        protected fb: FormBuilder,
        private basketService: BasketService,
        private aetherService: AetherService,
    ) {
    }

    ngAfterViewInit(): void {
        this.aetherService.getEnterprise({
            target: AETHER_TARGETS[0]
        }).subscribe(displayData => {
            displayData.enterprise.forEach(enterpirseElement => {
                if (enterpirseElement["connectivity-service"][0]["connectivity-service"] === this.connectivityServiceID) {
                    let displayParentModules = {
                        'id': enterpirseElement.id,
                        'display-name': enterpirseElement["display-name"],
                    }
                    this.parentModulesArray.push(displayParentModules);
                }
            })
            this.table.dataSource= this.parentModulesArray;
        })

    }

    keepCardOpen(cancelled: boolean): void {
        this.closeShowParentCardEvent.emit(cancelled);
    }

}