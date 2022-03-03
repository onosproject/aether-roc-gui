/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { BasketService, FORDELETE, STRIKETHROUGH } from './basket.service';
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
    T extends GenericRocDataSource<
        RocGenericModelType,
        RocGenericContainerType
    >,
    U extends RocGenericModelType
> {
    public dataSource: T;
    protected reqdAttr: string[] = [];
    public selected: Selected;
    public usageArray = [];
    public showUsageCard = false;

    protected constructor(public bs: BasketService, datasource: T) {
        this.dataSource = datasource;
    }

    delete(entity: U): void {
        const idAttrNames = this.dataSource['indexAttr'] as string[];
        const args = [] as string[];
        for (let i = 0; i < idAttrNames.length; i++) {
            args[i] = entity[idAttrNames[i]] as string;
        }
        const fullPath = this.dataSource.fullPath(...args);
        console.log('Full path', fullPath, ...args);
        const ucMap = new Map<string, string>();
        if (this.reqdAttr.length > 0) {
            ucMap.set(`/${fullPath}`, this.reqdAttr.join(','));
        }
        this.bs.deleteIndexedEntry(
            `/${fullPath}`,
            idAttrNames[idAttrNames.length - 1],
            args[args.length - 1], // last one
            ucMap
        );
        entity[FORDELETE] = STRIKETHROUGH;
    }

    showUsage(id: string, enterprise?: string, site?: string): void {
        this.selected = { id, enterprise, site } as Selected;
        this.showUsageCard = true;
    }

    closeShowParentCard(): void {
        this.showUsageCard = false;
    }
}
