/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { OpenPolicyAgentService } from 'src/app/open-policy-agent.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Service as AetherService } from '../../../openapi3/aether/4.0.0/services';
import { AETHER_TARGETS } from '../../../environments/environment';
import { BasketService, ORIGINAL, TYPE } from '../../basket.service';
import { RocListBase } from '../../roc-list-base';
import { VcsDatasource } from './vcs-datasource';
import { VcsVcs } from '../../../openapi3/aether/4.0.0/models';
import { HexPipe } from '../../utils/hex.pipe';
import { from, Observable } from 'rxjs';
import { map, mergeMap, skipWhile } from 'rxjs/operators';

@Component({
    selector: 'aether-vcs',
    templateUrl: './vcs.component.html',
    styleUrls: ['../../common-profiles.component.scss'],
})
export class VcsComponent
    extends RocListBase<VcsDatasource>
    implements AfterViewInit
{
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<VcsVcs>;
    sdAsInt = HexPipe.hexAsInt;
    deletedVCS = [];

    displayedColumns = [
        'id',
        'description',
        'enterprise',
        'site',
        'filter',
        'default-behavior',
        'slice',
        'device-group',
        'sd',
        'sst',
        'upf',
        'edit',
        'delete',
        'monitor',
    ];

    constructor(
        public opaService: OpenPolicyAgentService,
        private aetherService: AetherService,
        private basketService: BasketService
    ) {
        super(
            basketService,
            new VcsDatasource(aetherService, basketService, AETHER_TARGETS[0]),
            'vcs-4.0.0',
            'vcs'
        );
        super.reqdAttr = [
            'sd',
            'sst',
            'enterprise',
            'site',
            'default-behavior',
        ];
    }

    onDataLoaded(ScopeOfDataSource): void {
        const basketPreview = ScopeOfDataSource.bs.buildPatchBody().Updates;
        if (
            'vcs-4.0.0' in basketPreview &&
            'vcs' in basketPreview['vcs-4.0.0']
        ) {
            basketPreview['vcs-4.0.0'].vcs.forEach((basketItems) => {
                ScopeOfDataSource.data.forEach((listItem, listItemCount) => {
                    if (basketItems.id === listItem.id) {
                        if (basketItems['display-name']) {
                            ScopeOfDataSource.data[listItemCount][
                                'display-name'
                            ] = basketItems['display-name'];
                        }
                        if (basketItems.description) {
                            ScopeOfDataSource.data[listItemCount].description =
                                basketItems.description;
                        }
                        if (basketItems.filter) {
                            if (
                                ScopeOfDataSource.data[listItemCount].filter
                                    .length === 0
                            ) {
                                ScopeOfDataSource.data[
                                    listItemCount
                                ].filter.application =
                                    basketItems.filter.application;
                                ScopeOfDataSource.data[
                                    listItemCount
                                ].filter.priority = basketItems.filter.priority;
                            } else {
                                for (const eachBasketApp of basketItems.filter) {
                                    let eachAppPosition = 0;
                                    for (const eachScopeaApp of ScopeOfDataSource
                                        .data[listItemCount].filter) {
                                        if (
                                            eachBasketApp.filter.application ===
                                            eachScopeaApp.filter.application
                                        ) {
                                            ScopeOfDataSource.data[
                                                listItemCount
                                            ].filter.application[
                                                eachAppPosition
                                            ].enabled =
                                                eachBasketApp.filter.enabled;
                                            ScopeOfDataSource.data[
                                                listItemCount
                                            ].filter.application[
                                                eachAppPosition
                                            ].priority =
                                                eachBasketApp.filter.priority;
                                        }
                                        eachAppPosition++;
                                    }
                                }
                            }
                        }
                        if (basketItems.slice && basketItems.slice.mbr) {
                            ScopeOfDataSource.data[
                                listItemCount
                            ].slice.mbr.uplink = basketItems.slice.mbr.uplink;
                            ScopeOfDataSource.data[
                                listItemCount
                            ].slice.mbr.downlink =
                                basketItems.slice.mbr.downlink;
                        }
                        if (basketItems['default-behavior']) {
                            ScopeOfDataSource.data[listItemCount][
                                'default-behavior'
                            ] = basketItems['default-behavior'];
                        }
                        if (basketItems.enterprise) {
                            ScopeOfDataSource.data[listItemCount].enterprise =
                                basketItems.enterprise;
                        }
                        if (basketItems.site) {
                            ScopeOfDataSource.data[listItemCount]['site'] =
                                basketItems['site'];
                        }
                        if (basketItems.sst) {
                            ScopeOfDataSource.data[listItemCount].sst =
                                basketItems.sst;
                        }
                        if (basketItems.sd) {
                            ScopeOfDataSource.data[listItemCount].sd =
                                basketItems.sd;
                        }
                        if (basketItems['device-group']) {
                            if (
                                ScopeOfDataSource.data[listItemCount][
                                    'device-group'
                                ].length === 0
                            ) {
                                ScopeOfDataSource.data[listItemCount][
                                    'device-group'
                                ] = basketItems['device-group'];
                            } else {
                                for (const eachBasketDg of basketItems[
                                    'device-group'
                                ]) {
                                    let eachCSPosition = 0;
                                    for (const eachScopeadg of ScopeOfDataSource
                                        .data[listItemCount]['device-group']) {
                                        if (
                                            eachBasketDg['device-group'] ===
                                            eachScopeadg['device-group']
                                        ) {
                                            ScopeOfDataSource.data[
                                                listItemCount
                                            ]['device-group'][
                                                eachCSPosition
                                            ].enabled = eachBasketDg.enabled;
                                        }
                                        eachCSPosition++;
                                    }
                                }
                            }
                        }
                        if (basketItems.upf) {
                            ScopeOfDataSource.data[listItemCount].upf =
                                basketItems.upf;
                        }
                    }
                });
            });
        }
    }
    checkForDeletedVcs(): void {
        const DeletesBasketPreview =
            this.basketService.buildPatchBody().Deletes;
        if (
            'vcs-4.0.0' in DeletesBasketPreview &&
            'vcs' in DeletesBasketPreview['vcs-4.0.0']
        ) {
            this.deletedVCS = DeletesBasketPreview['vcs-4.0.0'].vcs.map(
                (DeletedVCSID) => DeletedVCSID.id
            );
        }
    }

    deleteVCS(id: string): void {
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
        this.checkForDeletedVcs();
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.checkForDeletedVcs();
        this.table.dataSource = this.dataSource;
        this.dataSource.loadData(
            this.aetherService.getVcs({
                target: AETHER_TARGETS[0],
            }),
            this.onDataLoaded
        );
    }
}
