/*
 * SPDX-FileCopyrightText: 2022-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { EventEmitter } from '@angular/core';

export interface UsageColumns {
    type: string;
    'attr-names': string[];
    ids: string[];
    'display-name': string;
    route: string;
}

export abstract class RocUsageBase {
    public closeShowParentCardEvent = new EventEmitter<boolean>();
    protected parentModulesArray: UsageColumns[];
    public displayColumns = ['type', 'ids', 'display-name'];

    protected constructor(
        protected pathRoot: string,
        protected pathListAttr: string[],
        protected indexAttr: string[]
    ) {}

    routeCalc(usageColumns: UsageColumns): string {
        return `${usageColumns.route}/${usageColumns.ids.join('/')}`;
    }

    keepCardOpen(cancelled: boolean): void {
        this.closeShowParentCardEvent.emit(cancelled);
    }
}
