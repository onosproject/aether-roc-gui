/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RouterModule} from '@angular/router';
import {ApiModule as ApiModuleAether} from '../../openapi3/aether/3.0.0/api.module';
import {AETHER_ROC_API_URL, GRAFANA_PROXY} from '../../environments/environment';
import {AuthInterceptor} from '../auth-interceptor';
import {API_INTERCEPTOR_PROVIDER} from '../aether.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import { PanelVcsComponent } from './panel-vcs/panel-vcs.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {HttpClientModule} from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import {ResizeService} from './resize.service';
import { PanelAlertsComponent } from './panel-alerts/panel-alerts.component';
import {UtilsModule} from '../utils/utils.module';
import {MatExpansionModule} from '@angular/material/expansion';
import { AlertDetailComponent } from './alert-detail/alert-detail.component';
import {MatCardModule} from '@angular/material/card';

@NgModule({
    declarations: [DashboardComponent, PanelVcsComponent, PanelAlertsComponent, AlertDetailComponent],
    imports: [
        CommonModule,
        ApiModuleAether.forRoot({rootUrl: AETHER_ROC_API_URL}),
        HttpClientModule,
        RouterModule.forChild([
            {path: 'dashboard', component: DashboardComponent},
            {path: '', component: DashboardComponent, pathMatch: 'full'},
        ]),
        MatToolbarModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatIconModule,
        UtilsModule,
        MatExpansionModule,
        MatCardModule
    ],
    providers: [
        AuthInterceptor,
        API_INTERCEPTOR_PROVIDER,
        ResizeService,
        {provide: 'grafana_api_proxy', useValue: GRAFANA_PROXY},
    ]
})
export class DashboardModule {
}
