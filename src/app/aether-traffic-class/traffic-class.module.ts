/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrafficClassComponent } from './traffic-class/traffic-class.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ApiModule as ApiModuleAether } from '../../openapi3/aether/2.0.0/api.module';
import { AETHER_ROC_API_URL } from '../../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
    MAT_FORM_FIELD_DEFAULT_OPTIONS,
    MatFormFieldModule,
} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { TrafficClassEditComponent } from './traffic-class-edit/traffic-class-edit.component';
import { AuthInterceptor } from '../auth-interceptor';
import { API_INTERCEPTOR_PROVIDER } from '../aether.module';
import { UtilsModule } from '../utils/utils.module';
import { ShowUsageComponent } from './show-usage/show-usage.component';

@NgModule({
    declarations: [
        TrafficClassComponent,
        TrafficClassEditComponent,
        ShowUsageComponent,
    ],
    imports: [
        CommonModule,
        ApiModuleAether.forRoot({ rootUrl: AETHER_ROC_API_URL }),
        HttpClientModule,
        RouterModule.forChild([
            { path: 'traffic-class', component: TrafficClassComponent },
            {
                path: 'traffic-class-edit/:enterprise-id/:id',
                component: TrafficClassEditComponent,
            },
            { path: '', component: TrafficClassComponent },
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
export class TrafficClassModule {}
