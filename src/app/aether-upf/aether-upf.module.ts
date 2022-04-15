/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiModule as ApiModuleAether20 } from '../../openapi3/aether/2.0.0/api.module';
import { ApiModule as ApiModuleAether } from '../../openapi3/aether/2.1.0/api.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AETHER_ROC_API_URL } from '../../environments/environment';
import { AuthInterceptor } from '../auth-interceptor';
import { API_INTERCEPTOR_PROVIDER } from '../aether.module';
import { UpfComponent } from './upf/upf.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import {
    MAT_FORM_FIELD_DEFAULT_OPTIONS,
    MatFormFieldModule,
} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CdkTableModule } from '@angular/cdk/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UpfEditComponent } from './upf-edit/upf-edit.component';
import { UtilsModule } from '../utils/utils.module';
import { ShowVcsUsageComponent } from './show-vcs-usage/show-vcs-usage.component';
import { UpfMonitorComponent } from './upf-monitor/upf-monitor.component';

@NgModule({
    declarations: [
        UpfComponent,
        UpfEditComponent,
        ShowVcsUsageComponent,
        UpfMonitorComponent,
    ],
    imports: [
        CommonModule,
        ApiModuleAether20.forRoot({ rootUrl: AETHER_ROC_API_URL }),
        ApiModuleAether.forRoot({ rootUrl: AETHER_ROC_API_URL }),
        HttpClientModule,
        RouterModule.forChild([
            { path: 'upf', component: UpfComponent },
            {
                path: 'upf-edit/:enterprise-id/:site-id/:id',

                component: UpfEditComponent,
            },
            {
                path: 'upf-monitor/:enterprise-id/:site-id/:id',
                component: UpfMonitorComponent,
            },
            { path: '', component: UpfComponent, pathMatch: 'full' },
        ]),
        MatToolbarModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatPaginatorModule,
        MatSnackBarModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        MatSlideToggleModule,
        CdkTableModule,
        MatCheckboxModule,
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
    exports: [ShowVcsUsageComponent],
})
export class AetherUpfModule {}
