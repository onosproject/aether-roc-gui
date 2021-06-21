/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { OpenPolicyAgentService } from 'src/app/open-policy-agent.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {Service as AetherService} from '../../../openapi3/aether/3.0.0/services';
import {AETHER_TARGETS} from '../../../environments/environment';
import {BasketService, ORIGINAL, TYPE} from '../../basket.service';
import {RocListBase} from '../../roc-list-base';
import { VcsDatasource } from './vcs-datasource';
import { VcsVcs} from '../../../openapi3/aether/3.0.0/models';


@Component({
  selector: 'aether-vcs',
  templateUrl: './vcs.component.html',
  styleUrls: ['../../common-profiles.component.scss']
})
export class VcsComponent extends RocListBase<VcsDatasource> implements AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<VcsVcs>;

  displayedColumns = [
    'id',
    'description',
    'application',
    'downlink/uplink',
    'ap',
    'device-group',
    'sd',
    'sst',
    'template',
    'traffic-class',
    'upf',
    'edit',
    'delete'
];
constructor(
  public opaService: OpenPolicyAgentService,
  private aetherService: AetherService,
  private basketService: BasketService,
) {
  super(new VcsDatasource(aetherService, basketService, AETHER_TARGETS[0]));
}

onDataLoaded(ScopeOfDataSource): void {
  const basketPreview = ScopeOfDataSource.bs.buildPatchBody().Updates;
  if ('vcs-3.0.0' in basketPreview && 'vcs' in basketPreview['vcs-3.0.0']) {
      basketPreview['vcs-3.0.0'].vcs.forEach((basketItems) => {
          ScopeOfDataSource.data.forEach((listItem, listItemCount) => {
              if (basketItems.id === listItem.id) {
                  if (basketItems['display-name']) {
                      ScopeOfDataSource.data[listItemCount]['display-name'] = basketItems['display-name'];
                  }
                  if (basketItems.description) {
                      ScopeOfDataSource.data[listItemCount].description = basketItems.description;
                  }
                  if (basketItems.application) {
                    if (ScopeOfDataSource.data[listItemCount].application.length === 0) {
                      ScopeOfDataSource.data[listItemCount].application = basketItems.application;
                  } else {
                      for (const eachBasketApp of basketItems.application) {
                          let eachCSPosition = 0;
                          for (const eachScopeaApp of ScopeOfDataSource.data[listItemCount].application){
                              if (eachBasketApp.application === eachScopeaApp.application){
                                  ScopeOfDataSource.data[listItemCount].application[eachCSPosition].enabled
                                  = eachBasketApp.enabled;
                              }
                              eachCSPosition++;
                          }
                      }
                  }
                }
                  if (basketItems.downlink) {
                    ScopeOfDataSource.data[listItemCount].downlink = basketItems.downlink;
                  }
                  if (basketItems.uplink) {
                    ScopeOfDataSource.data[listItemCount].uplink = basketItems.uplink;
                  }
                  if (basketItems.ap) {
                    ScopeOfDataSource.data[listItemCount].ap = basketItems.ap;
                  }
                  if (basketItems.sst) {
                    ScopeOfDataSource.data[listItemCount].sst = basketItems.sst;
                  }
                  if (basketItems.sd) {
                    ScopeOfDataSource.data[listItemCount].sd = basketItems.sd;
                  }
                  if (basketItems['device-group']) {
                    ScopeOfDataSource.data[listItemCount]['device-group'] = basketItems['device-group'];
                  }
                  if (basketItems.template) {
                    ScopeOfDataSource.data[listItemCount].template = basketItems.template;
                  }
                  if (basketItems['traffic-class']) {
                    ScopeOfDataSource.data[listItemCount]['traffic-class'] = basketItems['traffic-class'];
                  }
                  if (basketItems.upf) {
                    ScopeOfDataSource.data[listItemCount].upf = basketItems.upf;
                  }
              }
          });
      });
  }
}
ngAfterViewInit(): void {
  this.dataSource.sort = this.sort;
  this.dataSource.paginator = this.paginator;
  this.table.dataSource = this.dataSource;
  this.dataSource.loadData(this.aetherService.getVcs({
      target: AETHER_TARGETS[0]
  }), this.onDataLoaded);
}

}
