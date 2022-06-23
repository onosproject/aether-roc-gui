/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BasketService, FORDELETE, STRIKETHROUGH } from './basket.service';
import { from, merge, Observable, of as observableOf } from 'rxjs';
import { map, mergeMap, skipWhile } from 'rxjs/operators';
import * as _ from 'lodash';
import { Elements } from '../openapi3/top/level/models';
import { TargetName } from '../openapi3/top/level/models';
import { EnterpriseService } from './enterprise.service';

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
export function compare(
    a: string | number,
    b: string | number,
    isAsc: boolean
): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

// eg: EnterprisesEnterpriseSiteSlice
export interface RocGenericModelType {
    // id: string;
    description?: string;
}

// eg: Vcs
export interface RocGenericContainerType {
    toString(): string;
}

export interface GenericRocDataSource<
    T extends RocGenericModelType,
    U extends RocGenericContainerType
> {
    connect(): Observable<T[]>;

    disconnect(): void;

    loadData(
        dataSourceObservable: Observable<U>,
        onDataLoaded: (dataSourceThisScope: RocDataSource<T, U>) => void
    ): void;

    fullPath(enterpriseId: string, ...ids: string[]): string;

    deletePath(enterpriseId: string, ...ids: string[]): string;
}

// RocDataSource is an abstract class that extends data source
// T is the type of list item e.g. ConnectivityServicesConnectivityService
// U is the type of its parent e.g. ConnectivityService
export abstract class RocDataSource<T, U>
    extends DataSource<T>
    implements GenericRocDataSource<T, U>
{
    public data: Array<T> = [];
    paginator: MatPaginator;
    sort: MatSort;

    protected constructor(
        public bs: BasketService,
        protected enterpriseService: EnterpriseService,
        /** @deprecated */
        protected pathRoot: string, // TODO remove use modelPath
        /** @deprecated */
        protected pathListAttr: string[], // TODO remove use modelPath
        /** @deprecated */
        public indexAttr: string[], // TODO remove use modelPath
        protected nameAttr: string = 'display-name',
        protected descAttr: string = 'description',
        protected targetAttribute = 'enterprise-id'
    ) {
        super();
    }

    /**
     * Connect this data source to the table. The table will only update when
     * the returned stream emits new items.
     * @returns A stream of the items to be rendered.
     */
    connect(): Observable<T[]> {
        // Combine everything that affects the rendered data into one update
        // stream for the data-table to consume.
        const dataMutations = [
            observableOf(this.data),
            this.paginator.page,
            this.sort.sortChange,
        ];

        return merge(...dataMutations).pipe(
            map(() => {
                return this.getPagedData(this.getSortedData([...this.data]));
            })
        );
    }

    /**
     *  Called when the table is being destroyed. Use this function, to clean up
     * any open connections or free any held resources that were set up during connect.
     */
    disconnect(): void {
        console.log('disconnect');
    }

    private getPagedData(data: T[]): T[] {
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        return data.splice(startIndex, this.paginator.pageSize);
    }

    /**
     * Sort the data (client-side). If you're using server-side sorting,
     * this would be replaced by requesting the appropriate data from the server.
     */
    getSortedData(data: T[]): T[] {
        if (!this.sort.active || this.sort.direction === '') {
            return data.sort((a, b) => {
                return compare(a[this.nameAttr], b[this.nameAttr], true);
            });
        }
        return data.sort((a, b) => {
            const isAsc = this.sort.direction === 'asc';
            switch (this.sort.active) {
                case 'description':
                    return compare(+a[this.descAttr], +b[this.descAttr], isAsc);
                case 'id':
                    return compare(+a[this.nameAttr], +b[this.nameAttr], isAsc);
                default:
                    return 0;
            }
        });
    }

    loadData(
        dataSourceObservable: Observable<U>,
        onDataLoaded: (dataSourceThisScope: RocDataSource<T, U>) => void,
        enterpriseId?: TargetName
    ): void {
        console.log('loading data for', this.pathListAttr);
        dataSourceObservable
            .pipe(
                map((x) => x?.[this.pathListAttr[0]]),
                skipWhile((x) => x === undefined),
                mergeMap((items: T[]) => from(items))
            )
            .subscribe(
                (value) => {
                    const fullPath = this.deletePath(value['enterprise-id']);
                    if (this.bs.containsDeleteEntry(fullPath)) {
                        value[FORDELETE] = STRIKETHROUGH;
                    }
                    this.data.push(value);
                },
                (error) => {
                    console.warn(
                        'Error getting data from ',
                        enterpriseId,
                        error
                    );
                },
                () => {
                    // table.refreshRows() does not seem to work - using this trick instead
                    // const basketPreview = this.bs.buildPatchBody().Updates;
                    onDataLoaded(this);
                    this.paginator._changePageSize(this.paginator.pageSize);
                }
            );
    }

    /**
     * Iterates over items updated in the basket and merge them with the existing data
     * @param basket: the entire content of the basket
     * @param nestedLists: a list of object that specify the nested attributes of a model with their IDs, see Vcs component for an example
     */
    merge(
        basketData: Elements,
        models: T[],
        modelPath: string[],
        nestedLists: { fieldName: string; idAttr: string }[] = []
    ): void {
        if (_.isNil(modelPath) || modelPath.length === 0) {
            console.error(
                `Configuration for modelPath is missing for models: `,
                models
            );
            throw new Error(`Configuration for modelPath is missing`);
        }

        this.data = models.map((m) => {
            const [hasUpdates, updatedModel] = this.hasUpdates(
                basketData,
                modelPath,
                m
            );
            if (hasUpdates) {
                console.log(
                    `Model ${
                        m[modelPath[modelPath.length - 1]]
                    } has updates, will update`
                );

                // iterate over the model fields and update them
                Object.keys(updatedModel).forEach((k) => {
                    if (_.isArray(updatedModel[k])) {
                        // if it's an array then use the nestedField list
                        // to identify the primary key and update or add the item

                        // get the nested object definition
                        const field = nestedLists.filter(
                            (f) => f.fieldName === k
                        )[0];

                        if (_.isNil(field)) {
                            console.error(
                                `Configuration for nested list is missing for model: `,
                                m
                            );
                            throw new Error(
                                `Configuration for nested list is missing`
                            );
                        }

                        // for each updated element in the nested list
                        updatedModel[k].forEach((_updated) => {
                            // find the existing one
                            const _existing = m[field.fieldName].filter(
                                (e) =>
                                    e[field.idAttr] === _updated[field.idAttr]
                            )[0];

                            if (!_existing) {
                                // if it does not exist, then it's a new item that was added
                                m[field.fieldName].push(_updated);
                            } else {
                                // update all the keys except the ID
                                Object.keys(_updated).forEach((_k) => {
                                    if (_k !== field.idAttr) {
                                        _existing[_k] = _updated[_k];
                                    }
                                });
                            }
                        });
                    } else if (_.isObject(updatedModel[k])) {
                        // if it's an object, merge the original values with the udpated values
                        // as keys might be added or left unchanged but not specified
                        m[k] = {
                            ...m[k],
                            ...updatedModel[k],
                        };
                    } else {
                        // if it's a plain value, just update it
                        m[k] = updatedModel[k];
                    }
                });

                // m = {
                //     ...m,
                //     ...updatedModel,
                // }
            }
            return m;
        });
    }

    private getElementInBasket(
        tree: Elements | [],
        keys: string[],
        model: T,
        level = 0
    ): T {
        let foundModel = null;
        if (_.isArray(tree)) {
            // if the content of this level of the tree is a list
            // then iterate over the elements till you find a matching ID
            tree.forEach((m) => {
                if (m[keys[level]]) {
                    if (keys.length - 1 == level) {
                        // we are the end of our search,
                        // match the key with the modelId and return
                        if (m[keys[level]] == model[keys[level]]) {
                            foundModel = m;
                            return;
                        }
                    } else {
                        // we are in the correct place,
                        // keep descending
                        foundModel = this.getElementInBasket(
                            m[keys[level]],
                            keys,
                            model,
                            level + 1
                        );
                    }
                }
            });
        } else {
            // else iterate over the keys
            Object.keys(tree).forEach((k) => {
                if (k == keys[level]) {
                    // we are in the correct place,
                    // keep descending
                    foundModel = this.getElementInBasket(
                        tree[k],
                        keys,
                        model,
                        level + 1
                    );
                }
            });
        }
        return foundModel;
    }

    // given a path to a model and a model instance
    // checks if there are updates in the basket
    // returns [hasUpdates, updatedModel]
    hasUpdates(
        basketData: Elements,
        modelPath: string[],
        model: T
    ): [boolean, T] {
        // descent into the basket tree till you find the model you are looking for
        const el = this.getElementInBasket(basketData, modelPath, model);
        return [!_.isNil(el), el];
    }

    fullPath(enterpriseId: string, ...ids: string[]): string {
        let fullPath = `${this.targetAttribute}/${enterpriseId}`;
        if (this.pathRoot) {
            fullPath = fullPath += `/${this.pathRoot}`;
        }
        for (let i = 0; i < this.pathListAttr.length; i++) {
            fullPath =
                fullPath += `/${this.pathListAttr[i]}[${this.indexAttr[i]}=${ids[i]}]`;
        }
        // For any multi-keyed lists there will be more ids
        for (
            let i = this.pathListAttr.length;
            i < this.indexAttr.length - 1;
            i++
        ) {
            fullPath = fullPath += `[${this.indexAttr[i]}=${ids[i]}]`;
        }

        return fullPath;
    }

    deletePath(enterpriseId: string, ...ids: string[]): string {
        return `/${this.fullPath(enterpriseId, ...ids)}/${
            this.indexAttr[this.indexAttr.length - 1]
        }`;
    }
}
