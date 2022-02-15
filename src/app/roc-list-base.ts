/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { BasketService } from './basket.service';
import { RocElement } from '../openapi3/top/level/models/elements';
import {
    GenericRocDataSource,
    RocGenericContainerType,
    RocGenericModelType,
} from './roc-data-source';

interface Selected {
    id: string;
    enterprise: string;
    site: string;
}

export abstract class RocListBase<
    T extends GenericRocDataSource<RocGenericModelType, RocGenericContainerType>
> {
    public dataSource: T;
    protected reqdAttr: string[] = [];
    public selected: Selected;
    public usageArray = [];
    public showUsageCard = false;

    protected constructor(
        protected bs: BasketService,
        datasource: T,
        public pathRoot: RocElement,
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
        this.dataSource.delete(id);
    }

    showUsage(id: string, enterprise?: string, site?: string): void {
        this.selected = { id, enterprise, site } as Selected;
        this.showUsageCard = true;
    }

    closeShowParentCard(): void {
        this.showUsageCard = false;
    }

    checkForUsage(ID: string): boolean {
        return !this.usageArray?.some(
            (applicationElement) => applicationElement.id === ID
        );
    }
}
