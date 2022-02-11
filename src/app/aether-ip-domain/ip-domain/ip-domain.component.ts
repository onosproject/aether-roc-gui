/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { RocListBase } from '../../roc-list-base';
import { IpDomainDatasource } from './ip-domain-datasource';
import { Service as AetherService } from '../../../openapi3/aether/2.0.0/services/service';
import { BasketService } from '../../basket.service';
import { OpenPolicyAgentService } from '../../open-policy-agent.service';
import { AETHER_TARGETS } from '../../../environments/environment';
import * as _ from 'lodash';
import { EnterpriseEnterpriseSiteIpDomain } from '../../../openapi3/aether/2.0.0/models/enterprise-enterprise-site-ip-domain';
import { RocElement } from '../../../openapi3/top/level/models/elements';

@Component({
    selector: 'aether-ip-domain',
    templateUrl: './ip-domain.component.html',
    styleUrls: ['../../common-profiles.component.scss'],
})
export class IpDomainComponent
    extends RocListBase<IpDomainDatasource>
    implements AfterViewInit
{
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<EnterpriseEnterpriseSiteIpDomain>;

    displayedColumns = [
        'id',
        'description',
        'enterprise',
        'dns',
        'subnet',
        'admin-status',
        'mtu',
        'dnn',
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
            new IpDomainDatasource(
                aetherService,
                basketService,
                AETHER_TARGETS[0]
            ),
            'Enterprises-2.0.0',
            'ip-domain'
        );
        super.reqdAttr = ['enterprise', 'subnet', 'dnn'];
    }

    onDataLoaded(ScopeOfDataSource: IpDomainDatasource): void {
        const basketPreview = ScopeOfDataSource.bs.buildPatchBody().Updates;
        this.usageArray = [];
        /* Needs work*/
        // this.aetherService
        //     .getDeviceGroup({
        //         target: AETHER_TARGETS[0],
        //     })
        //     .subscribe((displayData) => {
        //         this.usageArray = this.usageArray.concat(
        //             _.differenceWith(
        //                 ScopeOfDataSource.data,
        //                 displayData['device-group'],
        //                 function (ScopeOfDataSourceObject, displayDataObject) {
        //                     return (
        //                         ScopeOfDataSourceObject.id ===
        //                         displayDataObject['ip-domain']
        //                     );
        //                 }
        //             )
        //         );
        //     });
        if (
            this.pathRoot in basketPreview &&
            'ip-domain' in basketPreview[this.pathRoot]
        ) {
            ScopeOfDataSource.merge(
                basketPreview['Ip-domain-2.0.0']['ip-domain']
            );
        }
    }

    deleteIpDoamin(id: string, enterpriseID: string, siteID: string): void {
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
            this.aetherService.getIpDomain({
                target: AETHER_TARGETS[0],
            }),
            this.onDataLoaded.bind(this)
        );
    }
}
