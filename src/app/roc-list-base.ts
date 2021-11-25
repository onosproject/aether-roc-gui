/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import { BasketService } from './basket.service';

export abstract class RocListBase<T> {
    public dataSource: T;
    protected reqdAttr: string[] = [];
    public id: string;
    public showUsageCard: boolean = false;

    protected constructor(
        protected bs: BasketService,
        datasource: T,
        protected pathRoot: string,
        protected pathListAttr: string,
        protected indexAttr: string = 'id'
    ) {
        this.dataSource = datasource;
    }

    delete(id: string): void {
        const ucMap = new Map<string, string>();
        if (this.reqdAttr.length > 0) {
            ucMap.set(
                '/' +
                    this.pathRoot +
                    '/' +
                    this.pathListAttr +
                    '[' +
                    this.indexAttr +
                    '=' +
                    id +
                    ']',
                this.reqdAttr.join(',')
            );
        }
        this.bs.deleteIndexedEntry(
            '/' +
                this.pathRoot +
                '/' +
                this.pathListAttr +
                '[' +
                this.indexAttr +
                '=' +
                id +
                ']',
            this.indexAttr,
            id,
            ucMap
        );
        // @ts-ignore
        this.dataSource.delete(id);
    }

    showUsage(id: string): void {
        this.id = id;
        this.showUsageCard = true;
    }

    closeShowParentCard(close: boolean): void {
        this.showUsageCard = false;
    }
}
