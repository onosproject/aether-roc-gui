/*
 * SPDX-FileCopyrightText: 2022-present Intel Corporation
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { RocUsageBase, UsageColumns } from '../../roc-usage-base';
import { TargetName } from '../../../openapi3/top/level/models';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SwitchService } from '../../../openapi3/sdn-fabric/0.1.0/services';
import { mergeMap } from 'rxjs/operators';
import { from } from 'rxjs';
import { Switch } from '../../../openapi3/sdn-fabric/0.1.0/models';

@Component({
    selector: 'aether-show-switch-usage',
    templateUrl: './show-switch-usage.component.html',
    styleUrls: ['../../common-panel.component.scss'],
})
export class ShowSwitchUsageComponent
    extends RocUsageBase
    implements OnChanges
{
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<UsageColumns>;
    @Input() fabricID: TargetName = { name: undefined };
    @Input() modelID: string;
    @Output() closeShowParentCardEvent = new EventEmitter<boolean>();

    constructor(
        protected fb: FormBuilder,
        protected route: ActivatedRoute,
        protected switchService: SwitchService
    ) {
        super('switch-model-0.1.0', ['switch-model'], ['switch-model-id']);
    }

    ngOnChanges(): void {
        this.parentModulesArray = [];
        this.switchService
            .getSwitchList({
                'fabric-id': this.fabricID.name,
            })
            .pipe(mergeMap((switches: Switch[]) => from(switches)))
            .subscribe(
                (s) => {
                    if (s['model-id'] === this.modelID) {
                        const displayParentModules = {
                            type: 'Switch',
                            'attr-names': ['fabric-id', 'switch-id'],
                            ids: [this.fabricID.name, s['switch-id']],
                            'display-name': s['display-name'],
                            route: '/switch/switch-edit',
                        } as UsageColumns;
                        this.parentModulesArray.push(displayParentModules);
                    }
                },
                (err) => console.error(err),
                () => (this.table.dataSource = this.parentModulesArray)
            );
    }
}
