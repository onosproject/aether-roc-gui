/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { OpenPolicyAgentService } from 'src/app/open-policy-agent.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Service as AetherService } from '../../../openapi3/aether/2.0.0/services';
import { AETHER_TARGET } from '../../../environments/environment';
import { BasketService } from '../../basket.service';
import { RocListBase } from '../../roc-list-base';
import { SiteDatasource } from './site-datasource';
import * as _ from 'lodash';
import { EnterprisesEnterpriseSite } from '../../../openapi3/aether/2.0.0/models';

@Component({
    selector: 'aether-site',
    templateUrl: './site.component.html',
    styleUrls: ['../../common-profiles.component.scss'],
})
export class SiteComponent
    extends RocListBase<SiteDatasource, EnterprisesEnterpriseSite>
    implements AfterViewInit
{
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<EnterprisesEnterpriseSite>;

    displayedColumns = [
        'id',
        'description',
        'enterprise',
        'small-cells',
        'slices',
        'device-groups',
        'ip-domains',
        'upfs',
        'devices',
        'sim-cards',
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
            new SiteDatasource(aetherService, basketService, AETHER_TARGET)
        );
    }

    onDataLoaded(ScopeOfDataSource: SiteDatasource): void {
        /* TODO: Needs work*/
        // const basketPreview = ScopeOfDataSource.bs.buildPatchBody().Updates;
        // this.usageArray = [];
        // this.aetherService
        //     .getDeviceGroup({
        //         target: AETHER_TARGET,
        //     })
        //     .subscribe((displayData) => {
        //         this.usageArray = this.usageArray.concat(
        //             _.differenceWith(
        //                 ScopeOfDataSource.data,
        //                 displayData['device-group'],
        //                 function (ScopeOfDataSourceObject, displayDataObject) {
        //                     return (
        //                         ScopeOfDataSourceObject.id ===
        //                         displayDataObject.site
        //                     );
        //                 }
        //             )
        //         );
        //         this.aetherService
        //             .getVcs({
        //                 target: AETHER_TARGET,
        //             })
        //             .subscribe((displayData) => {
        //                 this.usageArray = this.usageArray.concat(
        //                     _.differenceWith(
        //                         this.usageArray,
        //                         displayData.slice,
        //                         function (
        //                             ScopeOfDataSourceObject,
        //                             displayDataObject
        //                         ) {
        //                             return (
        //                                 ScopeOfDataSourceObject.id ===
        //                                 displayDataObject.site
        //                             );
        //                         }
        //                     )
        //                 );
        //                 this.aetherService
        //                     .getUpf({
        //                         target: AETHER_TARGET,
        //                     })
        //                     .subscribe((displayData) => {
        //                         this.usageArray = this.usageArray.concat(
        //                             _.differenceWith(
        //                                 this.usageArray,
        //                                 displayData.upf,
        //                                 function (
        //                                     ScopeOfDataSourceObject,
        //                                     displayDataObject
        //                                 ) {
        //                                     return (
        //                                         ScopeOfDataSourceObject.id ===
        //                                         displayDataObject.site
        //                                     );
        //                                 }
        //                             )
        //                         );
        //                     });
        //             });
        //     });
        // if (
        //     this.pathRoot in basketPreview &&
        //     'site' in basketPreview[this.pathRoot]
        // ) {
        //     ScopeOfDataSource.merge(basketPreview['Site-2.0.0'].site, [
        //         { fieldName: 'small-cell', idAttr: 'small-cell-id' },
        //     ]);
        // }
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
        this.dataSource.loadData(
            this.aetherService.getEnterprises({
                target: AETHER_TARGET,
            }),
            this.onDataLoaded.bind(this)
        );
    }
}
