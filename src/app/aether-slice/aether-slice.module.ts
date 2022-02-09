/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiModule as ApiModuleAether } from '../../openapi3/aether/2.0.0/api.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AETHER_ROC_API_URL } from '../../environments/environment';
import { AuthInterceptor } from '../auth-interceptor';
import { API_INTERCEPTOR_PROVIDER } from '../aether.module';
import { SliceComponent } from './slice/slice.component';
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
import { SliceEditComponent } from './slice-edit/slice-edit.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ApplicationSelectComponent } from './application-select/application-select.component';
import { DeviceGroupSelectComponent } from './device-group-select/device-group-select.component';
import { SliceMonitorComponent } from './slice-monitor/slice-monitor.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { UtilsModule } from '../utils/utils.module';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
    declarations: [
        SliceComponent,
        SliceEditComponent,
        ApplicationSelectComponent,
        DeviceGroupSelectComponent,
        SliceMonitorComponent,
    ],
    imports: [
        CommonModule,
        ApiModuleAether.forRoot({ rootUrl: AETHER_ROC_API_URL }),
        HttpClientModule,
        RouterModule.forChild([
            { path: 'slice', component: SliceComponent },
            {
                path: 'slice-edit/:enterprise-id/:site-id/:id',
                component: SliceEditComponent,
            },
            { path: 'slice-monitor/:id', component: SliceMonitorComponent },
            { path: '', component: SliceComponent, pathMatch: 'full' },
        ]),
        MatToolbarModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatSnackBarModule,
        MatIconModule,
        MatCardModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        MatSlideToggleModule,
        CdkTableModule,
        MatCheckboxModule,
        MatAutocompleteModule,
        MatExpansionModule,
        UtilsModule,
        MatTooltipModule,
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
export class AetherSliceModule {}
