import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { RocListBase } from '../../roc-list-base';
import { SimCardDatasource } from './sim-card-datasource';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { EnterprisesEnterpriseSiteSimCard } from '../../../openapi3/aether/2.0.0/models/enterprises-enterprise-site-sim-card';
import { OpenPolicyAgentService } from '../../open-policy-agent.service';
import { Service as AetherService } from '../../../openapi3/aether/2.0.0/services/service';
import { BasketService } from '../../basket.service';
import { AETHER_TARGET } from '../../../environments/environment';
import { RocElement } from '../../../openapi3/top/level/models/elements';

@Component({
    selector: 'aether-sim-card',
    templateUrl: './sim-card.component.html',
    styleUrls: ['../../common-profiles.component.scss'],
})
export class SimCardComponent
    extends RocListBase<SimCardDatasource>
    implements AfterViewInit
{
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<EnterprisesEnterpriseSiteSimCard>;

    displayedColumns = [
        'id',
        'description',
        'enterprise',
        'site',
        'iccid',
        'imsi',
        'edit',
        'usage/delete',
    ];

    constructor(
        public opaService: OpenPolicyAgentService,
        private aetherService: AetherService,
        private basketService: BasketService
    ) {
        super(
            basketService,
            new SimCardDatasource(aetherService, basketService, AETHER_TARGET),
            'Enterprises-2.0.0',
            'sim-card'
        );
    }

    onDataLoaded(ScopeOfDataSource: SimCardDatasource): void {
        const basketPreview = ScopeOfDataSource.bs.buildPatchBody().Updates;
        this.usageArray = [];

        if (
            this.pathRoot in basketPreview &&
            'sim-card' in basketPreview[this.pathRoot]
        ) {
            ScopeOfDataSource.merge(basketPreview['SimCard-2.0.0']['sim-card']);
        }
    }

    deleteSimCard(id: string, enterpriseID: string, siteID: string): void {
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
            this.aetherService.getEnterprises({
                target: AETHER_TARGET,
            }),
            this.onDataLoaded.bind(this)
        );
    }
}
