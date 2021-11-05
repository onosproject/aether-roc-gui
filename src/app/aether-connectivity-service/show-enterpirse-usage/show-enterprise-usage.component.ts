/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import { Component, EventEmitter, Input, OnChanges, Output, ViewChild} from '@angular/core'
import {FormBuilder} from '@angular/forms'
import {AETHER_TARGETS} from '../../../environments/environment'
import {Service as AetherService} from '../../../openapi3/aether/4.0.0/services/service'
import {MatPaginator} from '@angular/material/paginator'
import {MatSort} from '@angular/material/sort'
import {MatTable} from '@angular/material/table'

export interface displayedColumns {
    'id';
    'display-name';
}

@Component({
  selector: 'aether-show-enterprise-usage',
  templateUrl: './show-enterprise-usage.component.html',
    styleUrls: [
        '../../common-panel.component.scss',
    ]
})
export class ShowEnterpriseUsageComponent implements OnChanges {

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort, {static: false}) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<displayedColumns>;
    @Input() connectivityServiceID: string;
    @Output() closeShowParentCardEvent = new EventEmitter<boolean>();

    parentModulesArray: Array<displayedColumns> = [];
    displayColumns = ['id', 'display-name'];

    constructor(
        protected fb: FormBuilder,
        private aetherService: AetherService,
    ) {
    }

    ngOnChanges(): void {
        this.parentModulesArray = []
        this.aetherService.getEnterprise({
            target: AETHER_TARGETS[0]
        }).subscribe(displayData => {
            displayData.enterprise.forEach(enterpirseElement => {
                for(let i=0; i<enterpirseElement['connectivity-service'].length;i++)
                {
                    if (enterpirseElement['connectivity-service']?.[i]?.['connectivity-service'] === this.connectivityServiceID) {
                        const displayParentModules = {
                            'id': enterpirseElement.id,
                            'display-name': enterpirseElement['display-name'],
                        }
                        this.parentModulesArray.push(displayParentModules)
                    }
                }
            })
            this.table.dataSource= this.parentModulesArray
        })

    }

    keepCardOpen(cancelled: boolean): void {
        this.closeShowParentCardEvent.emit(cancelled)
    }

}
