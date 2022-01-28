/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectivityServiceComponent } from './connectivity-service/connectivity-service.component';
import { ApiModule as ApiModuleAether } from '../../openapi3/aether/2.0.0/api.module';
import { AETHER_ROC_API_URL } from '../../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AuthInterceptor } from '../auth-interceptor';
import { API_INTERCEPTOR_PROVIDER } from '../aether.module';
import { ConnectivityServiceEditComponent } from './connectivity-service-edit/connectivity-service-edit.component';
import { MatCardModule } from '@angular/material/card';
import {
    MAT_FORM_FIELD_DEFAULT_OPTIONS,
    MatFormFieldModule,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UtilsModule } from '../utils/utils.module';
import { ShowEnterpriseUsageComponent } from './show-enterpirse-usage/show-enterprise-usage.component';

@NgModule({
    declarations: [
        ConnectivityServiceComponent,
        ConnectivityServiceEditComponent,
        ShowEnterpriseUsageComponent,
    ],
    imports: [
        CommonModule,
        ApiModuleAether.forRoot({ rootUrl: AETHER_ROC_API_URL }),
        HttpClientModule,
        RouterModule.forChild([
            { path: 'connectivity', component: ConnectivityServiceComponent },
            {
                path: 'connectivity-edit/:id',
                component: ConnectivityServiceEditComponent,
            },
            {
                path: '',
                component: ConnectivityServiceComponent,
                pathMatch: 'full',
            },
        ]),
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatToolbarModule,
        MatCardModule,
        MatButtonModule,
        MatSnackBarModule,
        UtilsModule,
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
export class AetherConnectivityServiceModule {}
