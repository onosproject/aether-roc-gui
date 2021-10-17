/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import { Component, EventEmitter, Input, OnChanges, Output, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {RocListBase} from "../../roc-list-base";
import {VcsDatasource} from "../../aether-vcs/vcs/vcs-datasource";
import {AETHER_TARGETS} from "../../../environments/environment";
import {BasketService} from "../../basket.service";
import {Service as AetherService} from "../../../openapi3/aether/4.0.0/services/service";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from "@angular/material/sort";
import {MatTable} from "@angular/material/table";

export interface displayedColumns {
    'id';
    'display-name';
}

@Component({
    selector: 'aether-show-vcs-usage',
    templateUrl: './show-vcs-usage.component.html',
    styleUrls: [
        '../../common-panel.component.scss',
    ]
})
export class ShowVcsUsageComponent implements OnChanges {

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort, {static: false}) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<displayedColumns>;
    @Input() upfID: string;
    @Output() closeShowParentCardEvent = new EventEmitter<boolean>();

    parentModulesArray: Array<displayedColumns> = [];
    displayColumns = ['id', 'display-name'];

    constructor(
        protected fb: FormBuilder,
        private basketService: BasketService,
        private aetherService: AetherService,
    ) {
    }

    ngOnChanges(): void {
        this.parentModulesArray = [];
        this.aetherService.getVcs({
            target: AETHER_TARGETS[0]
        }).subscribe(displayData => {
            displayData.vcs.forEach(vcsElement => {
                if (vcsElement.upf === this.upfID) {
                    let displayParentModules = {
                        'id': vcsElement.id,
                        'display-name': vcsElement["display-name"],
                    }
                    this.parentModulesArray.push(displayParentModules);
                }
            })
            this.table.dataSource = this.parentModulesArray;
        })
    }

    keepCardOpen(cancelled: boolean): void {
        this.closeShowParentCardEvent.emit(cancelled);
    }

}
