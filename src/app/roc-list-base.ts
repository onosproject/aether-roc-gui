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
import { TargetName } from '../openapi3/top/level/models';

interface Selected {
    id: string;
    enterprise: TargetName;
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
    protected reqdParentAttr: string[] = [];
    public selected: Selected;
    public showUsageCard = false;

    // identifies the location of the model in the gNMI tree
    public modelPath = [];

    protected constructor(
        public bs: BasketService,
        datasource: T,
        protected targetAttribute = 'enterprise-id'
    ) {
        this.dataSource = datasource;
    }

    delete(entity: U): void {
        const idAttrNames = this.dataSource['indexAttr'] as string[];
        const args = [] as string[];
        for (let i = 0; i < idAttrNames.length; i++) {
            args[i] = entity[idAttrNames[i]] as string;
        }

        const fullPath = this.dataSource.fullPath(
            entity[this.targetAttribute],
            ...args
        );
        console.log('Full path', fullPath, ...args);
        const ucMap = new Map<string, string>();
        if (this.reqdAttr.length > 0) {
            ucMap.set(`/${fullPath}`, this.reqdAttr.join(','));
        }
        const ucParentMap = new Map<string, string>();
        if (this.reqdParentAttr.length > 0) {
            const parentPath = fullPath.slice(0, fullPath.lastIndexOf('/'));
            ucParentMap.set(`/${parentPath}`, this.reqdParentAttr.join(','));
        }
        this.bs.deleteIndexedEntry(
            `/${fullPath}`,
            idAttrNames[idAttrNames.length - 1],
            args[args.length - 1], // last one
            ucMap,
            'string',
            ucParentMap
        );
        entity[FORDELETE] = STRIKETHROUGH;
    }

    showUsage(id: string, enterprise?: string, site?: string): void {
        const ent = { name: enterprise } as TargetName;
        this.selected = { id, enterprise: ent, site } as Selected;
        this.showUsageCard = true;
    }

    closeShowParentCard(): void {
        this.showUsageCard = false;
    }
}
