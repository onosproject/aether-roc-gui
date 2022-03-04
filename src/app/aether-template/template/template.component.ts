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
import { TemplateDatasource } from './template-datasource';
import { HexPipe } from '../../utils/hex.pipe';
import { EnterprisesEnterpriseTemplate } from '../../../openapi3/aether/2.0.0/models';

@Component({
    selector: 'aether-template',
    templateUrl: './template.component.html',
    styleUrls: ['../../common-profiles.component.scss'],
})
export class TemplateComponent
    extends RocListBase<TemplateDatasource, EnterprisesEnterpriseTemplate>
    implements AfterViewInit
{
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<EnterprisesEnterpriseTemplate>;
    sdAsInt = HexPipe.hexAsInt;

    displayedColumns = [
        'id',
        'description',
        'enterprise',
        'sd',
        'sst',
        'default-behavior',
        'mbr',
        'burst',
        'edit',
        'delete',
    ];

    modelPath = ['Enterprises-2.0.0', 'enterprise', 'template', 'template-id'];

    constructor(
        public opaService: OpenPolicyAgentService,
        private aetherService: AetherService,
        private basketService: BasketService
    ) {
        super(
            basketService,
            new TemplateDatasource(aetherService, basketService, AETHER_TARGET)
        );
        super.reqdAttr = ['default-behavior'];
    }

    onDataLoaded(ScopeOfDataSource: TemplateDatasource): void {
        this.dataSource.merge(
            this.bs.buildPatchBody().Updates,
            this.dataSource.data,
            this.modelPath
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
    }
}
