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
import { RocUsageBase, UsageColumns } from '../../roc-usage-base';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TargetName } from '../../../openapi3/top/level/models/target-name';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SwitchService } from '../../../openapi3/sdn-fabric/0.1.0/services/switch.service';
import { mergeMap } from 'rxjs/operators';
import { Switch } from '../../../openapi3/sdn-fabric/0.1.0/models/switch';
import { from } from 'rxjs';

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
    @Input() dhcpServerID: string;
    @Output() closeShowParentCardEvent = new EventEmitter<boolean>();

    constructor(
        protected fb: FormBuilder,
        protected route: ActivatedRoute,
        protected switchService: SwitchService
    ) {
        super('dhcp-server-0.1.0', ['dhcp-server'], ['dhcp-server-id']);
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
                    if (s.port !== undefined) {
                        if (
                            s.port.some(
                                (p) =>
                                    p['dhcp-connect-point'] &&
                                    p['dhcp-connect-point'].includes(
                                        this.dhcpServerID
                                    )
                            )
                        ) {
                            const displayParentModules = {
                                type: 'Switch',
                                'attr-names': ['fabric-id', 'switch-id'],
                                ids: [this.fabricID.name, s['switch-id']],
                                'display-name': s['display-name'],
                                route: '/switch/switch-edit',
                            } as UsageColumns;
                            this.parentModulesArray.push(displayParentModules);
                        }
                    }
                },
                (err) => console.error(err),
                () => (this.table.dataSource = this.parentModulesArray)
            );
    }
}
