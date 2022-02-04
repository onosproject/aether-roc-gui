/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Service as AetherService } from '../../../openapi3/aether/2.0.0/services/service';
import { BasketService } from '../../basket.service';
import { OpenPolicyAgentService } from '../../open-policy-agent.service';
import { AETHER_TARGETS } from '../../../environments/environment';
import { RocListBase } from '../../roc-list-base';
import { ApplicationDatasource } from './application-datasource';
import * as _ from 'lodash';
import { EnterpriseEnterpriseApplication } from '../../../openapi3/aether/2.0.0/models/enterprise-enterprise-application';

@Component({
    selector: 'aether-application',
    templateUrl: './application.component.html',
    styleUrls: ['../../common-profiles.component.scss'],
})
export class ApplicationComponent
    extends RocListBase<ApplicationDatasource>
    implements AfterViewInit
{
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<EnterpriseEnterpriseApplication>;
    displayedColumns = [
        'id',
        'description',
        'enterprise',
        'address',
        'Endpoint',
        'edit',
        'Usage/delete',
    ];

    constructor(
        private aetherService: AetherService,
        private basketService: BasketService,
        public opaService: OpenPolicyAgentService
    ) {
        super(
            basketService,
            new ApplicationDatasource(
                aetherService,
                basketService,
                AETHER_TARGETS[0]
            ),
            'Enterprises-2.0.0',
            'application'
        );
        super.reqdAttr = ['enterprise', 'address'];
    }

    onDataLoaded(ScopeOfDataSource): void {
        const basketPreview = ScopeOfDataSource.bs.buildPatchBody().Updates;
        this.usageArray = [];
        /* Needs work*/
        // this.aetherService
        //     .getVcs({
        //         target: AETHER_TARGETS[0],
        //     })
        //     .subscribe((displayData) => {
        //         this.usageArray = this.usageArray.concat(
        //             _.differenceWith(
        //                 ScopeOfDataSource.data,
        //                 displayData.slice,
        //                 function (ScopeOfDataSourceObject, displayDataObject) {
        //                     return _.findIndex(
        //                         displayDataObject.filter,
        //                         (filterElement) => {
        //                             return (
        //                                 filterElement.application ==
        //                                 ScopeOfDataSourceObject.id
        //                             );
        //                         }
        //                     ) !== -1
        //                         ? true
        //                         : false;
        //                 }
        //             )
        //         );
        //     });
        if (
            this.pathRoot in basketPreview &&
            'application' in basketPreview[this.pathRoot]
        ) {
            ScopeOfDataSource.merge(
                basketPreview['Application-2.0.0'].application,
                [{ fieldName: 'endpoint', idAttr: 'endpoint-id' }]
            );
        }
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
        this.dataSource.loadData(
            this.aetherService.getApplication({
                target: AETHER_TARGETS[0],
            }),
            this.onDataLoaded.bind(this)
        );

        // console.log(
        // this.aetherService
        //     .getApplication({
        //         target: AETHER_TARGETS[0],
        //     })
        //     .subscribe((x) => console.log(x, 'output------'));
    }
}
