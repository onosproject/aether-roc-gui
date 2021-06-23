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
import {AETHER_ROC_API_URL} from '../../environments/environment';
import {AuthInterceptor} from '../auth-interceptor';
import {API_INTERCEPTOR_PROVIDER} from '../aether.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import { PanelVcsComponent } from './panel-vcs/panel-vcs.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {HttpClientModule} from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import { SafePipe } from './safe.pipe';
import {ResizeService} from './resize.service';

@NgModule({
    declarations: [DashboardComponent, PanelVcsComponent, SafePipe],
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
        MatIconModule
    ],
    providers: [
        AuthInterceptor,
        API_INTERCEPTOR_PROVIDER,
        ResizeService,
    ]
})
export class DashboardModule {
}
