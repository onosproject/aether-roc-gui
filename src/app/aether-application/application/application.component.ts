/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Service as AetherService } from '../../../openapi3/aether/2.0.0/services';
import { BasketService } from '../../basket.service';
import { OpenPolicyAgentService } from '../../open-policy-agent.service';
import { AETHER_TARGET } from '../../../environments/environment';
import { RocListBase } from '../../roc-list-base';
import { ApplicationDatasource } from './application-datasource';
import {
    Enterprises,
    EnterprisesEnterprise,
    EnterprisesEnterpriseApplication,
    EnterprisesEnterpriseTemplate,
} from '../../../openapi3/aether/2.0.0/models';
import { RocElement } from '../../../openapi3/top/level/models/elements';
import { from, Observable } from 'rxjs';
import { RocDataSource } from '../../roc-data-source';
import { map, mergeMap, skipWhile } from 'rxjs/operators';

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
    @ViewChild(MatTable) table: MatTable<EnterprisesEnterpriseApplication>;
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
                AETHER_TARGET
            ),
            'Enterprises-2.0.0',
            'application'
        );
        super.reqdAttr = ['address'];
    }

    onDataLoaded(ScopeOfDataSource): void {
        const basketPreview = ScopeOfDataSource.bs.buildPatchBody().Updates;
        this.usageArray = [];
        /* Needs work*/
        // this.aetherService
        //     .getVcs({
        //         target: AETHER_TARGET,
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
                basketPreview['Enterprises-2.0.0'].application,
                [{ fieldName: 'endpoint', idAttr: 'endpoint-id' }]
            );
        }
    }

    deleteApplication(id: string, enterpriseID: string): void {
        this.pathRoot = ('Enterprises-2.0.0/enterprise' +
            '[enterprise-id=' +
            enterpriseID +
            ']') as RocElement;
        this.delete(id);
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

        // console.log(
        // this.aetherService
        //     .getApplication({
        //         target: AETHER_TARGET,
        //     })
        //     .subscribe((x) => console.log(x, 'output------'));
    }
}
