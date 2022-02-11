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
import { AETHER_TARGETS } from '../../../environments/environment';
import { BasketService } from '../../basket.service';
import { RocListBase } from '../../roc-list-base';
import { UpfDatasource } from './upf-datasource';
import * as _ from 'lodash';
import { EnterpriseEnterpriseSiteUpf } from '../../../openapi3/aether/2.0.0/models/enterprise-enterprise-site-upf';
import { RocElement } from '../../../openapi3/top/level/models/elements';

@Component({
    selector: 'aether-upf',
    templateUrl: './upf.component.html',
    styleUrls: ['../../common-profiles.component.scss'],
})
export class UpfComponent
    extends RocListBase<UpfDatasource>
    implements AfterViewInit
{
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<EnterpriseEnterpriseSiteUpf>;

    displayedColumns = [
        'id',
        'description',
        'enterprise',
        'site',
        'address',
        'config-endpoint',
        'port',
        'edit',
        'usage/delete',
        'monitor',
    ];

    constructor(
        public opaService: OpenPolicyAgentService,
        private aetherService: AetherService,
        private basketService: BasketService
    ) {
        super(
            basketService,
            new UpfDatasource(aetherService, basketService, AETHER_TARGETS[0]),
            'Enterprises-2.0.0',
            'upf'
        );
        super.reqdAttr = ['enterprise', 'port', 'address', 'site'];
    }

    onDataLoaded(ScopeOfDataSource: UpfDatasource): void {
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
        //                     return (
        //                         ScopeOfDataSourceObject.id ===
        //                         displayDataObject.upf
        //                     );
        //                 }
        //             )
        //         );
        //     });
        if (
            this.pathRoot in basketPreview &&
            'upf' in basketPreview[this.pathRoot]
        ) {
            ScopeOfDataSource.merge(basketPreview['Upf-2.0.0'].upf);
        }
    }

    deleteUpf(id: string, enterpriseID: string, siteID: string): void {
        this.pathRoot = ('Enterprises-2.0.0/enterprise' +
            '[enterprise-id=' +
            enterpriseID +
            '[site-id=' +
            siteID +
            ']') as RocElement;
        this.delete(id);
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
        this.dataSource.loadData(
            this.aetherService.getUpf({
                target: AETHER_TARGETS[0],
            }),
            this.onDataLoaded.bind(this)
        );
    }
}
