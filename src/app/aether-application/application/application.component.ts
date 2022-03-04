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
import { EnterprisesEnterpriseApplication } from '../../../openapi3/aether/2.0.0/models';

@Component({
    selector: 'aether-application',
    templateUrl: './application.component.html',
    styleUrls: ['../../common-profiles.component.scss'],
})
export class ApplicationComponent
    extends RocListBase<ApplicationDatasource, EnterprisesEnterpriseApplication>
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

    modelPath = [
        'Enterprises-2.0.0',
        'enterprise',
        'application',
        'application-id',
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
            )
        );
        super.reqdAttr = ['address'];
    }

    onDataLoaded(): void {
        this.dataSource.merge(
            this.bs.buildPatchBody().Updates,
            this.dataSource.data,
            this.modelPath,
            [{ fieldName: 'endpoint', idAttr: 'endpoint-id' }]
        );
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
