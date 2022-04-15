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
import { BasketService } from '../../basket.service';
import { RocListBase } from '../../roc-list-base';
import { TemplateDatasource } from './template-datasource';
import { HexPipe } from '../../utils/hex.pipe';
import { templateModelPath } from '../../models-info';
import { EnterpriseService } from '../../enterprise.service';
import { Template } from '../../../openapi3/aether/2.1.0/models';
import { TemplateService } from '../../../openapi3/aether/2.1.0/services';

@Component({
    selector: 'aether-template',
    templateUrl: './template.component.html',
    styleUrls: ['../../common-profiles.component.scss'],
})
export class TemplateComponent
    extends RocListBase<TemplateDatasource, Template>
    implements AfterViewInit
{
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<Template>;
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

    modelPath = ['template-2.1.0', 'template', 'template-id'];

    constructor(
        public opaService: OpenPolicyAgentService,
        protected enterpriseService: EnterpriseService,
        private templateService: TemplateService,
        private basketService: BasketService
    ) {
        super(
            basketService,
            new TemplateDatasource(enterpriseService, basketService)
        );
        super.reqdAttr = ['default-behavior'];
    }

    onDataLoaded(): void {
        this.dataSource.merge(
            this.bs.buildPatchBody().Updates,
            this.dataSource.data,
            templateModelPath
        );
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
        this.enterpriseService.enterprises.forEach((enterpriseId) => {
            this.dataSource.loadData(
                this.templateService.getTemplateList({
                    'enterprise-id': enterpriseId.name,
                }),
                this.onDataLoaded.bind(this),
                enterpriseId
            );
        });
    }
}
