/*
 * SPDX-FileCopyrightText: 2022-present Intel Corporation
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DhcpServerComponent } from './dhcp-server/dhcp-server.component';
import { ApiModule as ApiModuleFabric } from '../../openapi3/sdn-fabric/0.1.0/api.module';
import { AETHER_ROC_API_URL } from '../../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CdkTableModule } from '@angular/cdk/table';
import { UtilsModule } from '../utils/utils.module';
import {
    MAT_FORM_FIELD_DEFAULT_OPTIONS,
    MatFormFieldModule,
} from '@angular/material/form-field';
import { AuthInterceptor } from '../auth-interceptor';
import { API_INTERCEPTOR_PROVIDER } from '../aether.module';
import { MatButtonModule } from '@angular/material/button';
import { ShowSwitchUsageComponent } from './show-switch-usage/show-switch-usage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { DhcpServerEditComponent } from './dhcp-server-edit/dhcp-server-edit.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
    declarations: [
        DhcpServerComponent,
        ShowSwitchUsageComponent,
        DhcpServerEditComponent,
    ],
    imports: [
        CommonModule,
        ApiModuleFabric.forRoot({ rootUrl: AETHER_ROC_API_URL }),
        HttpClientModule,
        RouterModule.forChild([
            { path: 'dhcp-server', component: DhcpServerComponent },
            {
                path: 'dhcp-server-edit/:fabric-id/:id',
                component: DhcpServerEditComponent,
            },
            { path: '', component: DhcpServerComponent, pathMatch: 'full' },
        ]),
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatSnackBarModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        CdkTableModule,
        UtilsModule,
        MatDividerModule,
    ],
    providers: [
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: { appearance: 'standard' },
        },
        AuthInterceptor,
        API_INTERCEPTOR_PROVIDER,
    ],
})
export class FabricDhcpServerModule {}
